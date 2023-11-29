// The file uses for GA4 logic. Currently it uses only for VELO. In future it will use on GLO.
import {useMutation} from '@luft/apollo';
import {useClearCartCache} from '@luft/quote';

import CREATE_ORDER_MUTATION from '../graphql/mutations/CreateOrder.mutation.graphql';

export function useCreateOrder({preventClearCart} = {}) {
    const [createOrderMutation, payload] = useMutation(CREATE_ORDER_MUTATION);
    const clearCartCacheHandler = useClearCartCache();

    return [
        async (cartId) => {
            const variables = {
                cart_id: cartId
            };
            return await createOrderMutation({
                variables: {input: variables},
                update: (cache, {error}) => {
                    if (error || preventClearCart) return;
                    clearCartCacheHandler();
                }
            });
        },
        payload
    ];
}
