import {useMutation} from '@luft/apollo';

import PAYNAMICS_START_MUTATION from '../graphql/mutations/PaynamicsStartMutation.graphql';

export function usePaynamicsPaymentStartMutation(options = {}, mutation = PAYNAMICS_START_MUTATION) {
    const [paynamicsPaymentStart, payload] = useMutation(mutation);

    return [
        async (input) => await paynamicsPaymentStart({
            ...options,
            variables: {input}
        }),
        payload
    ];
}
