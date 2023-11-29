import {getProductVariant} from '@luft/wishlist';

export function getFormattedInputToAdd(
    type,
    id,
    qty,
    {variation, quoteItemId = null, giftCard, groupSet = [], editableBundleOptions, engraved_options}
) {
    let giftCardFormatted = {};
    if (type === 'GROUPED') {
        return {
            items: [
                {
                    product_id: id,
                    items: groupSet.map((item) => ({product_id: item?.product?.id, quantity: item?.qty}))
                }
            ]
        };
    }
    if (type === 'GIFTCARD') {
        const {amount, ...giftCardData} = giftCard || {};
        giftCardFormatted = {
            ...giftCardData,
            amount: amount?.value || null
        };
    }

    return {
        items: [
            {
                product_id: id,
                ...getProductVariant(type, variation),
                quantity: qty,
                quote_item_id: quoteItemId,
                ...giftCardFormatted,
                ...(type === 'EDITABLE_BUNDLE' && {bundle_options: editableBundleOptions}),
                ...(engraved_options && {engraved_options})
            }
        ]
    };
}
