import {useCartMutation} from '@luft/quote';

import ADD_CUSTOMER_REFERRAL_CODE_TO_CART_MUTATION from '../graphql/mutations/AddCustomerReferralCodeToCart.mutation.graphql';

export function useAddReferralCodeToCart(opts = {}, mutation = ADD_CUSTOMER_REFERRAL_CODE_TO_CART_MUTATION) {
    const [addReferralCodeToCart, payload] = useCartMutation(mutation);

    return [
        async (input) => await addReferralCodeToCart({
            ...opts,
            variables: {
                ...opts.variables,
                input
            }
        }),
        payload
    ];
}
