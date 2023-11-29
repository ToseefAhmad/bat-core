import {usePaginatedQuery} from '@luft/apollo';

import AFFILIATE_PROGRAM_REFERRALS_DATA from '../graphql/queries/CustomerAffiliateProgramReferralsData.query.graphql';

const DEFAULT_COUNT = 5;

export const useCustomerAffiliateProgramReferralsData = (
    opts = {},
    query = AFFILIATE_PROGRAM_REFERRALS_DATA
) => usePaginatedQuery(query, {
    count: DEFAULT_COUNT,
    pagedDataAccessor: data => data?.getReferrals,
    ...opts
});
