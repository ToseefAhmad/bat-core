import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';

import {useToast} from '@luft/common';
import {
    ProductContext,
    useProductContextField,
    useProductState
} from '@luft/product';
import {SimpleAddToCartComponent} from '@luft/quote';

import type {MutationHookOptions} from '@luft/apollo';
import type {
    Cart,
    Product,
    AddToCartPlacementTypeEnum
} from '@luft/types';

import messages from '@luft/quote/src/components/SimpleAddToCart.container/resources/messages';

import {useSimpleAddToCart} from '../../hooks';
import {trackAddToCart} from '../../../../data-layer';
import {getEngravingOptions} from '../../../../product';

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
    mutationOptions?: MutationHookOptions
};

export function SimpleAddToCartContainer(
    {
        as: Component = SimpleAddToCartComponent,
        product,
        qty,
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
    const [$qty] = useProductState('qty', qty);
    const [selectedEngravingOptions] = useProductState('selectedEngravingOptions');

    const [addItem, {loading}] = useSimpleAddToCart(mutationOptions);
    const {formatMessage} = useIntl();
    const addToast = useToast();

    const handleAddToCart = useCallback(async () => {
        if (!$product) return;

        const engravingOptions = getEngravingOptions(selectedEngravingOptions);
        try {
            const resp = await addItem($product?.id, $qty, engravingOptions, {removeFrom});
            if (showSuccessMessage) {
                addToast(formatMessage(messages.add_success, {name: $product.name}), 'success');
            }
            if (onAddToCart) onAddToCart(resp);
            trackAddToCart({data: resp.data, product: $product, qty: $qty});
            return resp;
        } catch (e) {
            addToast(e.message, 'error');
        }
    }, [
        $product,
        removeFrom,
        $qty,
        addItem,
        addToast,
        formatMessage,
        onAddToCart,
        showSuccessMessage,
        selectedEngravingOptions
    ]);

    return (
        <Component {...other}
                   title={title}
                   isDisabled={isDisabled || !$inStock}
                   isAddingToCart={loading}
                   onAddToCart={handleAddToCart}/>
    );
}
