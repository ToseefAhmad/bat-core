import {useQuery} from '@luft/apollo';

import QUERY from '../graphql/queries/CategoryProductFiltersAndSorts.query.graphql';

export function useCategoryProductFiltersAndSortsQuery(opts = {}, query = QUERY) {
    const id = opts?.variables?.id;

    return useQuery(query, {
        ...opts,
        skip: opts.skip || !id
    });
}
