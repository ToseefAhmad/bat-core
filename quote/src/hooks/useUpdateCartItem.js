// TODO: check luft 2.0 [FREE_GIFT_RULES_QUERY]
import {noop} from 'lodash';

import {useCartMutation} from '@luft/quote';

import UPDATE_CART_ITEMS_MUTATION from '@luft/quote/src/graphql/mutations/UpdateCartItems.mutation.graphql';
import UPDATE_CONFIGURABLE_CART_ITEMS_MUTATION from '@luft/quote/src/graphql/mutations/UpdateConfigurableCartItems.mutation.graphql';
import UPDATE_GIFT_CARD_CART_ITEMS_MUTATION from '@luft/quote/src/graphql/mutations/UpdateGiftCardCartItems.mutation.graphql';

import FREE_GIFT_RULES_QUERY from '../../../free-gift/src/graphql/queries/FreeGiftRules.query.graphql';

export const useUpdateCartItem = (productType) => {
    const [updateItem, payloadSimple] = useCartMutation(UPDATE_CART_ITEMS_MUTATION);
    const [updateConfigurableItem, payloadConfigurable] = useCartMutation(UPDATE_CONFIGURABLE_CART_ITEMS_MUTATION);
    const [updateGiftCardItem, payloadGiftCard] = useCartMutation(UPDATE_GIFT_CARD_CART_ITEMS_MUTATION);
    let payload;
    let mutation;

    switch (productType) {
        case 'SIMPLE':
            payload = payloadSimple;
            mutation = updateItem;
            break;
        case 'CONFIGURABLE':
            payload = payloadConfigurable;
            mutation = updateConfigurableItem;
            break;
        case 'BUNDLE':
            payload = payloadSimple;
            mutation = updateItem;
            break;
        case 'GIFTCARD':
            payload = payloadGiftCard;
            mutation = updateGiftCardItem;
            break;
        default:
            payload = {};
            mutation = noop;
            break;
    }

    return [
        async (cartId, itemId, qty, {variationProduct, giftCard}) => {
            const isConfigurable = !!(variationProduct && variationProduct.id);
            const input = {
                cart_id: cartId,
                cart_items: [{
                    cart_item_id: itemId,
                    ...(isConfigurable && {variant_product_id: variationProduct.id}),
                    quantity: qty,
                    ...giftCard
                }]
            };
            return await mutation({
                variables: {input},
                awaitRefetchQueries: true,
                refetchQueries: () => [{
                    query: FREE_GIFT_RULES_QUERY,
                    variables: {
                        cart_id: cartId
                    }
                }]
            });
        },
        payload
    ];
};
