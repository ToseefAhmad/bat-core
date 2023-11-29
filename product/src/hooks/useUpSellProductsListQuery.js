import {useQuery} from '@luft/apollo';

import UPSELL_PRODUCTS_LIST_QUERY from '../graphql/queries/UpSellProductsList.query.graphql';

export function useUpSellProductsListQuery(productId, options = {}, query = UPSELL_PRODUCTS_LIST_QUERY) {
    const {
        variables,
        ...opts
    } = options;

    return useQuery(query, {
        variables: {
            ...variables,
            id: productId
        },
        ...opts
    });
}
