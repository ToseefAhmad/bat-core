import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';

import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent,
    useToast,
    useStoreConfigQuery
} from '@luft/common';
import {useViewerAddressesQuery, useViewerQuery} from '@luft/user';
import {AccountAddressBookEditComponent, useEditAddressMutation} from '@luft/account';
import type {EditAddressInput, Viewer} from '@luft/types';

import messages from '@luft/account/src/components/AccountAddressBookEdit.container/resources/messages';

import {useStoreConfigAddressSettingsQuery} from '../../../../address';

type Props = {
    addressId: string | number,
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
     * Callback fired on edit address
     */
    onEditAddress?: (res: Viewer) => void
}

export function AccountAddressBookEditContainer(props: Props) {
    const {
        addressId,
        as: Component = AccountAddressBookEditComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        onEditAddress,
        ...other
    } = props;

    const viewerAddressesQuery = useViewerAddressesQuery();
    const viewerQuery = useViewerQuery();
    const addressSettingsQuery = useStoreConfigAddressSettingsQuery();
    const [editAddressMutation, {error, loading}] = useEditAddressMutation();
    const {formatMessage} = useIntl();
    const addToast = useToast();
    const {data: storeConfigData} = useStoreConfigQuery();
    const account = viewerQuery.data?.viewer?.user || {};

    const isLoading = viewerAddressesQuery.loading || addressSettingsQuery.loading;
    const dataError = viewerAddressesQuery.dataError || addressSettingsQuery.dataError;
    const noCache = viewerAddressesQuery.noCache || addressSettingsQuery.noCache;
    const isRecipientAutocompleteEnabled = storeConfigData?.storeConfig?.enable_recipient_autocomplete;

    const handleEditAddress = useCallback(async (input: EditAddressInput) => {
        const res = await editAddressMutation(input);
        addToast(formatMessage(messages.edit_success), 'success');
        if (onEditAddress) onEditAddress(res);
        return res;
    }, [editAddressMutation, onEditAddress, addToast, formatMessage]);

    if (awaitResult && isLoading) return Loading && <Loading/>;
    if (awaitResult && dataError) return Error && <Error error={dataError}/>;
    if (awaitResult && noCache) return NoCache && <NoCache/>;

    const addresses = viewerAddressesQuery.data?.viewer?.user?.addresses || [];
    const address = addresses.find(({address_id}) => address_id === addressId);
    const addressSettings = addressSettingsQuery?.data?.storeConfig;

    return (
        <Component {...other}
                   address={address}
                   addressSettings={addressSettings}
                   error={error}
                   loading={loading}
                   onEditAddress={handleEditAddress}
                   isRecipientAutocompleteEnabled={isRecipientAutocompleteEnabled}
                   account={account}/>
    );
}
