import React from 'react';

import {AccountReferralLinkContainer} from '../AccountReferralLink.container';
import {AccountReferralsListContainer} from '../AccountReferralsList.container';

export function AccountReferralsComponent() {
    return (
        <>
            <AccountReferralLinkContainer/>
            <AccountReferralsListContainer/>
        </>
    );
}
