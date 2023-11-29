import {useLazyQuery} from '@luft/apollo';

import CHECKOUT_QUERY from '../graphql/queries/Checkout.query.graphql';

export const useCheckoutLazyQuery = (options = {}, query = CHECKOUT_QUERY) => useLazyQuery(query, options);
