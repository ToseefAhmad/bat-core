import React, {useContext, useRef} from 'react';
import {noop} from 'lodash';
import type {ComponentType} from 'react';

import {
    useAddCouponOnCartMutation,
    useCheckoutQuery,
    useRemoveCouponFromCartMutation
} from '@luft/quote';
import {CouponComponent} from '@luft/checkout';
import {useIsAuthorized} from '@luft/user';

import {CheckoutContext} from '../../contexts';

import REWARD_POINTS_SETTINGS_QUERY from '../../../../quote/src/graphql/queries/RewardPointsSettings.query.graphql';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: ComponentType<{}>,
    /**
     * Flag, which indicates that reward points should be shown
     */
    showRewardPoints: boolean,
    /**
     * Callback, which is used on adding a coupon
     */
    onAddCoupon?: Function,
    /**
     * Callback, which is used on removing a coupon
     */
    onRemoveCoupon?: Function
};

export function CouponContainer(props: Props) {
    const {
        as: Component = CouponComponent,
        onAddCoupon = noop,
        onRemoveCoupon = noop,
        showRewardPoints,
        ...other
    } = props;

    const isAuthorized = useIsAuthorized();
    const {data} = useCheckoutQuery();

    const cartId = data?.cart?.id;
    const coupons = data?.cart?.coupons;

    const options = {
        awaitRefetchQueries: true,
        refetchQueries: () => {
            if (!showRewardPoints || !isAuthorized) return null;

            return [{
                query: REWARD_POINTS_SETTINGS_QUERY,
                variables: {
                    input: {cart_id: cartId}
                }
            }];
        }
    };

    const [addCoupon, {loading: addLoading, error: addError}] = useAddCouponOnCartMutation(options);
    const [removeCoupon, {loading: removeLoading, error: removeError}] = useRemoveCouponFromCartMutation(options);

    const {onSetCheckoutErrors} = useContext(CheckoutContext);
    const couponInputRef = useRef();

    const handleOnAddCoupon = async (code) => {
        try {
            const resp = await addCoupon({cart_id: cartId, code});
            onAddCoupon(code);
            return resp;
        } catch (e) {
            const errors = {
                code: {
                    message: e,
                    ref: couponInputRef.current,
                    type: 'incorrect promo code'
                }
            };

            onSetCheckoutErrors(errors, 'incorrect promo code');
        }
    };

    const handleOnRemoveCoupon = async (code) => {
        const resp = await removeCoupon({cart_id: cartId, code});
        onRemoveCoupon(code);
        return resp;
    };

    return (
        <Component {...other}
                   coupons={coupons}
                   loading={addLoading || removeLoading}
                   error={addError || removeError}
                   onAdd={handleOnAddCoupon}
                   couponInputRef={couponInputRef}
                   onRemove={handleOnRemoveCoupon}/>
    );
}
