import React, {useEffect, useState} from 'react';
import {noop} from 'lodash';
import type {ComponentType} from 'react';

import {ShippingAddressFormComponent, useCartDataShippingAddress} from '@luft/shipping';
import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent,
    useStoreConfigQuery
} from '@luft/common';
import {useCheckoutQuery, useSetShippingAddressesOnCart} from '@luft/quote';
import {useViewerQuery} from '@luft/user';

import {useStoreConfigAddressSettingsQuery} from '../../../../address';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     * */
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
     * Callback used on save Shipping Address success
     * */
    onSaveAddress?: Function
};

export function ShippingAddressFormContainer(props: Props) {
    const {
        as: Component = ShippingAddressFormComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        onSaveAddress = noop,
        ...other
    } = props;

    const [error, setError] = useState();
    const {data: shippingAddress} = useCartDataShippingAddress();
    const {data, error: cartError, loading: cartLoading} = useCheckoutQuery();
    const [setShippingAddress, {loading: addressLoading}] = useSetShippingAddressesOnCart();
    const settingsQuery = useStoreConfigAddressSettingsQuery();
    const viewerQuery = useViewerQuery();
    const {data: storeConfigData} = useStoreConfigQuery();

    const isRecipientAutocompleteEnabled = storeConfigData?.storeConfig?.enable_recipient_autocomplete;
    const account = viewerQuery.data?.viewer?.user || {};

    useEffect(() => setError(cartError), [cartError]);

    if (awaitResult && settingsQuery.loading) return Loading && <Loading/>;
    if (awaitResult && settingsQuery.dataError) return Error && <Error error={settingsQuery.dataError}/>;
    if (awaitResult && settingsQuery.noCache) return NoCache && <NoCache/>;

    const cartId = data?.cart?.id;
    const addressSettings = settingsQuery.data?.storeConfig;

    const handleOnSaveAddress = async (address) => {
        try {
            const resp = await setShippingAddress(cartId, address);
            setError(null);
            onSaveAddress(resp);
            return resp;
        } catch (e) {
            setError(e);
        }
    };

    // Pre-filled shipping address fields if it's enabled in admin
    const prefilledShippingAddress = isRecipientAutocompleteEnabled ? {
        firstname: account?.first_name,
        lastname: account?.last_name,
        telephone: account?.phone_number
    } : {};

    return (
        <Component {...other}
                   shippingAddress={shippingAddress || prefilledShippingAddress}
                   addressSettings={addressSettings}
                   account={account}
                   loading={cartLoading || addressLoading}
                   error={error}
                   onSaveAddress={handleOnSaveAddress}/>
    );
}
