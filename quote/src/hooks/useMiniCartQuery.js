import {useCartQuery} from '@luft/quote';

import MINI_CART_QUERY from '../graphql/queries/MiniCart.query.graphql';

export const useMiniCartQuery = (options = {}, query = MINI_CART_QUERY) => useCartQuery(options, query);
