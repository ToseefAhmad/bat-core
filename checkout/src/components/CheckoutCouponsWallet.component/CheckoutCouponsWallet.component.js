import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import classnames from 'classnames';
import {noop} from 'lodash';

import {CartCoupon} from '@luft/types';

import {CouponsWalletContainer} from '../../../../sales';
import messages from './resources/messages';

type Props = {
    collapsed?: boolean,
    coupons?: CartCoupon[]
};

const DESCRIPTION_MAX_LENGTH = 45;
const SHORT_DESCRIPTION_WORDS = 3;

export function CheckoutCouponsWalletComponent(props: Props) {
    const {
        collapsed = false,
        coupons = [],
        ...other
    } = props;

    const {formatMessage} = useIntl();
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    const handleClick = () => {
        setIsCollapsed((current) => !current);
    };

    const titleClassNames = classnames('checkout-coupons-wallet-component-title', {
        'checkout-coupons-wallet-component-title-active': !isCollapsed
    });

    const contentClassNames = classnames('checkout-coupons-wallet-component-content', {
        'checkout-coupons-wallet-component-content-collapsed': isCollapsed
    });

    if (!coupons.length) {
        return null;
    }

    return (
        <div className="checkout-coupons-wallet-component">
            <div role="button"
                 tabIndex="0"
                 className={titleClassNames}
                 onClick={handleClick}
                 onKeyPress={noop}>
                {formatMessage(messages.coupons_title)}
            </div>

            <div className={contentClassNames}>
                <CouponsWalletContainer {...other}
                                        onApplyCoupon={handleClick}
                                        descriptionMaxLength={DESCRIPTION_MAX_LENGTH}
                                        shortDescriptionWords={SHORT_DESCRIPTION_WORDS}/>
            </div>
        </div>
    );
}
