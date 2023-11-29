import React from 'react';

import {GiftCardCartContainer, GiftCardCartAppliedItemsComponent} from '@luft/gift-card';
import {CouponContainer, CouponAppliedItemsComponent} from '@luft/checkout';

type Props = {
    /**
     * Flag, which indicates that reward points should be shown
     */
    showRewardPoints?: boolean
};

export function CheckoutAppliedDiscountsComponent({showRewardPoints}: Props) {
    return (
        <div className="checkout-applied-discounts-component">
            <CouponContainer as={CouponAppliedItemsComponent}
                             className="checkout-applied-discounts-component-coupons"
                             showRewardPoints={showRewardPoints}/>
            <GiftCardCartContainer as={GiftCardCartAppliedItemsComponent}/>
        </div>
    );
}
