import {get} from 'lodash';

import {useMutation} from '@luft/apollo';
import {useClearCartCache} from '@luft/quote';

import SET_ESPAY_AND_PLACE_ORDER_MUTATION from '../graphql/mutations/SetEspayAndPlaceOrder.mutation.graphql';

export function useSetEspayAndPlaceOrder() {
    const [payByEspayAndCreateOrder, payload] = useMutation(SET_ESPAY_AND_PLACE_ORDER_MUTATION);
    const clearCartCacheHandler = useClearCartCache();

    return [
        async (cartId) => {
            const input = {
                cart_id: cartId
            };
            const resp = await payByEspayAndCreateOrder({
                variables: {input},
                update: (cache, {error}) => {
                    if (!error) {
                        clearCartCacheHandler();
                    }
                }
            });
            const createOrder = get(resp, 'data.setEspayAndPlaceOrder');
            return {
                ...resp,
                data: {createOrder}
            };
        },
        payload
    ];
}
