import React from 'react';
import {useIntl} from 'react-intl';
import {isArray, noop} from 'lodash';
import classnames from 'classnames';

import {AppliedDiscountItemComponent, LoaderComponent} from '@luft/common';
import type {CartCoupon} from '@luft/types';

import messages from '@luft/checkout/src/components/CouponAppliedItems.component/resources/messages';

type Props = {
    loading?: boolean,
    className?: string,
    coupons: CartCoupon[],
    onRemove?: Function
};

export function CouponAppliedItemsComponent(props: Props) {
    const {
        loading,
        coupons,
        onRemove = noop,
        className = ''
    } = props;

    const {formatMessage} = useIntl();

    if (!coupons || !isArray(coupons) || coupons.length === 0) {
        return null;
    }

    return (
        <div className={classnames('coupon-applied-items-component', className)}>
            {loading && <LoaderComponent type="overlay"/>}

            {coupons.map(({code, applied_discount, percent}) => !!code && (
                <AppliedDiscountItemComponent key={code}
                                              code={code}
                                              title={formatMessage(messages.title)}
                                              money={applied_discount}
                                              percent={percent}
                                              onRemove={onRemove}/>
            ))}
        </div>
    );
}
