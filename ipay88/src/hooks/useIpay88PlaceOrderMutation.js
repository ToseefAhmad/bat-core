import {useCallback, useMemo} from 'react';

import {useMutation} from '@luft/apollo';
import {useCartIdQuery} from '@luft/quote';

import IPAY88_PLACE_ORDER_MUTATION from '../graphql/mutations/Ipay88PlaceOrder.graphql';

export const useIpay88PlaceOrderMutation = (options = {}, mutation = IPAY88_PLACE_ORDER_MUTATION) => {
    const [ipay88PaceOrderMutation, payload] = useMutation(mutation);
    const cartId = useCartIdQuery()?.data?.cart?.id;

    const ipay88PlaceOrder = useCallback(async () => {
        const opt = options;
        const input = {
            cart_id: cartId
        };

        return await ipay88PaceOrderMutation({
            ...opt,
            variables: {
                input
            }
        });
    }, [options, cartId, ipay88PaceOrderMutation]);

    return useMemo(() => [ipay88PlaceOrder, payload], [ipay88PlaceOrder, payload]);
};
