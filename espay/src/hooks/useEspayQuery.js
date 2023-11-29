import {useQuery} from '@luft/apollo';

import ESPAY_QUERY from '../graphql/queries/Espay.query.graphql';

export const useEspayQuery = (orderId, paymentMethod, opts = {}, query = ESPAY_QUERY) => useQuery(query, {
    ...opts,
    variables: {
        ...opts.variables,
        input: {
            order_id: orderId,
            product_code: paymentMethod?.product_code,
            bank_code: paymentMethod?.bank_code
        }
    }
});
