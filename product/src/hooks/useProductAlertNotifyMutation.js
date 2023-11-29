import {useCallback, useMemo} from 'react';

import {useMutation} from '@luft/apollo';

import PRODUCT_ALERT_NOTIFY_MUTATION from '../graphql/mutations/ProductAlertNotifyMutation.graphql';

export function useProductAlertNotifyMutation(opts = {}, mutation = PRODUCT_ALERT_NOTIFY_MUTATION) {
    const [productAlertNotify, payload] = useMutation(mutation);

    const callback = useCallback(async (id) => await productAlertNotify({
        ...opts,
        variables: {
            ...opts.variables,
            input: {
                product_id: id
            }
        }
    }), [productAlertNotify]);

    return useMemo(() => [callback, payload], [callback, payload]);
}
