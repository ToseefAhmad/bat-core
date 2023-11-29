import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';

import {useToast} from '@luft/common';
import {
    ProductContext,
    useProductContextField,
    useProductState
} from '@luft/product';
import {SimpleAddToCartComponent, useGroupedAddToCart} from '@luft/quote';
import type {
    Cart,
    Product,
    AddToCartPlacementTypeEnum
} from '@luft/types';
import type {MutationHookOptions} from '@luft/apollo';

import messages from '@luft/quote/src/components/GroupedAddToCart.container/resources/messages';

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
     * List of items which are included in the Group Product
     *
     * **Default value from ProductContext**
     */
    groupSet?: { product: Product, qty: number }[] | ProductContext.productState.groupSet,
    /**
     * If product is in stock (makes button disabled if not)
     *
     * **Default value from ProductContext**
     */
    inStock?: boolean | ProductContext.product.inventory.in_stock,
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

export function GroupedAddToCartContainer(
    {
        as: Component = SimpleAddToCartComponent,
        product,
        groupSet,
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
    const [$groupSet] = useProductState('groupSet', groupSet);

    const [addItem, {loading}] = useGroupedAddToCart(mutationOptions);
    const {formatMessage} = useIntl();
    const addToast = useToast();

    const handleAddToCart = useCallback(async () => {
        if (!$product || !$groupSet) return;
        try {
            // convert groupSet card to array of items
            const groupedProducts = $groupSet.map(item => ({
                product_id: item.product?.id,
                quantity: item.qty,
                grouped_product_id: $product.id
            })).filter(({quantity}) => !!quantity); // filter out 0 quantity products

            const resp = await addItem($product?.id, groupedProducts, {removeFrom});
            if (showSuccessMessage) {
                addToast(formatMessage(messages.add_success, {name: $product.name}), 'success');
            }
            if (onAddToCart) onAddToCart(resp);
            trackAddToCart({data: resp.data, product: $product, qty: null});
            return resp;
        } catch (e) {
            addToast(e.message, 'error');
        }
    }, [$product, $groupSet, removeFrom, addItem, addToast, formatMessage, onAddToCart, showSuccessMessage]);

    return (
        <Component {...other}
                   title={title}
                   isDisabled={isDisabled || !$inStock || !$groupSet}
                   isAddingToCart={loading}
                   onAddToCart={handleAddToCart}/>
    );
}
