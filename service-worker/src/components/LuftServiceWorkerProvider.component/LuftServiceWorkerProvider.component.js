import React, {
    useMemo,
    useState
} from 'react';
import {noop} from 'lodash';
import {Workbox} from 'workbox-window';

import {isProduction} from '@luft/util';

import {
    useOnUpdate,
    useUpdateOnInterval,
    useUpdateOnVisibility
} from '@luft/service-worker';

export type LuftServiceWorkerProps = {
    /**
     * service worker source url
     */
    swSrc: string,
    /**
     * interval to update service worker and check if application requires refresh
     */
    updateInterval?: number,
    /**
     * Provider children elements
     */
    children?: React.ReactNode
};

/**
 * @module @luft/service-worker
 * @scope @luft/service-worker
 * @exports LuftServiceWorkerProviderComponent
 * @function LuftServiceWorkerProviderComponent
 * @kind Provider
 *
 * @description
 * Provider registers workbox instance and adds listeners on app update check
 *
 * @example
 * ```jsx
 * import {LuftServiceWorkerProviderComponent} from '@luft/service-worker';
 *```
 *
 * @example
 * ```jsx
 *
 * return (
 *    <LuftServiceWorkerProviderComponent swSrc={`${process.env.PUBLIC_URL}/service-worker.js`}
 *                                        updateInterval={60 * 60 * 1000}>
 *        <App/>
 *    </LuftServiceWorkerProviderComponent>
 *);
 *```
 */
export function LuftServiceWorkerProviderComponent(
    {
        swSrc,
        updateInterval = 60 * 60 * 1000,
        children
    }: LuftServiceWorkerProps) {
    const [isUpdate, setIsUpdate] = useState(false);
    const [wb] = useState(() => {
        if (!window?.navigator?.serviceWorker) return null;
        const wbInstance = new Workbox(swSrc);
        wbInstance.register().catch(noop);
        return wbInstance;
    });

    useOnUpdate(wb, () => setIsUpdate(true));
    useUpdateOnInterval(wb, updateInterval);
    useUpdateOnVisibility(wb);

    useMemo(() => {
        if (isUpdate && isProduction) {
            window?.location.reload();
        }
    }, [isUpdate]);

    return children;
}
