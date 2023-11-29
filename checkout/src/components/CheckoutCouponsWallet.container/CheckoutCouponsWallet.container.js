import React from 'react';
import type {ComponentType} from 'react';

import {
    LoaderComponent,
    ErrorComponent,
    NoCacheComponent
} from '@luft/common';
import {useCheckoutQuery} from '@luft/quote';

import {CheckoutCouponsWalletComponent} from '../CheckoutCouponsWallet.component';
import {useWalletRulesWithCoupons} from '../../../../sales';

type Props = {
    as?: ComponentType<{}>,
    loadingAs?: ComponentType<{}>,
    errorAs?: ComponentType<{}>,
    noCacheAs?: ComponentType<{}>,
    awaitResult?: boolean
};

export function CheckoutCouponsWalletContainer(props: Props) {
    const {
        as: Component = CheckoutCouponsWalletComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        ...other
    } = props;

    const walletQuery = useWalletRulesWithCoupons();

    const {data} = useCheckoutQuery();
    const appliedCoupons = data?.cart?.coupons;

    if (awaitResult && walletQuery.loading) return Loading && <Loading type="overlay"/>;
    if (awaitResult && walletQuery.dataError) return Error && <Error error={walletQuery.error}/>;
    if (awaitResult && walletQuery.noCache) return NoCache && <NoCache/>;

    const coupons = walletQuery?.data?.getWalletRulesWithCoupons;

    return (
        <Component {...other}
                   collapsed={!!appliedCoupons}
                   coupons={coupons}/>
    );
}
