import {useCartMutation} from '@luft/quote';

import REMOVE_ITEM_FROM_CART_MUTATION from '@luft/quote/src/graphql/mutations/RemoveItemFromCart.mutation.graphql';

import FREE_GIFT_RULES_QUERY from '../../../free-gift/src/graphql/queries/FreeGiftRules.query.graphql';

export const useRemoveCartItem = () => {
    const [removeItemMutation, payload] = useCartMutation(REMOVE_ITEM_FROM_CART_MUTATION);

    return [
        async (cartId, itemId) => {
            const input = {
                cart_id: cartId,
                cart_item_id: itemId
            };
            return await removeItemMutation({
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
