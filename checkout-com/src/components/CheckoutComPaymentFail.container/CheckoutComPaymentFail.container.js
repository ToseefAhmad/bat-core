import React, {useEffect} from 'react';
import {useLocation, useHistory} from 'react-router';

import {LoaderComponent, ErrorComponent} from '@luft/common';

import {useCheckoutComPaymentFailMutation} from '../../hooks';
import {useClientPurchaseQuery} from '../../../../checkout';
import {CHECKOUT_COM_SESSION_TOKEN} from '../../utils';

export function CheckoutComPaymentFailContainer() {
    const history = useHistory();
    const [failCheckoutComPayment, {loading, error}] = useCheckoutComPaymentFailMutation();
    const q = useClientPurchaseQuery();
    const {search} = useLocation();

    const queryParams = new URLSearchParams(search);
    const ckoSessionId = queryParams.get(CHECKOUT_COM_SESSION_TOKEN);
    const orderId = q.data?.purchase?.order?.id;

    useEffect(() => {
        if (!ckoSessionId || !orderId) return;

        (async () => {
            try {
                const res = await failCheckoutComPayment({
                    order_id: orderId,
                    cko_session_id: ckoSessionId
                });

                history.replace('/cart', {paymentError: res?.data?.checkoutcomPaymentFail?.error_message});
            } catch (err) {}
        })();
    }, [ckoSessionId, orderId, history]);

    if (loading) return <LoaderComponent/>;
    if (error) return <ErrorComponent error={error}/>;

    return null;
}
