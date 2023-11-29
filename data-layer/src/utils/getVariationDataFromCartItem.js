import type {CartItem} from '../../../types';

export const getVariationDataFromCartItem = (cartItem: CartItem) => {
    if (!cartItem?.configurable_variation) return null;

    const variant = cartItem?.configurable_variation;
    const variationValue = variant?.variation_values?.[0]?.value;
    const variationAttributes = cartItem?.product?.variation_attributes?.[0]?.values || [];
    const variationAttr = variationAttributes.find(attr => attr.id === variationValue);

    return {
        item_list_id: variant.product.id,
        item_list_name: variant.product.name,
        item_variant: variationAttr?.name
    };
};
