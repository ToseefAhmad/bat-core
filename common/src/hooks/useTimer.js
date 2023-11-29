import {
    useState,
    useEffect,
    useRef
} from 'react';
import {noop} from 'lodash';

type TimerOptions = {
    /**
     * Flag, responsible for polling if time expired
     */
    polling?: boolean,
    /**
     * Polling interval. It's used when polling is enabled
     */
    interval?: number,
    /**
     * Callback for getting expiration date value from any storage
     */
    onGetValueFromStorage?: () => number,
    /**
     * Callback fired when time expires. Expiration date in ms is passed to it
     */
    onTimeExpired?: (expirationDate: number) => void
};

export type TimerData = {
    /**
     * Flag, which indicates that time has expired
     */
    isExpired: boolean,
    /**
     * Function for manual enabling the polling mechanism
     */
    onStartPolling: () => void,
    /**
     * Function for manual disabling the polling mechanism
     */
    onStopPolling: () => void
};

const DEFAULT_INTERVAL = 10 * 1000;

/**
 * @description
 * Identify if a previously stored expiration date has expired
 *
 * @param {TimerOptions} options
 *
 * @returns {TimerData} timerData
 *
 * @example
 * ```jsx
 * import {useTimer} from 'bat-core/common';
 * ```
 *
 * @example
 * ```js
 * const {isExpired, onStartPolling, onStopPolling} = useTimer({
 *     polling: true,
 *     interval: 1000,
 *     onGetValueFromStorage: () => {
 *         const data = localStorage.getItem('data');
 *
 *         // Do awesome stuff
 *     },
 *     onTimeExpired: date => {
 *         localStorage.removeItem('data');
 *     }
 * });
 * ```
 */
export const useTimer = (options: TimerOptions = {}) => {
    const {
        polling = true,
        interval = DEFAULT_INTERVAL,
        onGetValueFromStorage = noop,
        onTimeExpired = noop
    } = options;

    const [isExpired, setIsExpired] = useState(() => Date.now() >= onGetValueFromStorage());
    const [count, setCount] = useState(isExpired ? 0 : 1);
    const timeoutRef = useRef();

    useEffect(() => {
        // Start polling when the `count` will be greater than 0
        if (!count) return;

        const expirationDate = onGetValueFromStorage();
        const isExpiredDate = Date.now() >= expirationDate;

        setIsExpired(isExpiredDate);

        if (isExpiredDate) {
            setCount(0);
            onTimeExpired(expirationDate);
            return;
        }

        if (!polling) return;

        timeoutRef.current = setTimeout(() => {
            setCount(prevCount => prevCount + 1);
        }, interval);
    }, [count]);

    useEffect(() => () => clearTimeout(timeoutRef.current), []);

    const handleStartPolling = () => setCount(1);
    const handleStopPolling = () => setCount(0);

    return {
        isExpired,
        onStartPolling: handleStartPolling,
        onStopPolling: handleStopPolling
    };
};
