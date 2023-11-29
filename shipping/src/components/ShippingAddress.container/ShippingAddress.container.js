import React from 'react';

import {useViewerAddressesQuery} from '@luft/user';
import {LoaderComponent} from '@luft/common';
import {ShippingAddressComponent, useCartDataShippingAddress} from '@luft/shipping';

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
     * Await result
     */
    awaitResult?: boolean
};

export function ShippingAddressContainer(
    {
        as: Component = ShippingAddressComponent,
        loadingAs: Loading = LoaderComponent,
        awaitResult = true,
        ...other
    }: Props) {
    const {data: shippingAddress, loading: cartLoading} = useCartDataShippingAddress();
    const {data: viewerAddresses, loading: viewerLoading} = useViewerAddressesQuery();
    const loading = cartLoading || viewerLoading;

    if (awaitResult && loading) return Loading && <Loading/>;

    const addresses = viewerAddresses?.viewer?.user?.addresses;

    return (
        <Component {...other}
                   shippingAddress={shippingAddress}
                   addresses={addresses}/>
    );
}
