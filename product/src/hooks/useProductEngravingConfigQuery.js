import {useQuery} from '@luft/apollo';

import PRODUCT_ENGRAVING_CONFIG_QUERY from '../graphql/queries/ProductEngravingConfig.query.graphql';

export function useProductEngravingConfigQuery(options, query = PRODUCT_ENGRAVING_CONFIG_QUERY) {
    return useQuery(query, options);
}
