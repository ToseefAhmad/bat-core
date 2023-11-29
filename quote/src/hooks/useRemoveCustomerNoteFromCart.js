import {useCartMutation} from '@luft/quote';

import REMOVE_CUSTOMER_NOTE_FROM_CART_MUTATION from '../graphql/mutations/RemoveCustomerNoteFromCart.mutation.graphql';

export function useRemoveCustomerNoteFromCart(opts = {}, mutation = REMOVE_CUSTOMER_NOTE_FROM_CART_MUTATION) {
    const [removeCustomerNoteFromCartMutation, payload] = useCartMutation(mutation);

    return [
        async (input) => await removeCustomerNoteFromCartMutation({
            ...opts,
            variables: {
                ...opts.variables,
                input
            }
        }),
        payload
    ];
}
