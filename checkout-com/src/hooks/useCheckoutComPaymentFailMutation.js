import {useCartMutation} from '@luft/quote';

import CHECKOUT_COM_PAYMENT_FAIL_MUTATION from '../graphql/mutations/CheckoutComPaymentFailMutation.graphql';

export function useCheckoutComPaymentFailMutation(options = {}, mutation = CHECKOUT_COM_PAYMENT_FAIL_MUTATION) {
    const [failCheckoutComPayment, payload] = useCartMutation(mutation);

    return [
        async (input) => await failCheckoutComPayment({
            ...options,
            variables: {
                ...options.variables,
                input
            }
        }),
        payload
    ];
}
