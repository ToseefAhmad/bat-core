import React, {useCallback} from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';

import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent,
    useStoreConfigQuery,
    useToast
} from '@luft/common';
import {useAddAddressMutation} from '@luft/address';
import {useViewerAddressesQuery, useViewerQuery} from '@luft/user';
import {AccountAddressBookAddComponent} from '@luft/account';
import type {AddAddressInput, Viewer} from '@luft/types';

import messages from '@luft/account/src/components/AccountAddressBookAdd.container/resources/messages';

import {useStoreConfigAddressSettingsQuery} from '../../../../address';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     * */
    as?: React.Component,
    /**
     * Represent for loading view
     */
    loadingAs?: React.Component,
    /**
     * Represent for error view
     */
    errorAs?: React.Component,
    /**
     * Represent for no cache view
     */
    noCacheAs?: React.Component,
    /**
     * Await result
     */
    awaitResult?: boolean,
    /**
     * Callback used when user has saved address
     */
    onAddAddress?: (res: Viewer) => void
}

export function AccountAddressBookAddContainer(props: Props) {
    const {
        as: Component = AccountAddressBookAddComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        onAddAddress = noop,
        ...other
    } = props;

    const viewerAddressesQuery = useViewerAddressesQuery();
    const addressSettingsQuery = useStoreConfigAddressSettingsQuery();
    const viewerQuery = useViewerQuery();
    const [addAddressMutation, {error, loading}] = useAddAddressMutation();
    const {formatMessage} = useIntl();
    const addToast = useToast();
    const {data: storeConfigData} = useStoreConfigQuery();
    const account = viewerQuery.data?.viewer?.user || {};

    const isLoading = viewerAddressesQuery.loading || addressSettingsQuery.loading;
    const dataError = viewerAddressesQuery.dataError || addressSettingsQuery.dataError;
    const noCache = viewerAddressesQuery.noCache || addressSettingsQuery.noCache;
    const isRecipientAutocompleteEnabled = storeConfigData?.storeConfig?.enable_recipient_autocomplete;

    const handleAddAddress = useCallback(async (input: AddAddressInput) => {
        const res = await addAddressMutation(input);
        addToast(formatMessage(messages.add_success), 'success');
        if (onAddAddress) onAddAddress(res);
        return res;
    }, [addAddressMutation, onAddAddress, addToast, formatMessage]);

    if (awaitResult && isLoading) return Loading && <Loading/>;
    if (awaitResult && dataError) return Error && <Error error={dataError}/>;
    if (awaitResult && noCache) return NoCache && <NoCache/>;

    const addresses = viewerAddressesQuery.data?.viewer?.user?.addresses || [];
    const addressSettings = addressSettingsQuery?.data?.storeConfig;

    return (
        <Component {...other}
                   addresses={addresses}
                   addressSettings={addressSettings}
                   onAddAddress={handleAddAddress}
                   error={error}
                   loading={loading}
                   isRecipientAutocompleteEnabled={isRecipientAutocompleteEnabled}
                   account={account}/>
    );
}
