import {useMutation} from '@luft/apollo';
import {useClearCartCache} from '@luft/quote';

import PAYNAMICS_RESULT_MUTATION from '../graphql/mutations/PaynamicsResultMutation.graphql';

export function usePaynamicsResultMutation(options = {}, mutation = PAYNAMICS_RESULT_MUTATION) {
    const [paynamicsResult, payload] = useMutation(mutation);
    const clearCartCacheHandler = useClearCartCache();

    return [
        async (input) => {
            const resp = await paynamicsResult({
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
            const createOrder = resp?.data?.paynamicsResult;
            return {
                ...resp,
                data: {createOrder}
            };
        },
        payload
    ];
}
