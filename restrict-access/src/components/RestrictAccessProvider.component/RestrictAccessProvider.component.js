import React, {
    useState,
    useEffect,
    useMemo,
    useCallback
} from 'react';

import {RestrictAccessProviderContext} from '../../contexts';
import {createSavStorageKey} from '../../util';
import {getCurrentStore} from '../../../../multistore/src/util/getCurrentStore';
import {cookieManager} from '../../../../common/src/util/cookieManager';
import {
    BASIC_STATUS_KEY,
    ADVANCED_STATUS_KEY,
    CONFIRMED_STATUS_KEY
} from '../../constants';
import type {PredefinedStore} from '../../../../multistore/src/components/LuftStores.container';

const STATUSES = {
    BASIC: 'basic',
    ADVANCED: 'advanced',
    CONFIRMED: 'confirmed'
};

type Props = {
    /**
     * Application start url. Used for store detection in ssr mode
     */
    url?: string,
    /**
     * List of available stores
     */
    stores: PredefinedStore[],
    /**
     * Children component
     */
    children?: React.Component
};

export function RestrictAccessProviderComponent(props: Props) {
    const {
        url = window?.location.toString(),
        stores,
        children
    } = props;

    const {base_name} = useMemo(() => getCurrentStore(stores, url), [stores, url]);

    const basicStorageKey = createSavStorageKey(BASIC_STATUS_KEY, base_name);
    const confirmedStorageKey = createSavStorageKey(CONFIRMED_STATUS_KEY, base_name);

    const [accessStatus, setAccessStatus] = useState(() => {
        const hasBasicStatus = localStorage?.getItem(basicStorageKey);
        const hasAdvancedStatus = cookieManager.has(ADVANCED_STATUS_KEY);
        const hasConfirmedStatus = localStorage?.getItem(confirmedStorageKey);

        if (hasConfirmedStatus) return STATUSES.CONFIRMED;
        if (hasBasicStatus || hasAdvancedStatus) return STATUSES.ADVANCED;

        return STATUSES.BASIC;
    });

    useEffect(() => {
        const hasBasicStatus = localStorage?.getItem(basicStorageKey);
        const hasAdvancedStatus = cookieManager.has(ADVANCED_STATUS_KEY);
        const hasConfirmedStatus = localStorage?.getItem(confirmedStorageKey);

        // Restore basic status in case it was somehow deleted
        if (!hasBasicStatus && (hasAdvancedStatus || hasConfirmedStatus)) {
            localStorage?.setItem(basicStorageKey, true);
        }
    }, [basicStorageKey, confirmedStorageKey]);

    const handleSetAdvancedAccessStatus = useCallback(() => {
        setAccessStatus(STATUSES.ADVANCED);
    }, []);

    const handleSetConfirmedAccessStatus = useCallback(() => {
        setAccessStatus(STATUSES.CONFIRMED);
    }, []);

    const contextValue = useMemo(() => ({
        accessStatus,
        isBasicAccessStatus: accessStatus === STATUSES.BASIC,
        isAdvancedAccessStatus: accessStatus === STATUSES.ADVANCED,
        isConfirmedAccessStatus: accessStatus === STATUSES.CONFIRMED,
        onSetAdvancedAccessStatus: handleSetAdvancedAccessStatus,
        onSetConfirmedAccessStatus: handleSetConfirmedAccessStatus
    }), [
        accessStatus,
        handleSetAdvancedAccessStatus,
        handleSetConfirmedAccessStatus
    ]);

    return (
        <RestrictAccessProviderContext.Provider value={contextValue}>
            {children}
        </RestrictAccessProviderContext.Provider>
    );
}
