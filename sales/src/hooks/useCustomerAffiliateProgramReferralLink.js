import {useQuery} from '@luft/apollo';

import AFFILIATE_PROGRAM_REFERRAL_LINK from '../graphql/queries/CustomerAffiliateProgramReferralLink.query.graphql';

export const useCustomerAffiliateProgramReferralLink = (
    options = {},
    query = AFFILIATE_PROGRAM_REFERRAL_LINK
) => useQuery(query, options);
