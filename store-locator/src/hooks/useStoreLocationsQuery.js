import {useQuery} from '@luft/apollo';

import STORE_LOCATIONS_QUERY from '../graphql/queries/StoreLocations.query.graphql';

export const useStoreLocationsQuery = (options, query = STORE_LOCATIONS_QUERY) => useQuery(query, options);
