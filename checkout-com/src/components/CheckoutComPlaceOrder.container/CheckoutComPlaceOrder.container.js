import React, {useState, useCallback} from 'react';

import {useCheckoutQuery} from '@luft/quote';
import {useCartDataShippingMethod} from '@luft/shipping';
import type {PaymentMethod} from '@luft/types';

import {CheckoutComPlaceOrderComponent} from '../CheckoutComPlaceOrder.component';
import {useCreateOrder} from '../../../../quote';
import {useSetClientPurchase} from '../../../../checkout';
import {useCheckoutComCreateOrderMutation} from '../../hooks';

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

export function CheckoutComPlaceOrderContainer(
    {
        as: Component = CheckoutComPlaceOrderComponent,
        paymentMethod,
        onCreateOrder,
        ...other
    }: Props) {
    const {data: checkoutData, error: checkoutError, loading: checkoutLoading} = useCheckoutQuery();
    const [createOrder, {error: createOrderError}] = useCreateOrder({preventClearCart: true});
    const {data: shippingMethod} = useCartDataShippingMethod();
    const [checkoutComPlaceOrder] = useCheckoutComCreateOrderMutation();
    const [paymentLoading, setPaymentLoading] = useState(false);
    const setClientPurchase = useSetClientPurchase();

    const cartId = checkoutData?.cart?.id;

    const handleSubmit = useCallback(async (event = {}) => {
        if (paymentLoading) return;

        setPaymentLoading(true);
        try {
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
                    payment_method: paymentMethod.name,
                    taxes: order?.prices?.taxes
                },
                products: cart?.items,
                order
            };

            // We want this value to be persistent in storage,
            // because sometimes we need to restore it after a redirect from 3rd party
            setClientPurchase(purchase);

            const input = {
                order_id: orderId,
                method_id: paymentMethod.code,
                card_token: event?.token,
                card_bin: event?.bin,
                save_card: false,
                source: paymentMethod.code
            };
            const res = await checkoutComPlaceOrder(input);
            const redirectUrl = res?.data?.createOrder?.redirect_url;
            if (redirectUrl) {
                window.open(redirectUrl, '_self');
                return;
            }

            if (onCreateOrder) onCreateOrder(resp);
            return resp;
        } catch (e) {
            if (onCreateOrder) onCreateOrder({error: e});
            setPaymentLoading(false);
        }
    }, [
        createOrder,
        paymentMethod,
        cartId,
        paymentLoading,
        shippingMethod,
        checkoutData,
        checkoutComPlaceOrder,
        setClientPurchase
    ]);

    const loading = checkoutLoading || paymentLoading;
    const error = checkoutError || createOrderError;

    return (
        <Component {...other}
                   loading={loading}
                   error={error}
                   onSubmit={handleSubmit}/>
    );
}
