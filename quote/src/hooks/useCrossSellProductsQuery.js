import {useQuery} from '@luft/apollo';
import {useCartIdQuery} from '@luft/quote';

import CROSS_SELL_PRODUCTS_QUERY from '../graphql/queries/CrossSellProducts.query.graphql';

export const useCrossSellProductsQuery = (options = {}, query = CROSS_SELL_PRODUCTS_QUERY) => {
    const cartId = useCartIdQuery()?.data?.cart?.id;

    return useQuery(query, {
        ...options,
        variables: {
            cart_id: cartId
        },
        skip: !cartId
    });
};
