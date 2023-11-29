import {useCallback} from 'react';

import {useMutation} from '@luft/apollo';

import CHECKOUT_COM_CREATE_ORDER_MUTATION from '../graphql/mutations/CheckoutComCreateOrderMutation.graphql';

export function useCheckoutComCreateOrderMutation() {
    const [checkoutComCreateOrder, payload] = useMutation(CHECKOUT_COM_CREATE_ORDER_MUTATION);

    return [
        useCallback(async (input) => {
            const resp = await checkoutComCreateOrder({
                variables: {input}
            });
            const createOrder = resp?.data?.checkoutcomPlaceOrder;
            return {
                ...resp,
                data: {createOrder}
            };
        }, [checkoutComCreateOrder]),
        payload
    ];
}
