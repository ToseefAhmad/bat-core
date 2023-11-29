import {useMutation} from '@luft/apollo';
import {useClearCartCache} from '@luft/quote';

import CHECKOUT_COM_PAYMENT_VERIFY_MUTATION from '../graphql/mutations/CheckoutComPaymentVerifyMutation.graphql';

export function useCheckoutComPaymentVerifyMutation(options = {}, mutation = CHECKOUT_COM_PAYMENT_VERIFY_MUTATION) {
    const [verifyCheckoutComPayment, payload] = useMutation(mutation);
    const clearCartCacheHandler = useClearCartCache();

    return [
        async (input) => {
            const resp = await verifyCheckoutComPayment({
                ...options,
                variables: {
                    ...options.variables,
                    input
                },
                update: (cache, {error}) => {
                    if (error) return;
                    clearCartCacheHandler();
                }
            });
            const createOrder = resp?.data?.checkoutcomPaymentVerify;
            return {
                ...resp,
                data: {createOrder}
            };
        },
        payload
    ];
}
