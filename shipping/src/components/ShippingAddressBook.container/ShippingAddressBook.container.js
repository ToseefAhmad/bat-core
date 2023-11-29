import React, {useState, useMemo} from 'react';
import {noop} from 'lodash';
import type {ComponentType} from 'react';

import {useSetShippingFromAddressBook} from '@luft/quote';
import {useAddAddressMutation} from '@luft/address';
import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent,
    useStoreConfigQuery
} from '@luft/common';
import {useViewerQuery} from '@luft/user';
import type {AddressInput, Address} from '@luft/types';

import {AddressBookListComponent, useStoreConfigAddressSettingsQuery} from '../../../../address';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: ComponentType<{}>,
    /**
     * Represent for loading view
     */
    loadingAs?: ComponentType<{}>,
    /**
     * Represent for error view
     */
    errorAs?: ComponentType<{}>,
    /**
     * Represent for no cache view
     */
    noCacheAs?: ComponentType<{}>,
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
    onNavigateAdd?: Function,
    /**
     * Callback used on add Shipping Address success for logged in user
     */
    onSaveAddress?: Function,
    /**
     * Callback used on change Shipping Address Book entity success for logged in user
     * (forwarded to AddressBookListComponent)
     */
    onChangeAddress?: Function
};

const DEFAULT_ACCOUNT = {};

export function ShippingAddressBookContainer(props: Props) {
    const {
        as: Component = AddressBookListComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        addresses,
        selectedAddress,
        onNavigateAdd = noop,
        onSaveAddress = noop,
        onChangeAddress = noop,
        ...other
    } = props;

    const [error, setError] = useState();
    const [addAddressMutation, {loading: addLoading}] = useAddAddressMutation();
    const [setAddressMutation, {loading: setLoading}] = useSetShippingFromAddressBook();
    const q = useStoreConfigAddressSettingsQuery();
    const {data: storeConfigData} = useStoreConfigQuery();
    const viewerQuery = useViewerQuery();
    const isRecipientAutocompleteEnabled = storeConfigData?.storeConfig?.enable_recipient_autocomplete;
    const account = viewerQuery.data?.viewer?.user || DEFAULT_ACCOUNT;

    const shippingAddresses = useMemo(() => {
        const {first_name, last_name} = account;
        return addresses?.map(address => ({...address, firstname: first_name, lastname: last_name}));
    }, [addresses, account]);

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.dataError}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const handleOnAddNewAddress = async (input: AddressInput) => {
        try {
            setError(null);
            const res = await addAddressMutation({address: input});
            onSaveAddress(res, input);
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

    // Pre-populate shipping address fields if it's enabled in admin
    const shippingAddress = isRecipientAutocompleteEnabled ? {
        firstname: account?.first_name,
        lastname: account?.last_name,
        telephone: account?.phone_number
    } : {};

    return (
        <Component {...other}
                   addressSettings={addressSettings}
                   addresses={shippingAddresses}
                   selectedAddress={selectedAddress}
                   shippingAddress={shippingAddress}
                   loading={addLoading || setLoading}
                   error={error}
                   step="shipping"
                   isRecipientAutocompleteEnabled={isRecipientAutocompleteEnabled}
                   account={account}
                   onNavigateAdd={onNavigateAdd}
                   onSaveAddress={handleOnAddNewAddress}
                   onChangeAddress={handleOnChangeAddress}/>
    );
}
