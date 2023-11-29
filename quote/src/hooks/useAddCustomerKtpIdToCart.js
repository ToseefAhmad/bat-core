import {get} from 'lodash';

import {useCartMutation, useCartIdQuery} from '@luft/quote';

import CHECKOUT_QUERY from '@luft/quote/src/graphql/queries/Checkout.query.graphql';

import ADD_CUSTOMER_KTP_TO_CART_MUTATION from '../graphql/mutations/AddCustomerKtpIdToCart.mutation.graphql';

export function useAddCustomerKtpToCart(opts = {}, mutation = ADD_CUSTOMER_KTP_TO_CART_MUTATION) {
    const [addCustomerKtpIdToCartMutation, payload] = useCartMutation(mutation);
    const cartId = get(useCartIdQuery(), 'data.cart.id');

    return [
        async (input) => await addCustomerKtpIdToCartMutation({
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
