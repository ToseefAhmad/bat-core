import React, {useState, useCallback} from 'react';

import {useCheckoutQuery} from '@luft/quote';
import {useCartDataShippingMethod} from '@luft/shipping';
import type {PaymentMethod} from '@luft/types';

import {PaynamicsPlaceOrderComponent} from '../PaynamicsPlaceOrder.component';
import {useCreateOrder} from '../../../../quote';
import {useSetClientPurchase} from '../../../../checkout';
import {usePaynamicsPaymentStartMutation} from '../../hooks';

type Props = {
    /**
     * Presentation component, that will consume data and callbacks from this container component
     */
    as?: React.Component,
    /**
     * Selected payment method data
     */
    paymentMethod?: PaymentMethod,
    /**
     * Callback used when user clicks create order control
     */
    onCreateOrder?: Function
}

export function PaynamicsPlaceOrderContainer(
    {
        as: Component = PaynamicsPlaceOrderComponent,
        paymentMethod,
        onCreateOrder,
        ...other
    }: Props) {
    const {data: checkoutData, error: checkoutError, loading: checkoutLoading} = useCheckoutQuery();
    const [createOrder, {error: createOrderError}] = useCreateOrder({preventClearCart: true});
    const {data: shippingMethod} = useCartDataShippingMethod();
    const [paynamicsPaymentStart] = usePaynamicsPaymentStartMutation();
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paynamicsFormData, setPaynamicsFormData] = useState();
    const setClientPurchase = useSetClientPurchase();

    const handleSubmit = useCallback(async () => {
        if (paymentLoading) return;

        setPaymentLoading(true);

        try {
            const cartId = checkoutData?.cart?.id;

            const resp = await createOrder(cartId);

            const order = resp?.data?.createOrder?.order;
            const orderId = order?.id;
            const cart = checkoutData?.cart;
            const purchase = {
                actionField: {
                    id: orderId,
                    affiliation: 'Online Store',
                    revenue: cart?.prices?.grand_total?.value,
                    shipping: shippingMethod?.amount?.value,
                    coupon: cart?.coupons && cart.coupons[0]?.label,
                    referral_code: cart?.referral_code,
                    payment_method: paymentMethod?.name,
                    taxes: order?.prices?.taxes
                },
                products: cart?.items,
                order
            };

            // We want this value to be persistent in storage,
            // because sometimes we need to restore it after a redirect from 3rd party
            setClientPurchase(purchase);

            const res = await paynamicsPaymentStart({order_id: orderId});

            setPaynamicsFormData(res?.data?.paynamicsStart);
        } catch (e) {
            if (onCreateOrder) onCreateOrder({error: e});
            setPaymentLoading(false);
        }
    }, [createOrder, paymentMethod, paymentLoading, shippingMethod, setClientPurchase, checkoutData]);

    const loading = checkoutLoading || paymentLoading;
    const error = checkoutError || createOrderError;

    return (
        <Component {...other}
                   formData={paynamicsFormData}
                   loading={loading}
                   error={error}
                   onSubmit={handleSubmit}/>
    );
}
