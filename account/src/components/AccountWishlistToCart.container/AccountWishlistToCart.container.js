import React, {useCallback} from 'react';
import {useHistory} from 'react-router';
import {useIntl} from 'react-intl';

import {useToast} from '@luft/common';

import {AccountWishlistToCartComponent} from '../AccountWishlistToCart.component';
import {useWishlistAddToCart} from '../../../../wishlist';

import messages from './resources/messages';

import type {WishlistCartUserInputError} from '../../../../types';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: React.Component,
    /**
     * Count of wishlist items
     */
    itemsCounter?: number,
    /**
     * Callback to add all items to cart
     */
    onAddToCart?: () => void,
    /**
     * Callback for error to add to cart
     */
    onAddToCartErrors?: (data: [WishlistCartUserInputError]) => void
};

export function AccountWishlistToCartContainer({
    as: Component = AccountWishlistToCartComponent,
    itemsCounter = 0,
    onAddToCart,
    onAddToCartErrors
}: Props) {
    const [addToCart, {loading, error}] = useWishlistAddToCart();
    const history = useHistory();
    const addToast = useToast();
    const {formatMessage} = useIntl();

    const handleAddToCart = useCallback(async () => {
        const resp = await addToCart();
        const {status, add_wishlist_items_to_cart_user_errors, wishlist} = resp?.data?.addWishlistItemsToCart || {};

        if (status) {
            addToast(formatMessage(messages.success_message), 'success');
            return history.push('/cart');
        }

        if (!status) {
            const total = wishlist?.products?.total;

            if (itemsCounter > total) addToast(formatMessage(messages.success_message_partial), 'success');
            if (onAddToCartErrors) onAddToCartErrors(add_wishlist_items_to_cart_user_errors);
        }

        if (onAddToCart) onAddToCart(resp);
    }, [addToCart, onAddToCart]);

    return (
        <Component loading={loading}
                   error={error}
                   onAddToCart={handleAddToCart}/>
    );
}
