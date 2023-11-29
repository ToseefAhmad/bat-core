import {useCartMutation} from '@luft/quote';

import ADD_CUSTOMER_NOTE_TO_CART_MUTATION from '../graphql/mutations/AddCustomerNoteToCart.mutation.graphql';

export function useAddCustomerNoteToCart(opts = {}, mutation = ADD_CUSTOMER_NOTE_TO_CART_MUTATION) {
    const [addCustomerNoteToCartMutation, payload] = useCartMutation(mutation);

    return [
        async (input) => await addCustomerNoteToCartMutation({
            ...opts,
            variables: {
                ...opts.variables,
                input
            }
        }),
        payload
    ];
}
