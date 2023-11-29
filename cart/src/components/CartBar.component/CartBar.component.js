import React from 'react';
import {useIntl} from 'react-intl';
import {noop} from 'lodash';
import classnames from 'classnames';

import {ButtonComponent} from '@luft/common';
import {Cart} from '@luft/types';

import messages from '@luft/cart/src/components/CartBar.component/resources/messages';

import {getStoreCodeByPathname} from '../../../../common';

import custom_messages from './resources/messages';

type Props = {
    cart: Cart,
    loading: boolean,
    onCartTrigger?: Function
};

export function CartBarComponent({
    cart,
    loading,
    onCartTrigger = noop
}: Props) {
    const {formatMessage} = useIntl();

    const qtyClassNames = classnames('cart-bar-component-qty', {
        'cart-bar-component-qty-position': getStoreCodeByPathname() === 'id'
    });

    return (
        <div className="cart-bar-component">
            <ButtonComponent className="cart-bar-component-button"
                             variant="secondary"
                             type="button"
                             size="lg"
                             inline={true}
                             title={formatMessage(custom_messages.cart_basket_title)}
                             disabled={loading}
                             onClick={onCartTrigger}>
                <span className="cart-bar-component-title">
                    {formatMessage(custom_messages.cart_basket_title)}
                </span>
                {cart?.total_items > 0 && (
                    <span className={qtyClassNames}>
                        {cart.total_items}
                        <span className="cart-bar-component-total-items-title">
                            {formatMessage(messages.cart_items_title)}
                        </span>
                    </span>
                )}
            </ButtonComponent>
        </div>
    );
}
