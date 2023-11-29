import {useMemo} from 'react';
import {useStoreConfigQuery} from '@luft/common';

export function useLegalAge(options) {
    const {data} = useStoreConfigQuery({fetchPolicy: 'cache-only', ...options});

    return useMemo(() => {
        const legalAge = data?.storeConfig?.age_of_majority;
        const today = new Date();
        const legalDate = new Date(today.getFullYear() - legalAge, today.getMonth(), today.getDate());
        return {legalAge, legalDate};
    }, [data]);
}
