import {useQuery} from '@luft/apollo';

import CLIENT_PURCHASE_QUERY from '../graphql/queries/ClientPurchase.query.graphql';

export const useClientPurchaseQuery = (options, query = CLIENT_PURCHASE_QUERY) => useQuery(query, {
    fetchPolicy: 'cache-only',
    ...options
});
