import {useState, useEffect} from 'react';
import {noop, isUndefined} from 'lodash';

import {useTimer} from '../../../common';

type VerificationOptions = {
    /**
     * Flag, which indicates that HAV feature is enabled
     */
    enabled?: boolean,
    /**
     * Unique localStorage key, which will be combined with a `suffix`
     */
    storageKey: string,
    /**
     * Maximum failed verification attempts
     */
    maxFailureCount: number,
    /**
     * Amount of hours, which will be added to current date
     */
    penaltyTime: number,
     /**
     * Callback fired when time expires. Expiration date in ms is passed to it
     */
    onTimeExpired?: (expirationDate: number) => void
};

export type VerificationData = {
    /**
     * Flag, which indicates that time has expired
     */
    isExpired: boolean,
    /**
     * Callback, which increases the amount of failed verification attempts
     */
    onIncrementFailureCount: () => void
};

const getItemFromStorage = (storageKey: string) => {
    if (isUndefined(window)) return 0;

    return +localStorage.getItem(storageKey) || 0;
};

const HOUR = 60 * 60 * 1000;

/**
 * @description
 * Calculate failed attempts amount and signal if penalty time has expired
 *
 * @param {VerificationOptions} options
 *
 * @returns {VerificationData} verificationData
 *
 * @example
 * ```jsx
 * import {useHardAgeVerification} from 'bat-core/restrict-access';
 * ```
 *
 * @example
 * ```jsx
 * const {isExpired, onIncrementFailureCount} = useHardAgeVerification({
 *     enabled: true,
 *     storageKey: '__hav',
 *     maxFailureCount: 3,
 *     penaltyTime: 5
 * });
 * ```
 */
export const useHardAgeVerification = (options: VerificationOptions = {}) => {
    const {
        enabled = true,
        storageKey,
        maxFailureCount,
        penaltyTime,
        onTimeExpired = noop,
        ...other
    } = options;

    const failureCountStorageKey = `${storageKey}-fc`;
    const penaltyDateStorageKey = `${storageKey}-pd`;

    const [failureCount, setFailureCount] = useState(() => getItemFromStorage(failureCountStorageKey));

    const hasWindow = !isUndefined(window);
    const isReachedMaximum = failureCount === maxFailureCount;

    const {isExpired, onStartPolling} = useTimer({
        onGetValueFromStorage: () => getItemFromStorage(penaltyDateStorageKey),
        onTimeExpired: (expirationDate) => {
            if (!hasWindow) return;

            localStorage.removeItem(penaltyDateStorageKey);

            setFailureCount(0);
            onTimeExpired(expirationDate);
        },
        ...other
    });

    // Cleanup the storage in case HAV feature is disabled
    useEffect(() => {
        if (!hasWindow || enabled) return;

        localStorage.removeItem(failureCountStorageKey);
        localStorage.removeItem(penaltyDateStorageKey);
    }, [enabled]);

    // Update failure attempts
    useEffect(() => {
        const prevFailureCount = getItemFromStorage(failureCountStorageKey);

        if (!hasWindow || !failureCount || prevFailureCount === failureCount) return;

        localStorage.setItem(failureCountStorageKey, failureCount);
    }, [failureCount]);

    // Set penalty
    useEffect(() => {
        if (!hasWindow || !isReachedMaximum) return;

        localStorage.removeItem(failureCountStorageKey);
        localStorage.setItem(penaltyDateStorageKey, Date.now() + penaltyTime * HOUR);

        onStartPolling();
    }, [isReachedMaximum]);

    return {
        isExpired: enabled ? isExpired : true,
        onIncrementFailureCount: () => setFailureCount(prevCount => prevCount + 1)
    };
};
