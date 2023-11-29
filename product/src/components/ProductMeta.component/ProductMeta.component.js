import React, {useMemo} from 'react';

import {MetaComponent} from '@luft/common';
import {ProductContext, useProductContextField} from '@luft/product';
import type {Product} from '@luft/types';

type Props = {
    /**
     * Product entity. If not passed, uses one from ProductContext
     *
     * **Default value from ProductContext**
     */
    product?: Product | ProductContext.product
}

/**
 * @module @luft/product
 * @scope @luft/product
 * @exports ProductMetaComponent
 * @function ProductMetaComponent
 * @kind Component
 *
 * @description
 * Component, used to add product meta information to the page
 */
export function ProductMetaComponent(
    {
        product
    }: Props) {
    const $product = useProductContextField('product', product);

    const og = useMemo(() => ({
        type: 'product',
        title: $product?.name,
        image: $product?.product_image?.url,
        url: $product?.canonical_url
    }), [$product]);

    if (!$product) return null;

    return (
        <MetaComponent meta={$product}
                       og={og}/>
    );
}
