import React from 'react';
import {get, noop} from 'lodash';
import type {ComponentType} from 'react';

import {CheckoutTotalsComponent} from '@luft/checkout';
import {useCheckoutQuery} from '@luft/quote';
import {useCartDataShippingMethod} from '@luft/shipping';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: ComponentType<{}>,
    /**
     * Flag, that identifies if create order is disabled
     */
    disabled?: boolean,
    /**
     * Callback used on create order control click
     * Important notice: Create mutation is called on higher level.
     */
    onCreateOrder?: Function
};

export function CheckoutTotalsContainer(props: Props) {
    const {
        as: Component = CheckoutTotalsComponent,
        disabled = false,
        onCreateOrder = noop,
        ...others
    } = props;

    const {data, loading: cartDataLoading} = useCheckoutQuery();
    const {data: shippingMethod} = useCartDataShippingMethod();

    const coupons = get(data, 'cart.coupons');
    const giftCards = get(data, 'cart.gift_cards');
    const cartPrices = get(data, 'cart.prices');
    const itemsCount = get(data, 'cart.total_items');
    const spentPoints = get(data, 'cart.spend_points[0].points');
    const earnedPoints = get(data, 'cart.earn_points[0].points');
    const rewardDiscount = get(data, 'cart.reward_discount.amount');

    return (
        <Component {...others}
                   loading={cartDataLoading}
                   disabled={disabled}
                   shippingMethod={shippingMethod}
                   coupons={coupons}
                   giftCards={giftCards}
                   prices={cartPrices}
                   itemsCount={itemsCount}
                   spentPoints={spentPoints}
                   earnedPoints={earnedPoints}
                   rewardDiscount={rewardDiscount}
                   onCreateOrder={onCreateOrder}/>
    );
}
