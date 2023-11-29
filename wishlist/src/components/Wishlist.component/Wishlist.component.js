import React, {useState} from 'react';

import {WishlistItemsComponent} from '@luft/wishlist';

import {
    AccountWishlistSharingContainer,
    AccountWishlistToCartContainer
} from '../../../../account';

type Props = {
    /**
     * Wishlist items array
     */
    items: WishlistItem[],
    /**
     * Is can load more status
     */
    canLoadMore: boolean,
    /**
     * Is loading status
     */
    isLoadingMore: boolean,
    /**
     * Callback on load more items
     */
    onLoadMore: () => Promise
}

/**
 * Wishlist items renderer
 */
export function WishlistComponent(
    {
        items,
        canLoadMore,
        isLoadingMore,
        onLoadMore,
        ...other
    }: Props) {
    const [addToCartErrors, setAddToCartErrors] = useState();

    return (
        <div className="wishlist-component">
            {!!items.length && (
                <div className="wishlist-component-actions">
                    <AccountWishlistToCartContainer itemsCounter={items?.length}
                                                    onAddToCartErrors={setAddToCartErrors}/>
                    <AccountWishlistSharingContainer/>
                </div>
            )}
            <WishlistItemsComponent {...other}
                                    addToCartErrors={addToCartErrors}
                                    items={items}
                                    canLoadMore={canLoadMore}
                                    isLoadingMore={isLoadingMore}
                                    onLoadMore={onLoadMore}
                                    onAddToCartErrors={setAddToCartErrors}/>
        </div>
    );
}
