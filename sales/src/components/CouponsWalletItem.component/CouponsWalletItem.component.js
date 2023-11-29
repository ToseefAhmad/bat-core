import React, {useEffect} from 'react';
import {noop} from 'lodash';
import classnames from 'classnames';
import {useIntl} from 'react-intl';
import {parse as parseDate, format as formatDate} from 'date-fns';

import {ButtonComponent} from '@luft/common';

import type {CartCoupon} from '@luft/types';

import {useTruncatedText} from '../../../../common';
import messages from './resources/messages';

type Props = {
    coupon: CartCoupon,
    descriptionMaxLength?: number,
    shortDescriptionWords?: number,
    onApply?: Function
};

const getFormattedDate = (inputDate: string) => {
    if (!inputDate) return null;

    try {
        const parsedDate = parseDate(inputDate, 'yyyy-MM-dd HH:mm:ss', new Date());

        return formatDate(parsedDate, 'dd.MM.yyyy');
    } catch {
        return inputDate;
    }
};

export function CouponsWalletItemComponent(props: Props) {
    const {
        coupon,
        descriptionMaxLength,
        shortDescriptionWords,
        onApply = noop
    } = props;

    const {formatMessage} = useIntl();

    const code = coupon?.coupon_info?.code;
    const isUsable = coupon?.coupon_info?.is_usable;
    const expDay = coupon?.coupon_info?.exp_day;
    const formattedDate = getFormattedDate(expDay);
    const label = coupon?.label;
    const description = coupon?.coupon_info?.description;

    const {
        isMore,
        text: descriptionText,
        setInitialText,
        onSetFullText
    } = useTruncatedText({description, descriptionMaxLength, shortDescriptionWords});

    const labelClassNames = classnames('coupons-wallet-component-item-label', {
        'coupons-wallet-component-item-label-full-width': description
    });
    const dateClassNames = classnames('coupons-wallet-component-item-date', {
        'coupons-wallet-component-item-date-expired': !isUsable
    });
    const descriptionClassNames = classnames('coupons-wallet-component-item-description', {
        'coupons-wallet-component-item-description-not-single': expDay
    });
    const rowClassNames = classnames('coupons-wallet-component-item-row', {
        'coupons-wallet-component-item-row-align-right': !label
    });

    useEffect(setInitialText, []);

    return (
        <div className="coupons-wallet-component-item">
            <div className="coupons-wallet-component-item-row">
                <div className="coupons-wallet-component-item-code">
                    {code}
                </div>
                <ButtonComponent variant="secondary"
                                 size="sm"
                                 className="coupons-wallet-component-item-apply"
                                 inline={true}
                                 disabled={!isUsable}
                                 onClick={() => onApply(coupon.coupon_info.code)}>
                    {formatMessage(messages.label_button)}
                </ButtonComponent>
            </div>
            <div className={rowClassNames}>
                {label && (
                    <div className={labelClassNames}>
                        {label}
                    </div>
                )}
                {descriptionText && (
                    <div className={descriptionClassNames}>
                        {descriptionText}
                        {' '}
                        {isMore && (
                            <span role="button"
                                  tabIndex="0"
                                  className="coupons-wallet-component-item-description-more"
                                  onClick={onSetFullText}
                                  onKeyPress={noop}>
                                {formatMessage(messages.label_more)}
                            </span>
                        )}
                    </div>
                )}
                {expDay && (
                    <div className={dateClassNames}>
                        {isUsable
                            ? formatMessage(messages.valid_date)
                            : formatMessage(messages.expired_date)}
                        {` ${formattedDate}`}
                    </div>
                )}
            </div>
        </div>
    );
}
