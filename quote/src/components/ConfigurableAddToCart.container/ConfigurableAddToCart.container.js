import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';

import {useToast} from '@luft/common';
import {
    ProductContext,
    useProductContextField,
    useProductState
} from '@luft/product';
import {SimpleAddToCartComponent, useConfigurableAddToCart} from '@luft/quote';
import type {
    Cart,
    Product,
    Variation,
    AddToCartPlacementTypeEnum
} from '@luft/types';
import type {MutationHookOptions} from '@luft/apollo';

import messages from '@luft/quote/src/components/ConfigurableAddToCart.container/resources/messages';

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
    product?: Product | ProductContext.originalProduct,
    /**
     * variation, that contains variation product used for 'CONFIGURABLE' products
     *
     * **Default value from ProductContext state**
     */
    variation?: Variation | ProductContext.productState.variation,
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
     * If product is in stock (makes button disabled if not)
     *
     * **Default value from ProductContext**
     */
    inStock?: boolean | ProductContext.product.inventory.in_stock,
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
    mutationOptions?: MutationHookOptions,
    /**
     * Callback to show error if variation has not been selected
     */
    onShowVariationError?: () => void
};

export function ConfigurableAddToCartContainer(
    {
        as: Component = SimpleAddToCartComponent,
        product,
        qty,
        variation,
        inStock,
        isDisabled,
        showSuccessMessage = true,
        removeFrom = null,
        title,
        onAddToCart,
        mutationOptions = {},
        onShowVariationError,
        ...other
    }: Props) {
    const $product = useProductContextField('originalProduct', product);
    const $inStock = useProductContextField('product.inventory.in_stock', inStock);
    const [$qty] = useProductState('qty', qty);
    const [$variation] = useProductState('variation', variation);

    const [addItem, {loading}] = useConfigurableAddToCart(mutationOptions);
    const {formatMessage} = useIntl();
    const addToast = useToast();

    const handleAddToCart = useCallback(async () => {
        if (!$product) return;

        if (!$variation) {
            onShowVariationError();
            return;
        }

        try {
            const resp = await addItem($product.id, $variation.product.id, $qty, {removeFrom});
            if (showSuccessMessage) {
                addToast(formatMessage(messages.add_success, {name: $product.name}), 'success');
            }
            if (onAddToCart) onAddToCart(resp);
            trackAddToCart({data: resp.data, product: $product, qty: $qty, variation: $variation});
            return resp;
        } catch (e) {
            addToast(e.message, 'error');
        }
    }, [
        $product,
        $variation,
        removeFrom,
        $qty,
        addItem,
        addToast,
        formatMessage,
        onAddToCart,
        onShowVariationError,
        showSuccessMessage
    ]);

    return (
        <Component {...other}
                   title={title}
                   isDisabled={isDisabled || !$inStock}
                   isAddingToCart={loading}
                   onAddToCart={handleAddToCart}/>
    );
}
