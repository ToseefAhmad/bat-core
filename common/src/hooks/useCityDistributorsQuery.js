import {useQuery} from '@luft/apollo';

import CITY_DISTRIBUTORS_QUERY from '../graphql/queries/CityDistributors.query.graphql';

export function useCityDistributorsQuery(regionCode, options = {}, query = CITY_DISTRIBUTORS_QUERY) {
    const {
        variables,
        ...opts
    } = options;

    return useQuery(query, {
        variables: {
            ...variables,
            code: regionCode
        },
        ...opts
    });
}
