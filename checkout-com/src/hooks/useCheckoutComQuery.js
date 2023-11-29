import {useQuery} from '@luft/apollo';

import CHECKOUT_COM_QUERY from '../graphql/queries/CheckoutCom.query.graphql';

export const useCheckoutComQuery = (input, opts = {}, query = CHECKOUT_COM_QUERY) => useQuery(query, {
    ...opts,
    variables: {
        ...opts.variables,
        input
    }
});
