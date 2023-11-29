import React from 'react';
import {useIntl} from 'react-intl';
import {isEmpty} from 'lodash';

import {getStoreCodeByPathname} from '../../../../common';
import messages from './resources/messages';

type Props = {
    dashboardData: Object
}

export function AccountReferralDashboardComponent(props: Props) {
    const {formatMessage, formatNumber} = useIntl();
    const {
        dashboardData
    } = props;

    const points = dashboardData?.points;
    const earningRules = dashboardData?.earning_rules;
    const spendingRules = dashboardData?.spending_rules;
    const tierInfo = dashboardData?.tier_info?.label;
    const isPhLocale = getStoreCodeByPathname() === 'ph';

    return (
        <div className="account-referral-dashboard-component">
            <div className="account-referral-dashboard-component-row account-referral-dashboard-component-row-tier">
                <span className="account-referral-dashboard-component-row-title">
                    {formatMessage(messages.tier_title)}
                </span>
                <span className="account-referral-dashboard-component-row-tier-info">
                    {tierInfo}
                </span>
            </div>
            {!isPhLocale && (
                <div className="account-referral-dashboard-component-row">
                    <div className="account-referral-dashboard-component-row-title">
                        {formatMessage(messages.points_title)}
                    </div>
                    <div className="account-referral-dashboard-component-row-content">
                        {formatMessage(messages.you_have_points, {
                            points: formatNumber(points),
                            bold: (text) => (
                                <span className="account-referral-dashboard-component-row-content-points">
                                    {text}
                                </span>
                            )
                        })}
                    </div>
                </div>
            )}
            {!isEmpty(earningRules) && (
                <div className="account-referral-dashboard-component-row">
                    <div className="account-referral-dashboard-component-row-title">
                        {formatMessage(messages.earning_rules_title)}
                    </div>
                    {earningRules.map((item, key) => item?.label && (
                        <div className="account-referral-dashboard-component-row-content"
                             // eslint-disable-next-line react/no-array-index-key
                             key={key}>
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
            {!isEmpty(spendingRules) && (
                <div className="account-referral-dashboard-component-row">
                    <div className="account-referral-dashboard-component-row-title">
                        {formatMessage(messages.spending_rules_title)}
                    </div>
                    {spendingRules.map((item, key) => item?.label && (
                        <div className="account-referral-dashboard-component-row-content"
                             // eslint-disable-next-line react/no-array-index-key
                             key={key}>
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
