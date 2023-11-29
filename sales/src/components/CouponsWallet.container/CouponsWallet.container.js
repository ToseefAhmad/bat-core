import React from 'react';
import {useIntl} from 'react-intl';
import {noop} from 'lodash';
import type {ComponentType} from 'react';

import {
    LoaderComponent,
    ErrorComponent,
    NoCacheComponent,
    useToast,
    useStoreConfigQuery
} from '@luft/common';
import {useAddCouponOnCartMutation, useCartIdQuery} from '@luft/quote';
import {useIsAuthorized} from '@luft/user';

import {CouponsWalletComponent} from '../CouponsWallet.component';
import {useWalletRulesWithCoupons} from '../../hooks';

import messages from './resources/messages';

import REWARD_POINTS_SETTINGS_QUERY from '../../../../quote/src/graphql/queries/RewardPointsSettings.query.graphql';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: ComponentType<{}>,
    /**
     * Represent for loading view
     */
    loadingAs?: ComponentType<{}>,
    /**
     * Represent for error view
     */
    errorAs?: ComponentType<{}>,
    /**
     * Represent for no cache view
     */
    noCacheAs?: ComponentType<{}>,
    /**
     * Flag, used to identify handling of loading state by container
     */
    awaitResult?: boolean,
    /**
     * Callback, which is used on adding a coupon
     */
    onApplyCoupon?: Function
}

export function CouponsWalletContainer(props: Props) {
    const {
        as: Component = CouponsWalletComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        onApplyCoupon = noop,
        ...other
    } = props;

    const addToast = useToast();
    const {formatMessage} = useIntl();
    const isAuthorized = useIsAuthorized();

    const walletQuery = useWalletRulesWithCoupons();
    const {data: cartData} = useCartIdQuery();
    const {data: storeConfigData} = useStoreConfigQuery();

    const cartId = cartData?.cart?.id;
    const showRewardPoints = storeConfigData?.storeConfig?.show_referral_program_menu;

    const [addCoupon, {loading: addLoading, error: addError}] = useAddCouponOnCartMutation({
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
    });

    const handleApplyCoupon = async (code) => {
        try {
            const resp = await addCoupon({cart_id: cartId, code});
            addToast(formatMessage(messages.applied_success), 'success');
            onApplyCoupon();
            return resp;
        } catch {}
    };

    if (awaitResult && walletQuery.loading) return Loading && <Loading/>;
    if (awaitResult && walletQuery.dataError) return Error && <Error error={walletQuery.error}/>;
    if (awaitResult && walletQuery.noCache) return NoCache && <NoCache/>;

    const coupons = walletQuery.data?.getWalletRulesWithCoupons;

    return (
        <Component {...other}
                   loading={addLoading}
                   error={addError}
                   coupons={coupons}
                   onApply={handleApplyCoupon}/>
    );
}
