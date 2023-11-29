import React from 'react';
import type {ComponentType} from 'react';

import {
    LoaderComponent,
    ErrorComponent,
    NoCacheComponent
} from '@luft/common';

import {AccountReferralsListComponent} from '../AccountReferralsList.component';
import {useCustomerAffiliateProgramReferralsData} from '../../../../sales';

type Props = {
    as?: ComponentType<{}>,
    loadingAs?: ComponentType<{}>,
    errorAs?: ComponentType<{}>,
    noCacheAs?: ComponentType<{}>,
    awaitResult?: boolean
}

export function AccountReferralsListContainer(props: Props) {
    const {
        as: Component = AccountReferralsListComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        ...other
    } = props;

    const referralsQuery = useCustomerAffiliateProgramReferralsData();

    if (awaitResult && referralsQuery.loading) return Loading && <Loading type="block"/>;
    if (awaitResult && referralsQuery.dataError) return Error && <Error error={referralsQuery.error}/>;
    if (awaitResult && referralsQuery.noCache) return NoCache && <NoCache/>;

    const referrals = referralsQuery.data?.getReferrals?.items;
    const count = referralsQuery.data?.getReferrals?.count;
    const total = referralsQuery.data?.getReferrals?.total;
    const canLoadMore = referrals && total > count;

    return (
        <Component {...other}
                   referrals={referrals}
                   total={total}
                   canLoadMore={canLoadMore}
                   isLoadingMore={referralsQuery.loadingMore}
                   onLoadMore={referralsQuery.fetchMore}/>
    );
}
