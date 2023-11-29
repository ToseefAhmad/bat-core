import React, {useCallback, useMemo} from 'react';
import classnames from 'classnames';

import {SaveButtonComponent} from '@luft/common';
import type {Product, Variation} from '@luft/types';

import {useProductContextField, useProductState} from '@luft/product';
import {ProductContext} from '@luft/product/src/contexts';

type Props = {
    /**
     * Save button title, defaults to translated `Save` string
     */
    title?: React.ReactNode | string,
    /**
     * Original product entity
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
     * If product is in stock (makes button disabled if not)
     *
     * **Default value from ProductContext**
     */
    inStock?: boolean | ProductContext.product.inventory.in_stock,
    /**
     * If button is disabled
     * */
    disabled?: boolean,
    /**
     * Callback fired when a Save is clicked
     */
    onSave?: (Product) => void,
    /**
     * Custom className
     */
    className?: string,
    /**
     * Flag uses to ignore stock status
     */
    ignoreStock?: boolean
};

/**
 * Button to Save Configurable product, is disabled when product is out of stock except wishlist
 */
export function SaveConfigurableProductComponent(
    {
        title,
        product,
        inStock,
        variation,
        qty,
        disabled,
        onSave,
        className,
        ignoreStock = false,
        ...other
    }: Props) {
    const $product = useProductContextField('originalProduct', product);
    const $inStock = useProductContextField('product.inventory.in_stock', inStock);
    const [$variation] = useProductState('variation', variation);
    const [$qty] = useProductState('qty', qty);
    const isDisabled = useMemo(() => (
        disabled || (!ignoreStock && !$inStock) || !$variation
    ), [disabled, $inStock, $variation, ignoreStock]);

    const handleSave = useCallback(() => onSave($product, {qty: $qty, variation: $variation}),
        [onSave, $product, $qty, $variation]);

    return (
        <SaveButtonComponent className={classnames('save-configurable-product-component', className)}
                             title={title}
                             disabled={isDisabled}
                             onClick={handleSave}
                             {...other}/>
    );
}
