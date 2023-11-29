import {useQuery} from '@luft/apollo';

import AFFILIATE_PROGRAM_DASHBOARD from '../graphql/queries/CustomerAffiliateProgramDashboard.query.graphql';

export const useCustomerAffiliateProgramDashboard = (
    options = {},
    query = AFFILIATE_PROGRAM_DASHBOARD
) => useQuery(query, options);
