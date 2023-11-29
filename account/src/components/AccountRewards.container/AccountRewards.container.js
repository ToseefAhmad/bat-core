import React from 'react';
import type {ComponentType} from 'react';

import {
    LoaderComponent,
    ErrorComponent,
    NoCacheComponent
} from '@luft/common';

import {AccountRewardsComponent} from '../AccountRewards.component';
import {useCustomerAffiliateProgramTransactions} from '../../../../sales';

type Props = {
    as?: ComponentType<{}>,
    loadingAs?: ComponentType<{}>,
    errorAs?: ComponentType<{}>,
    noCacheAs?: ComponentType<{}>,
    awaitResult?: boolean
}

export function AccountRewardsContainer(props: Props) {
    const {
        as: Component = AccountRewardsComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        ...other
    } = props;

    const transactionsQuery = useCustomerAffiliateProgramTransactions();

    if (awaitResult && transactionsQuery.loading) return Loading && <Loading type="overlay"/>;
    if (awaitResult && transactionsQuery.error) return Error && <Error error={transactionsQuery.error}/>;
    if (awaitResult && transactionsQuery.noCache) return NoCache && <NoCache/>;

    const items = transactionsQuery.data?.getTransactions?.items;
    const count = transactionsQuery.data?.getTransactions?.count;
    const total = transactionsQuery.data?.getTransactions?.total;
    const isExpirationEnabled = transactionsQuery.data?.getTransactions?.isExpirationEnabled;
    const canLoadMore = items && total > count;

    return (
        <Component {...other}
                   items={items}
                   isExpirationEnabled={isExpirationEnabled}
                   canLoadMore={canLoadMore}
                   isLoadingMore={transactionsQuery.loadingMore}
                   onLoadMore={transactionsQuery.fetchMore}/>
    );
}
