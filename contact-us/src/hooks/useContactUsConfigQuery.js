import {useQuery} from '@luft/apollo';

import CONTACT_US_CONFIG_QUERY from '../graphql/queries/ContactUsConfig.query.graphql';

export function useContactUsConfigQuery(options, query = CONTACT_US_CONFIG_QUERY) {
    return useQuery(query, options);
}
