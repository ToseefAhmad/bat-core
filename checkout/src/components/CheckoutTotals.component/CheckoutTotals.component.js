import React from 'react';
import {get} from 'lodash';
import {useIntl} from 'react-intl';

import {MoneyComponent} from '@luft/common';
import {CheckoutTotalsItemComponent} from '@luft/checkout';

import type {
    CartCoupon,
    CartPrices,
    GiftCard,
    ShippingMethod
} from '@luft/types';

import messages from '@luft/checkout/src/components/CheckoutTotals.component/resources/messages';

import custom_messages from './resources/messages';

type Props = {
    /**
     * Shipping Method, assigned to cart as selected
     * */
    shippingMethod?: ShippingMethod,
    /**
     * List of Coupons, applied to cart
     * */
    coupons?: CartCoupon[],
    /**
     * List of Gift Carts, applied to cart
     * */
    giftCards?: GiftCard[],
    /**
     * Cart Prices
     * */
    prices?: CartPrices,
    /**
     * Total items in the cart
     */
    itemsCount: number,
    /**
     * Amount of spent reward points
     */
    spentPoints: number,
    /**
     * Amount of earned reward points
     */
    earnedPoints: number,
    /**
     * Total discount amount using rewards
     */
    rewardDiscount: Money,
    /**
     * Flag, which indicates that reward points should be shown
     */
     showRewardPoints: boolean
};

export function CheckoutTotalsComponent(props: Props) {
    const {formatMessage, formatNumber} = useIntl();

    const {
        shippingMethod,
        coupons,
        giftCards,
        prices,
        itemsCount,
        spentPoints,
        earnedPoints,
        rewardDiscount,
        showRewardPoints
    } = props;

    return (
        <div className="checkout-totals-component">
            <div className="checkout-totals-component-body">
                <CheckoutTotalsItemComponent label={formatMessage(messages.subtotal)}
                                             amount={get(prices, 'subtotal')}/>

                {prices?.promotions?.map(({label, amount}) => !!label && (
                    <CheckoutTotalsItemComponent key={label}
                                                 label={formatMessage(messages.discount, {labels: label.join(', ')})}
                                                 amount={amount}
                                                 isNegative={true}/>
                ))}

                {showRewardPoints && !!spentPoints && (
                    <div className="checkout-totals-component-points-item">
                        <span className="checkout-totals-component-points-item-label">
                            {formatMessage(custom_messages.spent_reward_points)}
                        </span>

                        <span className="checkout-totals-component-points-item-value">
                            {formatMessage(custom_messages.reward_points, {
                                amount: formatNumber(spentPoints)
                            })}
                        </span>
                    </div>
                )}

                {showRewardPoints && !!earnedPoints && (
                    <div className="checkout-totals-component-points-item">
                        <span className="checkout-totals-component-points-item-label">
                            {formatMessage(custom_messages.earned_reward_points)}
                        </span>

                        <span className="checkout-totals-component-points-item-value">
                            {formatMessage(custom_messages.reward_points, {
                                amount: formatNumber(earnedPoints)
                            })}
                        </span>
                    </div>
                )}

                {giftCards && giftCards.map(({id, code, applied_balance}) => (
                    <CheckoutTotalsItemComponent key={id}
                                                 label={formatMessage(messages.checkout_gift_card_title, {code})}
                                                 amount={applied_balance}
                                                 isNegative={true}/>
                ))}

                <CheckoutTotalsItemComponent label={formatMessage(messages.checkout_shipping_title)}
                                             amount={shippingMethod && shippingMethod.amount}
                                             placeholder={formatMessage(messages.checkout_shipping_empty_title)}/>

                {coupons && coupons.map(({code, applied_discount}) => !!code && (
                    <CheckoutTotalsItemComponent key={code}
                                                 label={formatMessage(messages.checkout_coupon_title, {code})}
                                                 amount={applied_discount}
                                                 isNegative={true}/>
                ))}

                {get(prices, 'taxes') && prices.taxes.map(({label, amount}) => (
                    <CheckoutTotalsItemComponent key={label}
                                                 label={label}
                                                 amount={amount}/>
                ))}

                {showRewardPoints && !!rewardDiscount?.value && (
                    <CheckoutTotalsItemComponent label={formatMessage(custom_messages.rewards_discount)}
                                                 amount={rewardDiscount}
                                                 isNegative={true}/>
                )}

                <div className="checkout-totals-component-total">
                    <span className="checkout-totals-component-total-label">
                        {formatMessage(messages.itemsCount, {itemsCount})}
                    </span>
                    <div className="checkout-totals-component-total-price">
                        <span className="checkout-totals-component-total-price-label">
                            {formatMessage(messages.checkout_total_title)}
                        </span>
                        <span className="checkout-totals-component-total-price-value">
                            <MoneyComponent money={get(prices, 'grand_total')}/>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
