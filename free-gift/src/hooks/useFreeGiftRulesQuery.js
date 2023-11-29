import {useQuery} from '@luft/apollo';

import FREE_GIFT_RULES_QUERY from '../graphql/queries/FreeGiftRules.query.graphql';

export function useFreeGiftRulesQuery(cartId, options = {}, query = FREE_GIFT_RULES_QUERY) {
    const {
        variables,
        ...opts
    } = options;

    return useQuery(query, {
        variables: {
            ...variables,
            cart_id: cartId
        },
        ...opts
    });
}
