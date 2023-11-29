import React, {useState} from 'react';

import {useSetBillingFromAddressBook} from '@luft/quote';
import {useAddAddressMutation} from '@luft/address';
import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent,
    useStoreConfigQuery
} from '@luft/common';
import {useViewerQuery} from '@luft/user';
import type {
    AddressInput,
    Address,
    Viewer,
    Cart
} from '@luft/types';

import {useStoreConfigAddressSettingsQuery, AddressBookListComponent} from '../../../../address';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
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
     * User addresses from address book
     */
    addresses?: Address[],
    /**
     * Selected address from address book
     */
    selectedAddress?: Address,
    /**
     * Callback used to navigate to Add new address page
     * (forwarded to AddressBookListComponent)
     */
    onNavigateAdd?: (React.SyntheticEvent) => void,
    /**
     * Callback used on add Billing Address success for logged in user
     */
    onSubmit?: (res: Viewer) => void,
    /**
     * Callback used on change Billing Address Book entity success for logged in user
     * (forwarded to AddressBookListComponent)
     */
    onChangeAddress?: (res: Cart) => void
};

export function BillingAddressBookContainer(props: Props) {
    const {
        as: Component = AddressBookListComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        addresses,
        selectedAddress,
        onNavigateAdd,
        onSubmit,
        onChangeAddress,
        ...other
    } = props;

    const [error, setError] = useState();
    const [addAddressMutation, {loading: addLoading}] = useAddAddressMutation();
    const [setAddressMutation, {loading: setLoading}] = useSetBillingFromAddressBook();
    const q = useStoreConfigAddressSettingsQuery();
    const viewerQuery = useViewerQuery();
    const {data: storeConfigData} = useStoreConfigQuery();

    const account = viewerQuery.data?.viewer?.user || {};
    const isRecipientAutocompleteEnabled = storeConfigData?.storeConfig?.enable_recipient_autocomplete;

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.dataError}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const handleOnAddNewAddress = async (input: AddressInput) => {
        try {
            setError(null);
            const res = await addAddressMutation({address: input});
            onSubmit(res);
            return res;
        } catch (e) {
            setError(e);
        }
    };

    const handleOnChangeAddress = async (addressId) => {
        try {
            const res = await setAddressMutation(addressId);
            setError(null);
            onChangeAddress(res);
            return res;
        } catch (e) {
            setError(e);
        }
    };

    const addressSettings = q.data?.storeConfig;

    // Pre-populate billing address fields if it's enabled in admin
    const prefilledBillingAddress = isRecipientAutocompleteEnabled ? {
        firstname: account?.first_name,
        lastname: account?.last_name,
        telephone: account?.phone_number
    } : {};

    return (
        <Component {...other}
                   addressSettings={addressSettings}
                   addresses={addresses}
                   selectedAddress={selectedAddress || prefilledBillingAddress}
                   loading={addLoading || setLoading}
                   error={error}
                   onNavigateAdd={onNavigateAdd}
                   onSubmit={handleOnAddNewAddress}
                   onChangeAddress={handleOnChangeAddress}
                   step="billing"/>
    );
}
