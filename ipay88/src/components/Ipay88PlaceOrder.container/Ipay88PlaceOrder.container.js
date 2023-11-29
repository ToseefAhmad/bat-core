import React from 'react';

import {useCheckoutQuery} from '@luft/quote';
import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent
} from '@luft/common';

import {Ipay88PlaceOrderComponent} from '../Ipay88PlaceOrder.component';
import {useIpay88PlaceOrderMutation} from '../../hooks';
import {IPAY88_CODE} from '../../utils';

type Props = {
    as?: React.Component,
    loadingAs?: React.Component,
    errorAs?: React.Component,
    noCacheAs?: React.Component,
    awaitResult?: boolean
};

export function Ipay88PlaceOrderContainer({
    as: Component = Ipay88PlaceOrderComponent,
    loadingAs: Loading = LoaderComponent,
    errorAs: Error = ErrorComponent,
    noCacheAs: NoCache = NoCacheComponent,
    awaitResult = true
}: Props) {
    const [ipay88PlaceOrder, payload] = useIpay88PlaceOrderMutation();
    const {data: cartData, error: cartError, loading: cartLoading, noCache} = useCheckoutQuery();
    const selectedMethod = cartData?.cart?.selected_payment_method?.payment_method;
    const {data, loading, error} = payload;
    const formData = data?.ipay88PlaceOrder;

    const isDisabled = selectedMethod?.code !== IPAY88_CODE || !selectedMethod.payment_id;

    if (awaitResult && cartLoading) return Loading && <Loading/>;
    if (awaitResult && cartError) return Error && <Error error={cartError}/>;
    if (awaitResult && noCache) return NoCache && <NoCache/>;

    return (
        <Component loading={loading}
                   formData={formData}
                   error={error}
                   disabled={isDisabled}
                   onSubmit={ipay88PlaceOrder}/>
    );
}
