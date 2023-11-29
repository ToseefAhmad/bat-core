import React from 'react';
import {noop} from 'lodash';
import classnames from 'classnames';

import {CouponContainer} from '@luft/checkout';

type Props = {
    /**
     * Callback on add coupon
     */
    onAddCoupon?: Function,
    /**
     * Custom classname
     */
    className?: string
}

export function CheckoutDiscountsComponent(props: Props) {
    const {
        onAddCoupon = noop,
        className = '',
        ...other
    } = props;

    const classNames = classnames('checkout-discounts-component', className);

    return (
        <div className={classNames}>
            <CouponContainer {...other}
                             onAddCoupon={onAddCoupon}/>
        </div>
    );
}
