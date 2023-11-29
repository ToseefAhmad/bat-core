import {useLazyQuery} from '@luft/apollo';

import PRODUCT_DETAIL_VARIATION_QUERY from '../graphql/queries/ProductDetailVariation.query.graphql';

export const useProductVariationLazyQuery = (
    opts = {},
    query = PRODUCT_DETAIL_VARIATION_QUERY
) => useLazyQuery(query, opts);
