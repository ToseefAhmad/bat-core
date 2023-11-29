import React, {useEffect} from 'react';
import {useHistory, useParams} from 'react-router';

import {LoaderComponent} from '@luft/common';
import {useCheckoutQuery} from '@luft/quote';
import {useCartDataShippingMethod} from '@luft/shipping';
import {useCartDataPaymentMethod} from '@luft/payment';

import {useCcAvenueResponseMutation} from '../../hooks';
import {useSetClientPurchase} from '../../../../checkout';

type Props = {
    /**
     * Presentation component, that will consume data and callbacks from this container component
     */
    as?: React.Component
}

export const CcAvenuePaymentResultContainer = (
    {
        as: Component = LoaderComponent
    }: Props) => {
    const history = useHistory();
    const {token} = useParams();
    const [ccAvenueResponse] = useCcAvenueResponseMutation();
    const {data: checkoutData} = useCheckoutQuery();
    const {data: shippingMethod} = useCartDataShippingMethod();
    const {data: selectedPaymentMethod} = useCartDataPaymentMethod();
    const setClientPurchase = useSetClientPurchase();

    useEffect(() => {
        if (!token) return history.push('/cart');

        (async () => {
            try {
                const resp = await ccAvenueResponse(token);

                const cart = checkoutData?.cart;
                const order = resp?.data?.createOrder?.order;

                const purchase = {
                    actionField: {
                        id: order?.id,
                        affiliation: 'Online Store',
                        revenue: cart?.prices?.grand_total?.value,
                        shipping: shippingMethod?.amount?.value,
                        coupon: cart?.coupons && cart.coupons[0]?.label,
                        referral_code: cart?.referral_code,
                        payment_method: selectedPaymentMethod?.payment_method?.name,
                        taxes: order?.prices?.taxes
                    },
                    products: cart?.items
                };

                setClientPurchase(purchase);
                history.replace('/checkout/success', {payload: resp});
            } catch (err) {
                history.push('/cart', {paymentError: err?.message});
            }
        })();
    }, [token, ccAvenueResponse, checkoutData, shippingMethod, selectedPaymentMethod, setClientPurchase, history]);

    return (
        <Component type="fixed"/>
    );
};
