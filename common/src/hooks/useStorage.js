import {useMemo, useCallback} from 'react';

import {parseJsonString} from '../util';

type Options = {
    /**
     * A default key, which will be used in get/set/pop/remove functions
     */
    key?: string,
    /**
     * Persistent storage object
     * @default window.localStorage
     */
    storage?: Storage
};

export const useStorage = (options: Options = {}) => {
    const {
        key: defaultKey,
        storage: defaultStorage
    } = options;

    const storage = useMemo(() => {
        if (typeof window === 'undefined') return;
        if (!defaultStorage) return window.localStorage;

        return defaultStorage;
    }, [defaultStorage]);

    const handleGetValue = useCallback((key: string) => {
        if (!storage) return;

        const currentKey = key || defaultKey;
        const encodedValue = storage.getItem(currentKey);

        return parseJsonString(encodedValue);
    }, [storage, defaultKey]);

    const handlePopValue = useCallback((key: string) => {
        if (!storage) return;

        const currentKey = key || defaultKey;
        const encodedValue = storage.getItem(currentKey);

        storage.removeItem(currentKey);
        return parseJsonString(encodedValue);
    }, [storage, defaultKey]);

    const handleSetValue = useCallback((nextValue: any, key: string) => {
        if (!storage) return;

        const currentKey = key || defaultKey;

        storage.setItem(currentKey, JSON.stringify(nextValue));
    }, [storage, defaultKey]);

    const handleRemoveValue = useCallback((key: string) => {
        if (!storage) return;

        const currentKey = key || defaultKey;

        storage.removeItem(currentKey);
    }, [storage, defaultKey]);

    return useMemo(() => ({
        getValue: handleGetValue,
        popValue: handlePopValue,
        setValue: handleSetValue,
        removeValue: handleRemoveValue
    }), [handleGetValue, handlePopValue, handleSetValue, handleRemoveValue]);
};
