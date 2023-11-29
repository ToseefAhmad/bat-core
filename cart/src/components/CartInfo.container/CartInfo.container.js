import React from 'react';

import {
    LoaderComponent,
    NoCacheComponent,
    useStoreConfigQuery
} from '@luft/common';
import {CartInfoComponent} from '@luft/cart';

import {useCartQuery} from '../../../../quote';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     * */
    as?: React.Component,
    /**
     * Prop, that identifies component, used for presentation of loading state
     * */
    loadingAs?: React.Component,
    /**
     * Prop, that identifies component, used for presentation of error state
     * */
    errorAs?: React.Component,
    /**
     * Prop, that identifies component, used for presentation when offline and not enough cached data
     * */
    noCacheAs?: React.Component,
    /**
     * Flag, used to identify handling of loading, error and no-cache state by container
     * */
    awaitResult?: boolean
}

export function CartInfoContainer(props: Props) {
    const {
        as: Component = CartInfoComponent,
        loadingAs: Loading = LoaderComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        ...others
    } = props;

    const q = useCartQuery();
    const {data: storeConfigData} = useStoreConfigQuery();
    const {
        show_coupon_wallet,
        show_referral_program_menu: showRewardPoints,
        show_crosssell_items_in_cart: showCrossSellProducts
    } = storeConfigData?.storeConfig || {};

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const cart = q?.data?.cart;

    return (
        <Component {...others}
                   cart={cart}
                   showCouponWallet={show_coupon_wallet}
                   showRewardPoints={showRewardPoints}
                   showCrossSellProducts={showCrossSellProducts}/>
    );
}
