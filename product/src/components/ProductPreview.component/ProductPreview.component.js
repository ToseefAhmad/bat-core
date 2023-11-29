import React, {useCallback} from 'react';
import {noop} from 'lodash';

import {
    ProductImageComponent,
    ProductPriceComponent,
    ProductLinkComponent,
    ProductProvider
} from '@luft/product';
import {WishlistProductActionsContainer} from '@luft/wishlist';
import type {Product} from '@luft/types';

import {trackProductClick} from '../../../../data-layer';

type Props = {
    /**
     * A product entity, for which preview will be rendered
     */
    product?: Product,
    /**
     * Flag shows that wishlist is enabled
     */
    wishlistEnabled?: boolean,
    /**
     * A callback, fired on product link click
     */
    onProductClick?: (React.SyntheticEvent) => void,
    /**
     * Preview child elements. If falsy, default preview presentation will be used
     */
    children?: React.ReactNode
};

export function ProductPreviewComponent({
    product,
    wishlistEnabled = false,
    onProductClick = noop,
    children,
    ...other
}: Props) {
    const handleOnProductClick = useCallback(() => {
        trackProductClick(product);
        onProductClick();
    }, [onProductClick, product]);

    return !!product && (
        <div className="product-preview-component">
            <ProductProvider product={product}
                             {...other}>
                {wishlistEnabled && (
                    <WishlistProductActionsContainer variant="icon-square"/>
                )}
                {children || (
                    <>
                        <ProductLinkComponent className="product-preview-component-image-link"
                                              onClick={handleOnProductClick}>
                            <ProductImageComponent variant="small"/>
                        </ProductLinkComponent>
                        <div className="product-preview-component-body">
                            <ProductLinkComponent className="product-preview-component-name-link"
                                                  onClick={handleOnProductClick}>
                                {product?.name}
                            </ProductLinkComponent>
                            <ProductPriceComponent/>
                        </div>
                    </>
                )}
            </ProductProvider>
        </div>
    );
}
