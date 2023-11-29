import React, {useCallback, useMemo} from 'react';
import {useIntl} from 'react-intl';

import {useToast} from '@luft/common';
import {
    areEditableBundleOptionsValid,
    ProductContext,
    useProductContextField,
    useProductState
} from '@luft/product';
import {SimpleAddToCartComponent, useEditableBundleAddToCart} from '@luft/quote';
import type {
    AddToCartPlacementTypeEnum,
    BundleOptionInput,
    Cart,
    Product
} from '@luft/types';
import type {MutationHookOptions} from '@luft/apollo';

import messages from '@luft/quote/src/components/EditableBundleAddToCart.container/resources/messages';

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
     * An array with 'EDITABLE_BUNDLE' selected options
     */
    editableBundleOptions?: BundleOptionInput[],
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

export function EditableBundleAddToCartContainer(
    {
        as: Component = SimpleAddToCartComponent,
        product,
        qty,
        editableBundleOptions,
        inStock,
        isDisabled,
        showSuccessMessage = true,
        removeFrom = null,
        title,
        onAddToCart,
        mutationOptions = {},
        ...other
    }: Props) {
    const $product = useProductContextField('originalProduct', product);
    const $inStock = useProductContextField('product.inventory.in_stock', inStock);
    const [$qty] = useProductState('qty', qty);

    // TODO: temporary fix problem replacing types on backend side
    const isNotEditable = useMemo(() => {
        if (!$product?.bundled_products) return false;

        const isEditable = $product.bundled_products.find(item => (
            !item.required || item.products.length !== 1 || item.products.find(p => !p.is_default || p.qty_is_editable)
        ));
        return !isEditable;
    }, [$product?.bundled_products]);

    const notEditableBundleOptions = useMemo(() => {
        if (!$product?.bundled_products.length) return;

        return $product.bundled_products.map((option) => (
            {
                option_id: option.id,
                quantity: option.products?.[0]?.qty,
                values: [option.products?.[0]?.id]
            }
        ));
    }, [$product?.bundled_products]);

    const bundleOptions = isNotEditable ? notEditableBundleOptions : editableBundleOptions;
    const [$editableBundleOptions] = useProductState('editableBundleOptions', bundleOptions);

    const [addItem, {loading}] = useEditableBundleAddToCart(mutationOptions);
    const {formatMessage} = useIntl();
    const addToast = useToast();

    const areBundleOptionsValid = useMemo(() => {
        if (isNotEditable) return true;

        return areEditableBundleOptionsValid($editableBundleOptions, $product?.bundled_products);
    }, [isNotEditable, $editableBundleOptions, $product?.bundled_products]);

    const handleAddToCart = useCallback(async () => {
        if (!$product || !areBundleOptionsValid) return;
        try {
            const resp = await addItem($product.id, $editableBundleOptions, $qty, {removeFrom});
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
        areBundleOptionsValid,
        addItem,
        $editableBundleOptions,
        $qty,
        removeFrom,
        addToast,
        formatMessage,
        onAddToCart,
        showSuccessMessage
    ]);

    return (
        <Component {...other}
                   title={title}
                   isDisabled={isDisabled || !$inStock || !areBundleOptionsValid}
                   isAddingToCart={loading}
                   onAddToCart={handleAddToCart}/>
    );
}
