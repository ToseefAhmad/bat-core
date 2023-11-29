import React, {useEffect, useState} from 'react';
import {useLocation, useHistory} from 'react-router';

import {LoaderComponent, ErrorComponent} from '@luft/common';

import {useCheckoutLazyQuery} from '../../../../quote';
import {usePaynamicsResultMutation} from '../../hooks';
import {PAYNAMICS_REQUEST_ID, PAYNAMICS_RESPONSE_ID} from '../../utils';

export function PaynamicsPaymentResultContainer() {
    const history = useHistory();
    const [paynamicsResult, {loading, error}] = usePaynamicsResultMutation();
    const [getCheckoutQuery, {loading: checkoutQueryLoading, data: checkoutData}] = useCheckoutLazyQuery({
        fetchPolicy: 'network-only'
    });
    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const paynamicsRequestId = queryParams.get(PAYNAMICS_REQUEST_ID);
    const paynamicsResponseId = queryParams.get(PAYNAMICS_RESPONSE_ID);
    const [paynamicsError, setPaynamicsError] = useState();
    const cartId = checkoutData?.cart?.id;

    useEffect(() => {
        if (!paynamicsRequestId) return;

        (async () => {
            try {
                const res = await paynamicsResult({
                    request_id: paynamicsRequestId,
                    response_id: paynamicsResponseId
                });

                history.replace('/checkout/success', {payload: res});
            } catch (err) {
                await getCheckoutQuery();
                setPaynamicsError(err);
            }
        })();
    }, [paynamicsRequestId, paynamicsResponseId]);

    useEffect(() => {
        if (!cartId || !paynamicsError) return;

        history.replace('/checkout', {paymentError: {...paynamicsError}});
    }, [paynamicsError, cartId]);

    if (loading || checkoutQueryLoading) return <LoaderComponent/>;
    if (error && !cartId) return <ErrorComponent error={error}/>;

    return null;
}
