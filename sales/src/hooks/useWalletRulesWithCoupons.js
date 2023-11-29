import {useQuery} from '@luft/apollo';

import WALLET_COUPONS_QUERY from '../graphql/queries/WalletRulesWithCoupons.query.graphql';

export const useWalletRulesWithCoupons = (options = {}, query = WALLET_COUPONS_QUERY) => useQuery(query, options);
