import {useQuery} from '@luft/apollo';

import IPAY88_CONFIG_QUERY from '../graphql/queries/Ipay88Config.query.graphql';

export const useIpay88ConfigQuery = (opts, query = IPAY88_CONFIG_QUERY) => useQuery(query, opts);
