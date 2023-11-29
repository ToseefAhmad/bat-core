import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';
import classnames from 'classnames';

import {DateComponent} from '@luft/common';

import messages from './resources/messages';

type Props = {
    item: Object,
    isExpirationEnabled: boolean
}

export function AccountRewardItemComponent(props: Props) {
    const {
        item,
        isExpirationEnabled
    } = props;

    const {formatNumber, formatMessage} = useIntl();
    const detailsLabel = formatMessage(messages.details);
    const pointsLabel = formatMessage(messages.points);
    const dateLabel = formatMessage(messages.date_format);
    const expiryDateLabel = formatMessage(messages.expiry_date);

    const points = item?.points;
    const isEarned = parseInt(points, 10) > 0;
    const variant = isEarned ? 'earned' : 'spent';
    const pointsClassName = classnames(
        'account-reward-item-component-row',
        'account-reward-item-component-row-points',
        `account-reward-item-component-row-points-${variant}`
    );

    const daysLeft = useMemo(() => {
        const endDay = item?.expires;
        if (endDay) {
            const today = new Date();
            const timeDiff = new Date(endDay) - new Date(today);
            const willEnd = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (willEnd > 0) return formatMessage(messages.will_expire, {days: willEnd});
            if (willEnd === 0) return formatMessage(messages.expire_today);
        }

        return null;
    }, [item, formatMessage]);

    return (
        <div className="account-reward-item-component">
            <div data-label={detailsLabel}
                 className="account-reward-item-component-row account-reward-item-component-row-details">
                <span className="account-reward-item-component-row-text">
                    {item?.comment}
                </span>
            </div>
            <div data-label={pointsLabel}
                 className={pointsClassName}>
                <span className="account-reward-item-component-row-text">
                    {isEarned ? '+' : ''}
                    {formatNumber(points)}
                </span>
            </div>
            <div data-label={dateLabel}
                 className="account-reward-item-component-row account-reward-item-component-row-date">
                <span className="account-reward-item-component-row-text">
                    <DateComponent date={item?.created}/>
                </span>
            </div>
            {isExpirationEnabled && (
                <div data-label={expiryDateLabel}
                     className="account-reward-item-component-row account-reward-item-component-row-expire-date">
                    <span className="account-reward-item-component-row-text">
                        {daysLeft}
                    </span>
                </div>
            )}
        </div>
    );
}
