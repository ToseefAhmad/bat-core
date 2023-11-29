import React from 'react';
import {useIntl} from 'react-intl';

import {AccountTitleComponent} from '@luft/account/src/components/AccountTitle.component';

import {AccountReferralTabsComponent} from '../AccountReferralTabs.component';
import messages from './resources/messages';

type Props = {
    /**
     * Text, which is used as a title
     */
    title?: string,
    /**
     * Callback, which is used to go back
     */
    onBack?: Function,
    /**
     * Value, which enables dashboard tab in My Account
     */
    showDashboardTab?: boolean,
    /**
     * Value, which enables rewards tab in My Account
     */
    showMyRewardsTab?: boolean
};

export function AccountReferralProgramComponent(props: Props) {
    const {formatMessage} = useIntl();
    const {
        onBack,
        title = formatMessage(messages.title),
        showDashboardTab,
        showMyRewardsTab,
        ...other
    } = props;

    return (
        <div className="account-referral-program-component">
            <AccountTitleComponent title={title}
                                   onBack={onBack}/>
            <AccountReferralTabsComponent {...other}
                                          showDashboardTab={showDashboardTab}
                                          showMyRewardsTab={showMyRewardsTab}/>
        </div>
    );
}
