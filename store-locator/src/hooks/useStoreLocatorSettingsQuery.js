import {useQuery} from '@luft/apollo';

import STORE_LOCATOR_SETTINGS_QUERY from '../graphql/queries/StoreLocatorSettings.query.graphql';

export function useStoreLocatorSettingsQuery(options, query = STORE_LOCATOR_SETTINGS_QUERY) {
    return useQuery(query, options);
}
