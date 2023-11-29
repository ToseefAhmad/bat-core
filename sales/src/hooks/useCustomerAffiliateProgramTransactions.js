import {usePaginatedQuery} from '@luft/apollo';

import AFFILIATE_PROGRAM_TRANSACTIONS from '../graphql/queries/CustomerAffiliateProgramTransactions.query.graphql';

const DEFAULT_COUNT = 5;

export const useCustomerAffiliateProgramTransactions = (
    opts = {},
    query = AFFILIATE_PROGRAM_TRANSACTIONS
) => usePaginatedQuery(query, {
    count: DEFAULT_COUNT,
    pagedDataAccessor: data => data?.getTransactions,
    ...opts
});
