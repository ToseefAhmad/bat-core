import {useMemo} from 'react';

import {useCartQuery} from '@luft/quote';

import {useWishlistQuery} from '../../../wishlist';
import {getPreselectedEditableBundleOptionsFromItem as getEditableBundleOptions} from '../utils';

export const useInitialProductStateInEditMode = ({cartItemId, wishlistItemId}) => {
    const {data: cartData} = useCartQuery({skip: !cartItemId});
    const {data: wishlistData} = useWishlistQuery({skip: !wishlistItemId});
    let currentItem;

    if (cartData) {
        const cartItems = cartData.cart?.items || [];
        currentItem = cartItems.find(item => item.cart_item_id === cartItemId);
    }

    if (wishlistData) {
        const wishlistItems = wishlistData.viewer?.user?.wishlist?.products?.items || [];
        currentItem = wishlistItems.find(item => item.id === wishlistItemId);
    }

    const bundleInfo = currentItem?.bundle_info;
    const editableBundleOptions = getEditableBundleOptions(currentItem?.bundle_info?.selected_options);
    const noTotalBundleInfo = useMemo(() => ({selected_options: bundleInfo?.selected_options}), [bundleInfo]);
    const currentCartItemQty = currentItem?.quantity || 1;
    const initialState = useMemo(() => ({
        bundleInfo: noTotalBundleInfo,
        editableBundleOptions,
        qty: currentCartItemQty
    }), [noTotalBundleInfo, editableBundleOptions, currentCartItemQty]);

    return initialState;
};
