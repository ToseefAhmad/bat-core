import React from 'react';
import {Redirect} from 'react-router';
import type {ComponentType} from 'react';

import {LoaderComponent, useStoreConfigQuery} from '@luft/common';

import {AccountReferralProgramComponent} from '../AccountReferralProgram.component';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: ComponentType<{}>,
    /**
     * Represent for loading view
     */
    loadingAs?: ComponentType<{}>
};

export function AccountReferralProgramContainer(props: Props) {
    const {
        as: Component = AccountReferralProgramComponent,
        loadingAs: Loading = LoaderComponent,
        ...other
    } = props;

    const q = useStoreConfigQuery();

    if (q.loading) return <Loading/>;

    const showReferralProgramMenu = q.data?.storeConfig?.show_referral_program_menu;

    if (!showReferralProgramMenu) return <Redirect to="/account"/>;

    const showDashboardTab = q.data?.storeConfig?.is_show_dashboard_tab_in_my_account;
    const showMyRewards = q?.data?.storeConfig?.is_show_my_rewards_tab_in_my_account;
    const showPointsMenu = q?.data?.storeConfig?.is_show_points_menu;
    const showMyRewardsTab = showMyRewards && showPointsMenu;

    return (
        <Component {...other}
                   showDashboardTab={showDashboardTab}
                   showMyRewardsTab={showMyRewardsTab}/>
    );
}
