export const getLinkToUpdateProduct = (cartItem) => {
    if (!cartItem) return;

    return `${cartItem?.product?.url}?cart_item_id=${cartItem?.cart_item_id}`;
};
