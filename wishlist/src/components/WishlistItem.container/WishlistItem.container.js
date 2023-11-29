import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';

import {useToast} from '@luft/common';

import {
    WishlistItemComponent,
    useRemoveItemFromWishlist,
    useUpdateWishlistItems
} from '@luft/wishlist';

import messages from '@luft/wishlist/src/components/WishlistItem.container/resources/messages';

import type {
    RemoveItemFromWishlistInput,
    Wishlist,
    WishlistItem
} from '@luft/types';
import type {ApolloCache} from '@luft/apollo';

import {useWishlistAddToCart} from '../../hooks';

import type {WishlistCartUserInputError} from '../../../../types';

type Props = {
    /**
     * Wishlist item
     */
    item: WishlistItem,
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: React.Component,
    /**
     * Wishlist items count
     */
    itemsCount?: number,
    /**
     * Callback used when update item in wishlist finished successfully
     */
    onItemUpdate?: () => void,
    /**
     * Callback used when remove item from wishlist finished successfully
     */
    onItemRemove?: () => void,
    /**
     * Callback used when adding item from wishlist to cart finished successfully
     */
    onAddToCart?: () => void,
    /**
     * Callback used when updating/removing wishlist item to update cache of pages into `usePagesQuery` hook
     */
    onUpdatePagesCache?: (ApolloCache, Wishlist) => void,
    /**
     * Callback for error to add to cart
     */
    onAddToCartErrors?: (data: [WishlistCartUserInputError]) => void
}

/**
 * @module @luft/wishlist
 * @scope @luft/wishlist
 * @exports WishlistItemContainer
 * @function WishlistItemContainer
 * @kind Container
 *
 * @description
 * Container component to provide wishlist item
 */

/**
 * @typedef {React.Component} WishlistItemPresentationComponent
 * @kind Component
 *
 * @description
 * Presentation component, that consumes data from WishlistItemContainer
 *
 * @summary
 * List of props, passed to presentation component by container
 *
 * @param {React.Component|WishlistItemPresentationComponent} as=WishlistItemComponent - Presentation
 * component, that will consume callbacks from this container component
 * @param {WishlistItem} item - Wishlist item
 * @param {boolean} loading - Loading state of mutation
 * @param {Error} error - Error state of mutation
 * @param {MutationHookOptions} cartMutationOptions - `useCartMutation` hook options
 * @param {Function} onItemUpdate - Callback on update item in wishlist
 * @param {Function} onItemRemove - Callback on remove item from wishlist
 * @param {Function} onAddToCart - Callback on add item from wishlist to cart
 */
export function WishlistItemContainer({
    item,
    as: Component = WishlistItemComponent,
    onItemUpdate,
    onItemRemove,
    onAddToCart,
    onUpdatePagesCache,
    itemsCount,
    onAddToCartErrors,
    ...other
}: Props) {
    const itemId = item?.id;
    const productType = item?.product?.type;
    const productName = item?.product?.name;
    const [addToCart, {loading: addToCartLoading}] = useWishlistAddToCart();

    const [error, setError] = useState();
    const {formatMessage} = useIntl();
    const addToast = useToast();
    const [updateItem, {loading: updateLoading}] = useUpdateWishlistItems(productType, {
        variables: {start: 0, count: itemsCount},
        update: (cache, {data}) => {
            if (onUpdatePagesCache) {
                const wishlist = Object.values(data)[0];
                onUpdatePagesCache(cache, wishlist);
            }
        }
    });
    const [removeItem, {loading: removeLoading}] = useRemoveItemFromWishlist({
        variables: {start: 0, count: itemsCount},
        update: (cache, {data: {removeItemFromWishlist: wishlist}}) => {
            if (onUpdatePagesCache) onUpdatePagesCache(cache, wishlist);
        }
    });

    const handleOnItemUpdate = useCallback(async (updatedProduct, productState) => {
        try {
            const resp = await updateItem(itemId, productState);
            setError(null);
            addToast(formatMessage(messages.update_success, {name: productName}), 'success');
            if (onItemUpdate) onItemUpdate(itemId, productState);
            return resp;
        } catch (e) {
            setError(e);
        }
    }, [addToast, formatMessage, itemId, onItemUpdate, productName, updateItem]);

    const handleOnUpdateItemQty = useCallback(async (quantity: number) => {
        if (quantity) {
            await updateItem(itemId, {qty: quantity});
        }
        await updateItem(itemId, {qty: quantity});
    }, [itemId, updateItem]);

    const handleOnRemoveItem = useCallback(async (input: RemoveItemFromWishlistInput) => {
        try {
            const resp = await removeItem(input);
            setError(null);
            addToast(formatMessage(messages.remove_success, {name: productName}), 'success');
            if (onItemRemove) onItemRemove(input);
            return resp;
        } catch (e) {
            setError(e);
        }
    }, [addToast, formatMessage, onItemRemove, productName, removeItem]);

    const handleOnItemAddToCart = useCallback(async () => {
        try {
            const resp = await addToCart([itemId]);
            setError(null);
            const {status, add_wishlist_items_to_cart_user_errors} = resp?.data?.addWishlistItemsToCart || {};
            if (status) addToast(formatMessage(messages.add_success, {name: productName}), 'success');
            if (onAddToCartErrors) onAddToCartErrors(add_wishlist_items_to_cart_user_errors);
            if (onAddToCart) onAddToCart();
            return resp;
        } catch (e) {
            setError(e);
        }
    }, [itemId, onAddToCart, onAddToCartErrors]);

    return (
        <Component {...other}
                   item={item}
                   error={error}
                   loading={updateLoading || removeLoading || addToCartLoading}
                   onItemUpdate={handleOnItemUpdate}
                   onItemRemove={handleOnRemoveItem}
                   onItemAddToCart={handleOnItemAddToCart}
                   onItemUpdateQty={handleOnUpdateItemQty}/>
    );
}
