import React, {
    useState,
    useEffect,
    useMemo
} from 'react';
import {isUndefined} from 'lodash';
import type {ComponentType} from 'react';

import {GtmProviderContext} from '../../contexts';

export type LuftGtmProps = {
    /**
     * Children component
     */
    children?: ComponentType<{}>
};

const clear = obj => Object.keys(obj).reduce((memo, key) => {
    if (!obj[key]) return memo;

    return {
        [key]: obj[key],
        ...memo
    };
}, {});

export const LuftGtmProviderComponent = (props: LuftGtmProps) => {
    const {children} = props;

    const [config, setConfig] = useState({});

    useEffect(() => {
        const {enabled, ...tagManagerArgs} = config;

        if (isUndefined(window) || !enabled) return;

        import('react-gtm-module')
            .then(TagManager => TagManager.initialize(clear(tagManagerArgs)))
            .catch();
    }, [config]);

    const contextValue = useMemo(() => ({
        config,
        setConfig
    }), [config]);

    return (
        <GtmProviderContext.Provider value={contextValue}>
            {children}
        </GtmProviderContext.Provider>
    );
};
