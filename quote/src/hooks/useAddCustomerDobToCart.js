import {useCartMutation, useCartIdQuery} from '@luft/quote';

import CHECKOUT_QUERY from '@luft/quote/src/graphql/queries/Checkout.query.graphql';

import ADD_DOB_TO_CART_MUTATION from '../graphql/mutations/AddDobToCart.mutation.graphql';

export function useAddCustomerDobToCart(opts = {}, mutation = ADD_DOB_TO_CART_MUTATION) {
    const [addDobToCartMutation, payload] = useCartMutation(mutation);
    const q = useCartIdQuery();
    const cartId = q?.data?.cart?.id;

    return [
        async (input) => await addDobToCartMutation({
            ...opts,
            variables: {
                ...opts.variables,
                input
            },
            refetchQueries: () => [{query: CHECKOUT_QUERY, variables: {cart_id: cartId}}]
        }),
        payload
    ];
}
