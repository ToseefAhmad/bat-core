import {useCartMutation} from '@luft/quote';
import type {AddCouponToCartInput} from '@luft/types';

import ADD_COUPON_TO_CART_MUTATION from '../graphql/mutations/AddCouponToCart.mutation.graphql';

export function useAddCouponOnCartMutation(opts = {}, mutation = ADD_COUPON_TO_CART_MUTATION) {
    const [addCouponToCartMutation, payload] = useCartMutation(mutation);

    return [
        async (input: AddCouponToCartInput) => await addCouponToCartMutation({
            ...opts,
            variables: {
                ...opts.variables,
                input
            }
        }),
        payload
    ];
}
