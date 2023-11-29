import {useCartQuery} from '@luft/quote';

import CHECKOUT_QUERY from '../graphql/queries/Checkout.query.graphql';

export const useCheckoutQuery = (options, query = CHECKOUT_QUERY) => useCartQuery(options, query);
