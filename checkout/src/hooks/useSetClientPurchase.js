import {useCallback} from 'react';

import {useApolloClient} from '@luft/apollo';

import CLIENT_PURCHASE_QUERY from '../graphql/queries/ClientPurchase.query.graphql';

export const useSetClientPurchase = (query = CLIENT_PURCHASE_QUERY) => {
    const client = useApolloClient();

    return useCallback((purchase) => client.writeQuery({
        query,
        data: {
            purchase
        }
    }), [client, query]);
};
