import {get} from 'lodash';

import {useQuery} from '@luft/apollo';
import {useCartIdQuery, useClearCartCache} from '@luft/quote';

import CART_QUERY from '../graphql/queries/Cart.query.graphql';

function isCartNotFound(error) {
    if (!error) return false;
    const {networkError, graphQLErrors = []} = error;
    const errors = [networkError, ...graphQLErrors];

    return !!errors.find(err => !!err && (err.statusCode === 404 || err.extensions?.code === 404));
}

export const useCartQuery = (options = {}, query = CART_QUERY) => {
    const clearCartCache = useClearCartCache();
    const cartId = get(useCartIdQuery(), 'data.cart.id');

    const q = useQuery(query, {
        ...options,
        ssr: false,
        variables: {
            cart_id: cartId
        },
        onError: (error) => {
            // Clear cache in case of cart of authorized user is expired or cart not found
            if (isCartNotFound(error)) {
                clearCartCache();
            }
        }
    });

    if (isCartNotFound(q.error)) {
        return {
            ...q,
            data: null,
            error: null,
            dataError: false
        };
    }

    return q;
};
