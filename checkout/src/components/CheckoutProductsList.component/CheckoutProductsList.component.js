import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import classnames from 'classnames';

import {CheckoutTotalsContainer} from '@luft/checkout';
import type {CartItem} from '@luft/types';

import {CheckoutTotalsInfoComponent} from '../CheckoutTotalsInfo.component';
import {CheckoutProductsListItemComponent} from '../CheckoutProductsListItem.component';
import messages from './resources/messages';

type Props = {
    /**
     * List of cart products
     */
    cartItems: CartItem[],
    /**
     * Total amount of cart products
     */
    cartTotalItems: number,
    /**
     * Show products by default
     */
    show?: boolean,
    /**
     * Custom total items title
     */
    titleTotalItems?: string
};

export function CheckoutProductsListComponent(props: Props) {
    const {
        cartItems,
        cartTotalItems,
        show = true,
        titleTotalItems
    } = props;

    const {formatMessage} = useIntl();
    const [showProducts, setShowProducts] = useState(show);

    if (!cartItems.length) return null;

    const productBodyClassNames = classnames('checkout-products-list-component-body', {
        'checkout-products-list-component-body-hidden': !showProducts
    });

    const productToggleIconClassNames = classnames('checkout-products-list-component-toggle-icon', {
        'checkout-products-list-component-toggle-icon-active': showProducts
    });

    const handleToggleProducts = () => {
        setShowProducts(prev => !prev);
    };

    return (
        <div className="checkout-products-list-component">
            <div className="checkout-products-list-component-header">
                <span className="checkout-products-list-component-count">
                    {formatMessage(titleTotalItems || messages.total_items, {count: cartTotalItems})}
                </span>
                <span className="checkout-products-list-component-header-inner">
                    <CheckoutTotalsContainer as={CheckoutTotalsInfoComponent}/>
                    <span role="button"
                          tabIndex="0"
                          aria-label={showProducts
                              ? formatMessage(messages.hide_products)
                              : formatMessage(messages.show_products)
                          }
                          className={productToggleIconClassNames}
                          onClick={handleToggleProducts}
                          onKeyDown={handleToggleProducts}/>
                </span>
            </div>
            <div className={productBodyClassNames}>
                <ul className="checkout-products-list-component-list">
                    {cartItems.map(item => (
                        <li key={item.cart_item_id}
                            className="checkout-products-list-component-item">
                            <CheckoutProductsListItemComponent cartItem={item}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
