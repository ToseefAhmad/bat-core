import {useCartMutation} from '@luft/quote';

import REMOVE_CUSTOMER_REFERRAL_CODE_FROM_CART_MUTATION from '../graphql/mutations/RemoveCustomerReferralCodeFromCart.mutation.graphql';

export function useRemoveCustomerReferralCodeFromCart(
    opts = {},
    mutation = REMOVE_CUSTOMER_REFERRAL_CODE_FROM_CART_MUTATION
) {
    const [removeCustomerReferralCodeFromCartMutation, payload] = useCartMutation(mutation);

    return [
        async (input) => await removeCustomerReferralCodeFromCartMutation({
            ...opts,
            variables: {
                ...opts.variables,
                input
            }
        }),
        payload
    ];
}
