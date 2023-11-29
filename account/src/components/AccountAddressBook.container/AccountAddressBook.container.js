import React, {useCallback} from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';

import {useViewerAddressesQuery} from '@luft/user';
import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent,
    useToast
} from '@luft/common';
import {
    AccountAddressBookComponent,
    useSetShippingAddressMutation,
    useDeleteAddressMutation
} from '@luft/account';
import {useSetBillingAddressMutation} from '@luft/account/src/hooks';
import type {Viewer} from '@luft/types';

import messages from '@luft/account/src/components/AccountAddressBook.container/resources/messages';

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
     * Callback used when user edit address
     */
    onEditAddress?: (address_id: string) => void,
    /**
     * Callback used when user save address
     */
    onAddAddress?: () => Viewer | void,
    /**
     * Callback used when user set shipping address
     */
    onSetShippingAddress?: () => Viewer | void,
    /**
     * Callback used when user set billing address
     */
    onSetBillingAddress?: () => Viewer | void,
    /**
     * Callback used when user delete address
     */
    onDeleteAddress?: () => Viewer | void
}

export function AccountAddressBookContainer(props: Props) {
    const {
        as: Component = AccountAddressBookComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        onSetShippingAddress = noop,
        onSetBillingAddress = noop,
        onDeleteAddress = noop,
        ...other
    } = props;

    const viewerAddressesQuery = useViewerAddressesQuery();
    const addressSettingsQuery = useStoreConfigAddressSettingsQuery();
    const [setShippingAddress, {error: errSetShipping, loading: loadingSetShipping}] = useSetShippingAddressMutation();
    const [setBillingAddress, {error: errSetBilling, loading: loadingSetBilling}] = useSetBillingAddressMutation();
    const [deleteAddress, {error: errDelete, loading: loadingDelete}] = useDeleteAddressMutation();
    const {formatMessage} = useIntl();
    const addToast = useToast();

    const isLoading = viewerAddressesQuery.loading || addressSettingsQuery.loading;
    const dataError = viewerAddressesQuery.dataError || addressSettingsQuery.dataError;
    const noCache = viewerAddressesQuery.noCache || addressSettingsQuery.noCache;

    const handleSetShippingAddress = useCallback(async (id) => {
        const res = await setShippingAddress(id);
        if (onSetShippingAddress) onSetShippingAddress(res);
        return res;
    }, [setShippingAddress, onSetShippingAddress]);
    const handleSetBillingAddress = useCallback(async (id) => {
        const res = await setBillingAddress(id);
        if (onSetBillingAddress) onSetBillingAddress(res);
        return res;
    }, [setBillingAddress, onSetBillingAddress]);
    const handleDeleteAddress = useCallback(async (id) => {
        const res = await deleteAddress(id);
        addToast(formatMessage(messages.remove_success), 'success');
        if (onDeleteAddress) onDeleteAddress(res);
        return res;
    }, [deleteAddress, addToast, onDeleteAddress, formatMessage]);

    if (awaitResult && isLoading) return Loading && <Loading/>;
    if (awaitResult && dataError) return Error && <Error error={dataError}/>;
    if (awaitResult && noCache) return NoCache && <NoCache/>;

    const addresses = viewerAddressesQuery.data?.viewer?.user?.addresses;
    const addressSettings = addressSettingsQuery?.data?.storeConfig;
    const loading = loadingSetShipping || loadingSetBilling || loadingDelete;

    return (
        <Component {...other}
                   q={viewerAddressesQuery}
                   onSetDefaultShippingAddress={handleSetShippingAddress}
                   onSetDefaultBillingAddress={handleSetBillingAddress}
                   onDeleteAddress={handleDeleteAddress}
                   addresses={addresses}
                   addressSettings={addressSettings}
                   errorSetShippingAddress={errSetShipping}
                   errorSetBillingAddress={errSetBilling}
                   errorDeleteAddress={errDelete}
                   loading={loading}/>
    );
}
