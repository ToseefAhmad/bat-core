import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';

import {useToast} from '@luft/common';
import {
    ProductContext,
    useProductContextField,
    useProductState
} from '@luft/product';
import {SimpleAddToCartComponent, useGiftCardAddToCart} from '@luft/quote';
import type {
    Cart,
    Product,
    AddToCartPlacementTypeEnum,
    GiftCardItem
} from '@luft/types';
import type {MutationHookOptions} from '@luft/apollo';

import messages from '@luft/quote/src/components/GiftCardAddToCart.container/resources/messages';

import {trackAddToCart} from '../../../../data-layer';

type Props = {
    /**
     * Presentation component, that will consume data and callbacks from this container component
     */
    as?: React.Component | SimpleAddToCartComponent,
    /**
     * Product entity
     *
     * **Default value from ProductContext**
     */
    product?: Product | ProductContext.product,
    /**
     * An object with GiftCard information which includes chosen amount end email details.
     *
     * **Default value from ProductContext**
     */
    giftCard?: GiftCardItem | ProductContext.productState.giftCard,
    /**
     * If product is in stock (makes button disabled if not)
     *
     * **Default value from ProductContext**
     */
    inStock?: boolean | ProductContext.product.inventory.in_stock,
    /**
     * Selected quantity of product
     *
     * **Default value from ProductContext**
     */
    qty?: number | ProductContext.productState.qty,
    /**
     * Button title, by default uses translated text "Add To Cart" or "Adding..." if adding is in progress
     */
    title?: string,
    /**
     * If Add To Cart should be disabled
     */
    isDisabled?: boolean,
    /**
     * If success message should be shown
     */
    showSuccessMessage?: boolean,
    /**
     * Callback used when user add product to cart
     */
    onAddToCart?: () => Cart | void,
    /**
     * Flag that indicates removing from placement after successful 'Add to Cart'
     */
    removeFrom?: AddToCartPlacementTypeEnum,
    /**
     * `useCartMutation` hook options
     */
    mutationOptions?: MutationHookOptions
};

export function GiftCardAddToCartContainer(
    {
        as: Component = SimpleAddToCartComponent,
        product,
        qty,
        giftCard,
        inStock,
        isDisabled,
        showSuccessMessage = true,
        removeFrom = null,
        title,
        onAddToCart,
        mutationOptions = {},
        ...other
    }: Props) {
    const $product = useProductContextField('product', product);
    const $inStock = useProductContextField('product.inventory.in_stock', inStock);
    const [$giftCard] = useProductState('giftCard', giftCard);
    const [$qty] = useProductState('qty', qty);

    const [addItem, {loading}] = useGiftCardAddToCart(mutationOptions);
    const {formatMessage} = useIntl();
    const addToast = useToast();

    const handleAddToCart = useCallback(async () => {
        if (!$product || !$giftCard) return;
        try {
            // convert gift card to gift card input
            // the only difference is that amount is Float, not Money
            const giftCardItemInput = {
                ...$giftCard,
                amount: $giftCard.amount?.value
            };
            const resp = await addItem($product?.id, $qty, giftCardItemInput, {removeFrom});
            if (showSuccessMessage) {
                addToast(formatMessage(messages.add_success, {name: $product.name}), 'success');
            }
            if (onAddToCart) onAddToCart(resp);
            trackAddToCart({data: resp.data, product: $product, qty: $qty});
            return resp;
        } catch (e) {
            addToast(e.message, 'error');
        }
    }, [$product, $qty, $giftCard, removeFrom, addItem, addToast, formatMessage, onAddToCart, showSuccessMessage]);

    return (
        <Component {...other}
                   title={title}
                   isDisabled={isDisabled || !$inStock || !$giftCard}
                   isAddingToCart={loading}
                   onAddToCart={handleAddToCart}/>
    );
}
