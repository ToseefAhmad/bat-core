import React from 'react';

import {RemoveFromWishlistContainer} from '@luft/wishlist';
import type {
    Product,
    Variation,
    WishlistItem
} from '@luft/types';

import {AddToWishlistContainer} from '../AddToWishlist.container';

type Props = {
    /**
     * List of wishlist items
     */
    wishlistItems: WishlistItem[],
    /**
     * Current product
     */
    product: Product,
    /**
     * Product variation, used for 'CONFIGURABLE' products
     */
    variation?: Variation
};

/**
 * Use `WishlistProductActionsComponent` to identify which action (add to wishlist or remove) is available for product
 * and render appropriate component
 */
export function WishlistProductActionsComponent(props: Props) {
    const {
        wishlistItems,
        product,
        variation,
        ...other
    } = props;

    const item = wishlistItems && wishlistItems.find(({product: p, configurable_variation}) => {
        if (p.id === product.id) {
            if (variation) {
                return configurable_variation && configurable_variation?.product?.id === variation?.product?.id;
            }
            return !configurable_variation;
        }
        return false;
    });

    return (
        <div className="wishlist-product-actions-component">
            {item && item.id ? (
                <RemoveFromWishlistContainer {...other}
                                             itemId={item.id}
                                             product={product}/>
            ) : (
                <AddToWishlistContainer {...other}
                                        product={product}
                                        variation={variation}/>
            )}
        </div>
    );
}
