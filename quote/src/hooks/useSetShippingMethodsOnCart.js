import {useCartMutation} from '@luft/quote';

import SET_SHIPPING_METHODS_ON_CART_MUTATION from '../graphql/mutations/SetShippingMethodsOnCart.mutation.graphql';

export function useSetShippingMethodsOnCart(options = {}, mutation = SET_SHIPPING_METHODS_ON_CART_MUTATION) {
    const [setShippingMethodsMutation, payload] = useCartMutation(mutation);

    return [
        async (cartId, methodCode, carrierCode) => {
            const input = {
                cart_id: cartId,
                shipping_methods: [{
                    carrier_code: carrierCode,
                    method_code: methodCode
                }]
            };
            return await setShippingMethodsMutation({
                ...options,
                variables: {input}
            });
        },
        payload
    ];
}
