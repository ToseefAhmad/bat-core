import {useCallback, useMemo} from 'react';

import {useMutation} from '@luft/apollo';

import CCAVENUE_RESPONSE_MUTATION from '../graphql/mutations/CcAvenueResponseMutation.graphql';

export function useCcAvenueResponseMutation(options, mutation = CCAVENUE_RESPONSE_MUTATION) {
    const [ccAvenueMutation, payload] = useMutation(mutation);

    const ccAvenueResponse = useCallback(async (input) => {
        const opt = options || {};
        const resp = await ccAvenueMutation({
            ...opt,
            variables: {
                ...opt.variables,
                input
            }
        });
        const createOrder = resp?.data?.ccavenueResponse;

        return {
            ...resp,
            data: {createOrder}
        };
    }, [options, ccAvenueMutation]);

    return useMemo(() => [ccAvenueResponse, payload], [ccAvenueResponse, payload]);
}
