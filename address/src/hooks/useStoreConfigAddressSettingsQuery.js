import {useQuery} from '@luft/apollo';

import ADDRESS_SETTINGS_QUERY from '../graphql/queries/AddressSettings.query.graphql';

export const useStoreConfigAddressSettingsQuery = (options, query = ADDRESS_SETTINGS_QUERY) => useQuery(query, options);
