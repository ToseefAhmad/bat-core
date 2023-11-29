import React from 'react';
import type {ComponentType} from 'react';

import {
    LoaderComponent,
    ErrorComponent,
    NoCacheComponent
} from '@luft/common';

import {AccountReferralDashboardComponent} from '../AccountReferralDashboard.component';
import {useCustomerAffiliateProgramDashboard} from '../../../../sales';

type Props = {
    as?: ComponentType,
    loadingAs?: React.Component,
    errorAs?: React.Component,
    noCacheAs?: React.Component,
    awaitResult?: boolean
}

export function AccountReferralDashboardContainer(props: Props) {
    const {
        as: Component = AccountReferralDashboardComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        ...other
    } = props;

    const dashboardQuery = useCustomerAffiliateProgramDashboard();

    if (awaitResult && dashboardQuery.loading) return Loading && <Loading/>;
    if (awaitResult && dashboardQuery.error) return Error && <Error error={dashboardQuery.error}/>;
    if (awaitResult && dashboardQuery.noCache) return NoCache && <NoCache/>;

    const dashboardData = dashboardQuery.data?.getCustomerAffiliateProgramDashboard;

    return (
        <Component {...other}
                   dashboardData={dashboardData}/>
    );
}
