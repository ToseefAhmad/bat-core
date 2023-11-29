export const getLinkToUpdateProduct = (wishlistItem) => {
    if (!wishlistItem) return;

    return `${wishlistItem?.product?.url}?wishlist_item_id=${wishlistItem?.id}`;
};
