import React from 'react';

import {ImageComponent, MoneyComponent} from '@luft/common';
import type {BundledProduct} from '@luft/types';

type Props = {
    /**
     * Current product with Bundled type
     */
    bundledProduct: BundledProduct,
    /**
     * the ratio of the image
     */
    ratio?: number
}

/**
 * Component displays Bundled product with its options and customizations
 */
export function BundledProductComponent(
    {
        bundledProduct,
        ratio = 1,
    }: Props) {
    const productThumbnail = bundledProduct.product.thumbnail_image || {};

    return (
        <article className="bundled-product-component">
            <div className="bundled-product-component-image">
                <ImageComponent image={productThumbnail}
                                ratio={ratio}
                                variant="thumbnail"/>
            </div>
            <div className="bundled-product-component-body">
                <h3 className="bundled-product-component-name">
                    {bundledProduct.product.name}
                </h3>
                <div className="bundled-product-component-values">
                    <div className="bundled-product-component-qty">
                        {`x${bundledProduct.qty}`}
                    </div>
                    <div className="bundled-product-component-price">
                        <MoneyComponent money={{...bundledProduct.price}}/>
                    </div>
                </div>
            </div>
        </article>
    );
}
