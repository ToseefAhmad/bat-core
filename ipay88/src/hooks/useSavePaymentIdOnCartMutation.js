import {useCallback, useMemo} from 'react';

import {useCartIdQuery, useCartMutation} from '@luft/quote';

import SET_PAYMENT_ID_ON_CART from '../graphql/mutations/SetPaymentIdOnCart.mutation.graphql';

export const useSavePaymentIdOnCartMutation = (opts = {}, mutation = SET_PAYMENT_ID_ON_CART) => {
    const {data: cartData, loading: cartLoading, error: cartError} = useCartIdQuery();
    const cartId = cartData?.cart?.id;

    const [setPaymentId, {loading: paymentIdLoading, error: paymentIdError}] = useCartMutation(mutation);
    const callback = useCallback(async (id) => {
        const input = {
            cart_id: cartId,
            payment_id: id
        };

        return await setPaymentId({
            ...opts,
            variables: {
                ...opts.variables,
                input
            }
        });
    }, [cartId, setPaymentId]);

    return useMemo(() => ([callback, {
        error: cartError || paymentIdError,
        loading: cartLoading || paymentIdLoading
    }]), [cartId, paymentIdLoading, paymentIdError]);
};
