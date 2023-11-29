import React, {useEffect} from 'react';
import {useLocation, useHistory} from 'react-router';

import {LoaderComponent, ErrorComponent} from '@luft/common';

import {useCheckoutComPaymentVerifyMutation} from '../../hooks';
import {useClientPurchaseQuery} from '../../../../checkout';
import {CHECKOUT_COM_SESSION_TOKEN} from '../../utils';

export function CheckoutComPaymentVerifyContainer() {
    const history = useHistory();
    const [verifyCheckoutComPayment, {loading, error}] = useCheckoutComPaymentVerifyMutation();
    const q = useClientPurchaseQuery();
    const {search} = useLocation();

    const queryParams = new URLSearchParams(search);
    const ckoSessionId = queryParams.get(CHECKOUT_COM_SESSION_TOKEN);
    const orderId = q.data?.purchase?.order?.id;

    useEffect(() => {
        if (!ckoSessionId || !orderId) return;

        (async () => {
            try {
                const res = await verifyCheckoutComPayment({
                    order_id: orderId,
                    cko_session_id: ckoSessionId
                });

                history.replace('/checkout/success', {payload: res});
            } catch (err) {
                history.replace('/cart', {paymentError: err?.message});
            }
        })();
    }, [ckoSessionId, orderId, history]);

    if (loading) return <LoaderComponent/>;
    if (error) return <ErrorComponent error={error}/>;

    return null;
}
