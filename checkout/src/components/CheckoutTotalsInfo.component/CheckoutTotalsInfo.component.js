import React from 'react';

import {MoneyComponent} from '@luft/common';

import type {CartPrices} from '@luft/types';

type Props = {
    /**
     * Cart Prices
     */
    prices?: CartPrices
}

export function CheckoutTotalsInfoComponent(props: Props) {
    const {prices} = props;

    return (
        <span className="checkout-totals-info-component">
            <MoneyComponent money={prices?.grand_total}/>
        </span>
    );
}
