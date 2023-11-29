import {useQuery} from '@luft/apollo';

import SOCIAL_PROVIDERS_QUERY from '../graphql/queries/SocialProviders.query.graphql';

export const useSocialProvidersQuery = (opts, query = SOCIAL_PROVIDERS_QUERY) => useQuery(query, {
    fetchPolicy: 'no-cache',
    ...opts
});
