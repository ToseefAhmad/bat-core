import {useQuery} from '@luft/apollo';

import PAKISTAN_CITIES_QUERY from '../graphql/queries/PakistanCities.query.graphql';

export function usePakistanCitiesQuery(regionCode, options = {}, query = PAKISTAN_CITIES_QUERY) {
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
