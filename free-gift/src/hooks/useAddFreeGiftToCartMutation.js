import {useCartMutation, useCartIdQuery} from '@luft/quote';
import CART_QUERY from '@luft/quote/src/graphql/queries/Cart.query.graphql';

import ADD_FREE_GIFT_TO_CART_MUTATION from '../graphql/mutations/AddFreeGiftsToCart.graphql';
import FREE_GIFT_RULES_QUERY from '../graphql/queries/FreeGiftRules.query.graphql';

export function useAddFreeGiftToCartMutation(opts = {}, mutation = ADD_FREE_GIFT_TO_CART_MUTATION) {
    const [addFreeGiftToCartMutation, payload] = useCartMutation(mutation);
    const {data: cartIdData} = useCartIdQuery();
    const cartId = cartIdData?.cart?.id;

    return [
        async (input) => await addFreeGiftToCartMutation({
            ...opts,
            variables: {
                ...opts.variables,
                input
            },
            awaitRefetchQueries: true,
            refetchQueries: () => [{
                query: CART_QUERY,
                variables: {
                    cart_id: cartId
                }
            }, {
                query: FREE_GIFT_RULES_QUERY,
                variables: {
                    cart_id: cartId
                }
            }]
        }),
        payload
    ];
}
