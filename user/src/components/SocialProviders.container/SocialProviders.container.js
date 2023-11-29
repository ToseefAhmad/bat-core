import React from 'react';
import {useLocation} from 'react-router-dom';
import type {ComponentType} from 'react';

import {SocialProvidersComponent, useSocialProvidersQuery} from '@luft/user';
import {ErrorComponent, LoaderComponent} from '@luft/common';
import {SocialLoginPageTypeEnum} from '@luft/types';

import {useStorage} from '../../../../common';

type Props = {
    /**
     * View for representing
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
     * Await result
     */
    awaitResult?: boolean,
    /**
     * List of order IDs to assign created guest order(s) to new user
     */
    orderIds?: Array,
    /**
     * Affect to 'socialProviders' query response: 'url' field,
     * that contains social provider return URL based on backoffice config
     */
    pageType?: SocialLoginPageTypeEnum,
    /**
     * Referral code
     */
    referralCode?: string
};

export function SocialProvidersContainer(props: Props) {
    const {
        as: Component = SocialProvidersComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        awaitResult = true,
        orderIds = [],
        pageType,
        referralCode,
        ...other
    } = props;

    const {data, loading, error} = useSocialProvidersQuery({variables: {order_ids: orderIds, page_type: pageType}});
    const {state} = useLocation();
    const {setValue: setFromValue} = useStorage({key: 'from', storage: sessionStorage});
    const {setValue: setReferralCodeValue} = useStorage({key: 'referralCode'});

    const {from} = state || {};

    if (awaitResult && loading) return Loading && <Loading/>;
    if (awaitResult && error) return Error && <Error error={error}/>;

    const onSocialLogin = () => {
        if (from) setFromValue(from);
        if (referralCode) setReferralCodeValue(referralCode);
    };

    const providers = data?.socialProviders;

    return (
        <Component {...other}
                   onSocialLogin={onSocialLogin}
                   providers={providers}/>
    );
}
