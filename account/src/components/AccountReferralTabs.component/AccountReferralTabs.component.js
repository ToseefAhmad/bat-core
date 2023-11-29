import React, {useState} from 'react';
import {useIntl} from 'react-intl';

import {TabContainerComponent, TabNavComponent} from '@luft/common';

import {AccountReferralDashboardContainer} from '../AccountReferralDashboard.container';
import {AccountReferralsComponent} from '../AccountReferrals.component';
import {AccountRewardsContainer} from '../AccountRewards.container';
import messages from './resources/messages';

type Props = {
    activeTab?: string,
    showDashboardTab?: boolean,
    showMyRewardsTab?: boolean
};

const DASHBOARD_TAB = 'dashboard';
const REFERRALS_TAB = 'referrals';

export function AccountReferralTabsComponent(props: Props) {
    const {formatMessage} = useIntl();

    const {
        showDashboardTab,
        showMyRewardsTab,
        activeTab = showDashboardTab ? DASHBOARD_TAB : REFERRALS_TAB,
    } = props;

    const [tabKey, setTabKey] = useState(activeTab);

    const handleSelectTab = tab => {
        setTabKey(tab);
    };

    return (
        <div className="account-referral-tabs-component">
            <TabContainerComponent id="referral-program-tabs"
                                   activeKey={tabKey}
                                   onSelect={handleSelectTab}>
                <TabNavComponent>
                    {showDashboardTab && (
                        <TabNavComponent.Item>
                            <TabNavComponent.Link eventKey="dashboard">
                                {formatMessage(messages.dashboard_title)}
                            </TabNavComponent.Link>
                        </TabNavComponent.Item>
                    )}

                    <TabNavComponent.Item>
                        <TabNavComponent.Link eventKey="referrals">
                            {formatMessage(messages.referrals_title)}
                        </TabNavComponent.Link>
                    </TabNavComponent.Item>

                    {showMyRewardsTab && (
                        <TabNavComponent.Item>
                            <TabNavComponent.Link eventKey="rewards">
                                {formatMessage(messages.rewards_title)}
                            </TabNavComponent.Link>
                        </TabNavComponent.Item>
                    )}
                </TabNavComponent>

                <TabContainerComponent.Content>
                    {showDashboardTab && (
                        <TabContainerComponent.Panel eventKey="dashboard">
                            <AccountReferralDashboardContainer/>
                        </TabContainerComponent.Panel>
                    )}

                    <TabContainerComponent.Panel eventKey="referrals">
                        <AccountReferralsComponent/>
                    </TabContainerComponent.Panel>

                    {showMyRewardsTab && (
                        <TabContainerComponent.Panel eventKey="rewards">
                            <AccountRewardsContainer/>
                        </TabContainerComponent.Panel>
                    )}
                </TabContainerComponent.Content>
            </TabContainerComponent>
        </div>
    );
}
