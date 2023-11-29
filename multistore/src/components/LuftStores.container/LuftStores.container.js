import React, {useMemo, useState} from 'react';

import {LuftStoresContext} from '@luft/multistore';
import {StoreEntity} from '@luft/types';

import {getCurrentStore} from '../../util';

export type PredefinedStore = StoreEntity & {
    base_name: string,
    locale: string
};

type Props = {
    /**
     * Application start url. Used for store detection in ssr mode
     */
    url?: string,
    /**
     * Parameter, that defines if multistore should be supported
     * false by default (improves performance)
     */
    enabled?: boolean,
    /**
     * List of predefined stores
     */
    predefinedStores: PredefinedStore[],
    /**
     * Children component
     */
    children?: React.Component | Function
};

export const LuftStoresContainer = (props: Props) => {
    const {
        url = window?.location.toString(),
        enabled,
        predefinedStores: stores,
        children
    } = props;

    const [currentStore, setCurrentStore] = useState(() => getCurrentStore(stores, url));

    const value = useMemo(() => ({
        enabled,
        currentStore,
        stores,
        validateCurrentStore: (location) => setCurrentStore(getCurrentStore(stores, location.toString()))
    }), [enabled, currentStore, stores]);

    return (
        <LuftStoresContext.Provider value={value}>
            {children}
        </LuftStoresContext.Provider>
    );
};
