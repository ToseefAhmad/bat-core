import React from 'react';
import {noop} from 'lodash';
import type {ComponentType} from 'react';

import {useIsAuthorized} from '@luft/user';
import {useCheckoutQuery} from '@luft/quote';

import {RewardPointsComponent} from '../RewardPoints.component';
import {
    useRewardPointsSettingsQuery,
    useApplyPointsToCartMutation,
    useRemovePointsFromCartMutation
} from '../../../../quote';
import {useCustomerAffiliateProgramDashboard} from '../../../../sales';

type Props = {
    /**
     * View for representing
     */
    as?: ComponentType<{}>,
    /**
     * Apply points callback
     */
    onApplyPointsToCart?: Function,
    /**
     * Remove points callback
     */
    onRemovePointsFromCart?: Function
};

export function RewardPointsContainer(props: Props) {
    const {
        as: Component = RewardPointsComponent,
        onApplyPointsToCart = noop,
        onRemovePointsFromCart = noop,
        ...other
    } = props;

    const isAuthorized = useIsAuthorized();
    const dashboardQuery = useCustomerAffiliateProgramDashboard({skip: !isAuthorized});
    const pointsSettingsQuery = useRewardPointsSettingsQuery({skip: !isAuthorized});
    const checkoutQuery = useCheckoutQuery({skip: !isAuthorized});

    const [applyPoints, {loading: applyLoading, error: applyError}] = useApplyPointsToCartMutation();
    const [removePoints, {loading: removeLoading, error: removeError}] = useRemovePointsFromCartMutation();

    const isLoading = dashboardQuery.loading || pointsSettingsQuery.loading || checkoutQuery.loading;

    if (!isAuthorized || isLoading) return null;

    const handleApplyPointsToCart = async (reward_points) => {
        try {
            const response = await applyPoints(reward_points);

            onApplyPointsToCart(response);
            return response;
        } catch (e) {
            onApplyPointsToCart({error: e});
        }
    };

    const handleRemovePointsFromCart = async () => {
        try {
            const response = await removePoints();

            onRemovePointsFromCart(response);
            return response;
        } catch (e) {
            onRemovePointsFromCart({error: e});
        }
    };

    const availablePoints = dashboardQuery.data?.getCustomerAffiliateProgramDashboard?.points || 0;
    const pointsSettings = pointsSettingsQuery.data?.getRewardsPointSettings || {};
    const appliedPoints = checkoutQuery.data?.cart?.spend_points?.[0]?.points || 0;

    return (
        <Component {...other}
                   pointsSettings={pointsSettings}
                   availablePoints={availablePoints}
                   appliedPoints={appliedPoints}
                   loading={applyLoading || removeLoading}
                   error={applyError || removeError || pointsSettingsQuery.error}
                   onApplyPointsToCart={handleApplyPointsToCart}
                   onRemovePointsFromCart={handleRemovePointsFromCart}/>
    );
}
