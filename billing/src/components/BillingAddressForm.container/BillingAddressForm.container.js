import React, {useEffect, useState} from 'react';

import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent
} from '@luft/common';
import {useCheckoutQuery, useSetBillingAddressOnCartMutation} from '@luft/quote';
import {BillingAddressFormComponent} from '@luft/billing';
import {useViewerQuery} from '@luft/user';

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
     * Callback used on save Billing Address success
     * */
    onSaveAddress?: (resp: Cart) => void
};

export function BillingAddressFormContainer(props: Props) {
    const {
        as: Component = BillingAddressFormComponent,
        onSaveAddress,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        ...other
    } = props;

    const [error, setError] = useState();
    const {data, error: cartError, loading} = useCheckoutQuery();
    const [setBillingAddress, {loading: billingAddressLoading}] = useSetBillingAddressOnCartMutation();
    const settingsQuery = useStoreConfigAddressSettingsQuery();
    const viewerQuery = useViewerQuery();
    const account = viewerQuery.data?.viewer?.user;

    useEffect(() => setError(cartError), [cartError]);

    if (awaitResult && settingsQuery.loading) return Loading && <Loading/>;
    if (awaitResult && settingsQuery.dataError) return Error && <Error error={settingsQuery.dataError}/>;
    if (awaitResult && settingsQuery.noCache) return NoCache && <NoCache/>;

    const addressSettings = settingsQuery.data?.storeConfig;
    const cartId = data?.cart?.id;

    const handleOnSaveAddress = async (address) => {
        try {
            const resp = await setBillingAddress(cartId, address);
            setError(null);
            onSaveAddress(resp);
            return resp;
        } catch (e) {
            setError(e);
        }
    };

    return (
        <Component {...other}
                   error={error}
                   addressSettings={addressSettings}
                   account={account}
                   loading={loading || billingAddressLoading}
                   onSubmit={handleOnSaveAddress}/>
    );
}
