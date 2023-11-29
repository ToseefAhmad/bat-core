import {useQuery} from '@luft/apollo';

import ESPAY_METHODS_QUERY from '../graphql/queries/EspayPaymentInfo.query.graphql';

export const useEspayMethodsQuery = (opts, query = ESPAY_METHODS_QUERY) => useQuery(query, opts);
