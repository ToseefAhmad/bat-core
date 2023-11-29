import React from 'react';

import {
    ErrorComponent,
    LoaderComponent,
    useStoreConfigQuery
} from '@luft/common';
import {AccountMenuComponent} from '@luft/account';
import {useViewerQuery} from '@luft/user';

type Props = {
    as?: React.Component,
    loadingAs?: React.Component,
    errorAs?: React.Component,
    awaitResult?: boolean
}

export function AccountMenuContainer(props: Props) {
    const {
        as: Component = AccountMenuComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        awaitResult = true,
        ...other
    } = props;

    const viewerQuery = useViewerQuery();
    const storeConfigQuery = useStoreConfigQuery();

    const isLoading = viewerQuery.loading || storeConfigQuery.loading;

    if (awaitResult && isLoading) return Loading && <Loading/>;
    if (awaitResult && viewerQuery.dataError) return Error && <Error error={viewerQuery.error}/>;

    const enableSubscription = storeConfigQuery.data?.storeConfig?.enable_subscription;
    const enableCouponWallet = storeConfigQuery.data?.storeConfig?.show_coupon_wallet;
    const enableWishlist = storeConfigQuery.data?.storeConfig?.magento_wishlist_general_is_enabled === '1';
    const enableReferralProgramItemMenu = storeConfigQuery.data?.storeConfig?.show_referral_program_menu;
    const account = viewerQuery.data?.viewer?.user || {};

    return (
        <Component {...other}
                   q={viewerQuery}
                   firstName={account.first_name}
                   lastName={account.last_name}
                   enableSubscription={enableSubscription}
                   enableCouponWallet={enableCouponWallet}
                   enableReferralProgramItemMenu={enableReferralProgramItemMenu}
                   enableWishlist={enableWishlist}/>
    );
}
