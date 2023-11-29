import React from 'react';
import {useIntl} from 'react-intl';

import {
    ButtonComponent,
    MoneyComponent
} from '@luft/common';
import {CmsBlockContainer} from '@luft/cms';

import messages from '@luft/cart/src/components/CartTotals.component/resources/messages';

import type {Cart} from '@luft/types';

type Props = {
    cart: Cart,
    onNavigateToCheckout?: Function
};

export function CartTotalsComponent(props: Props) {
    const {formatMessage} = useIntl();

    const {
        cart,
        onNavigateToCheckout
    } = props;

    const {
        prices,
        total_items,
        error_info
    } = cart;

    return (
        <div className="cart-totals-component">
            <div className="cart-totals-component-body">
                <span className="cart-totals-component-label">
                    {formatMessage(messages.cart_total)}
                </span>
                <div className="cart-totals-component-price grand">
                    <MoneyComponent money={prices.grand_total}/>
                </div>
            </div>
            <div className="cart-totals-component-actions">
                <ButtonComponent className="cart-totals-component-checkout"
                                 type="button"
                                 disabled={total_items === 0 || error_info?.has_error}
                                 onClick={onNavigateToCheckout}
                                 title={formatMessage(messages.checkout_title)}>
                    {formatMessage(messages.checkout_title)}
                </ButtonComponent>
            </div>
            <CmsBlockContainer cmsBlockId="cart-totals-after"
                               group="cart-page"/>
        </div>
    );
}
