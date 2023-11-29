import React from 'react';
import {useIntl} from 'react-intl';
import {useHistory} from 'react-router-dom';
import classnames from 'classnames';

import {
    MoneyComponent,
    ButtonComponent,
    ErrorComponent,
    OverlayComponent,
    LoaderComponent
} from '@luft/common';
import {CmsBlockContainer} from '@luft/cms';
import type {
    Product,
    Money
} from '@luft/types';

import {useLockBodyScroll} from '../../../../common';
import {CartItemContainer} from '../CartItem.container';
import {useMiniCart} from '../../hooks';

import messages from './resources/messages';

type CartErrorInfo = {
    has_error: boolean,
    errors: string[]
}

type Props = {
    /**
     * Additional mini-cart classname
     */
    className?: string,
    /**
     * Mini-cart products
     */
    items?: Product[],
    /**
     * Overall sum
     */
    subtotal?: Money,
    /**
     * Total amount of products in mini-cart
     */
    totalItems?: number,
    /**
     * Flag, which is responsible for displaying the loader during execution of mini-cart query and mutations
     */
    loading: boolean,
    /**
     * Error, which could be received from mini-cart query and mutations
     */
    error: Error,
    /**
     * Error information about meeting a cart limit
     */
    limitErrors?: CartErrorInfo,
    /**
     * Currency code
     */
    baseCurrencyCode: string,
    /**
     * Callback, which is fired on pressing the "Buy now" button
     */
    onNavigateCheckout?: () => void,
    /**
     * Callback, which is fired on pressing the "View cart" button
     */
    onNavigateCart?: () => void
};

const getNullSubtotal = (currency) => ({
    __typename: 'Money',
    currency,
    value: 0
});

export function MiniCartComponent(props: Props) {
    const {formatMessage} = useIntl();
    const {isOpenMiniCart, onToggleMiniCart} = useMiniCart();
    const history = useHistory();

    useLockBodyScroll(isOpenMiniCart);

    const {
        className,
        items = [],
        subtotal,
        totalItems,
        loading,
        error,
        limitErrors,
        baseCurrencyCode,
        onNavigateCheckout = () => {
            onToggleMiniCart();
            history.push('/checkout');
        },
        onNavigateCart = () => {
            onToggleMiniCart();
            history.push('/cart');
        }
    } = props;

    const cartSubtotal = subtotal || getNullSubtotal(baseCurrencyCode);
    const cartTotalItems = totalItems || 0;
    const hasProductsInCart = !!items?.length;
    const {has_error: hasLimitError, errors: limitErrorsMessages} = limitErrors || {};
    const limitError = {message: limitErrorsMessages?.[0]};
    const miniCartClassNames = classnames('mini-cart-component', className, {
        'mini-cart-component-empty': !hasProductsInCart
    });

    return (
        <>
            <div className={miniCartClassNames}>
                <header className="mini-cart-component-header">
                    <div className="mini-cart-component-title-block">
                        <ButtonComponent className="mini-cart-component-close-button"
                                         title={formatMessage(messages.close)}
                                         inline={true}
                                         onClick={onToggleMiniCart}/>

                        <span className="mini-cart-component-title">
                            {formatMessage(messages.title)}
                        </span>
                    </div>

                    <div className="mini-cart-component-summary">
                        <span className="mini-cart-component-label">
                            {formatMessage(messages.total_label)}
                        </span>

                        <div className="mini-cart-component-total">
                            <MoneyComponent money={cartSubtotal}/>
                            {' '}

                            <span className="mini-cart-component-amount">
                                {`(${formatMessage(messages.total_amount, {amount: cartTotalItems})})`}
                            </span>
                        </div>
                    </div>
                </header>

                {error && <ErrorComponent error={error}/>}
                {hasLimitError && <ErrorComponent error={limitError}/>}

                {loading ? (
                    <LoaderComponent type="overlay"/>
                ) : (
                    hasProductsInCart ? (
                        <>
                            <div className="mini-cart-component-products">
                                {items.map((item) => (
                                    <CartItemContainer item={item}
                                                       showMoveToWishlistAction={false}
                                                       key={item?.cart_item_id}/>
                                ))}
                            </div>
                            <footer className="mini-cart-component-footer">
                                <ButtonComponent variant="primary"
                                                 title={formatMessage(messages.buy_now)}
                                                 className="mini-cart-component-buy-now-button"
                                                 disabled={hasLimitError}
                                                 onClick={onNavigateCheckout}>
                                    {formatMessage(messages.buy_now)}
                                </ButtonComponent>

                                <ButtonComponent variant="link"
                                                 title={formatMessage(messages.view)}
                                                 inline={true}
                                                 className="mini-cart-component-view-button"
                                                 onClick={onNavigateCart}>
                                    {formatMessage(messages.view)}
                                </ButtonComponent>
                            </footer>
                        </>
                    ) : (
                        <CmsBlockContainer cmsBlockId="cart-continue-shopping"/>
                    )
                )}
            </div>

            <OverlayComponent show={true}
                              onClick={onToggleMiniCart}/>
        </>
    );
}
