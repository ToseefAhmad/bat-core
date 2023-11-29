import React from 'react';
import type {ComponentType} from 'react';

import {
    LoaderComponent,
    ErrorComponent,
    NoCacheComponent
} from '@luft/common';

import {AccountReferralLinkComponent} from '../AccountReferralLink.component';
import {useCustomerAffiliateProgramReferralLink} from '../../../../sales';

type Props = {
    as?: ComponentType<{}>,
    loadingAs?: ComponentType<{}>,
    errorAs?: ComponentType<{}>,
    noCacheAs?: ComponentType<{}>,
    awaitResult?: boolean
}

export function AccountReferralLinkContainer(props: Props) {
    const {
        as: Component = AccountReferralLinkComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        ...other
    } = props;

    const referralLinkQuery = useCustomerAffiliateProgramReferralLink();

    if (awaitResult && referralLinkQuery.loading) return Loading && <Loading type="block"/>;
    if (awaitResult && referralLinkQuery.dataError) return Error && <Error error={referralLinkQuery.error}/>;
    if (awaitResult && referralLinkQuery.noCache) return NoCache && <NoCache/>;

    const referralLink = referralLinkQuery.data?.getReferralUrl?.referral_url;

    return (
        <Component {...other}
                   referralLink={referralLink}/>
    );
}
