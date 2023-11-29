import {noop} from 'lodash';

import {useQuery} from '@luft/apollo';
import {useUpdateUrlResolver} from '@luft/url-resolver';

import PRODUCT_DETAIL_QUERY from '../graphql/queries/ProductDetail.query.graphql';

export function useProductDetailQuery(productId, options = {}, query = PRODUCT_DETAIL_QUERY) {
    const updateUrlResolver = useUpdateUrlResolver();

    const {
        variables,
        onCompleted = noop,
        ...opts
    } = options;

    return useQuery(query, {
        onCompleted: (data) => {
            onCompleted(data);
            updateUrlResolver(data?.product?.url_rewrite);
        },
        variables: {
            ...variables,
            id: productId
        },
        ...opts
    });
}
