import {useCallback, useMemo} from 'react';

import {useMutation} from '@luft/apollo';
import {useCartIdQuery} from '@luft/quote';

import CCAVENUE_PLACE_ORDER_MUTATION from '../graphql/mutations/CcAvenuePlaceOrderMutation.graphql';

export function useCcAvenuePlaceOrderMutation(options, mutation = CCAVENUE_PLACE_ORDER_MUTATION) {
    const [ccAvenuePlaceOrderMutation, payload] = useMutation(mutation);
    const cartId = useCartIdQuery()?.data?.cart?.id;

    const ccAvenuePlaceOrder = useCallback(async () => {
        const opt = options || {};
        const variables = {
            cart_id: cartId
        };

        return await ccAvenuePlaceOrderMutation({
            ...opt,
            variables: {input: variables}
        });
    }, [options, cartId, ccAvenuePlaceOrderMutation]);

    return useMemo(() => [ccAvenuePlaceOrder, payload], [ccAvenuePlaceOrder, payload]);
}
