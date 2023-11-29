import {useEffect, useContext} from 'react';
import {isEmpty} from 'lodash';

import {GtmProviderContext} from '../contexts';

export type GtmOptions = {
    /**
     * if we should run google tag manager script
     */
    enabled: boolean,
    /**
     * GTM id, must be something like GTM-000000.
     */
    gtmId: string,
    /**
     * Auth param is used to set environments.
     */
    auth?: string,
    /**
     * Preview param is used to set environments, something like env-00.
     */
    preview?: string,
    /**
     * Object that contains all of the information that you want to pass to Google Tag Manager.
     */
    dataLayer?: Object,
    /**
     * Custom name for dataLayer object.
     */
    dataLayerName?: string,
    /**
     * Additional events such as 'gtm.start': new Date().getTime(),event:'gtm.js'.
     */
    events?: Object
};

/**
 * @description
 * Initialize GTM using configuration data.
 *
 * @example
 * ```jsx
 * import {useInitializeGtm} from 'bat/boot';
 *
 * const {
 *     is_enabled,
 *     gtm_id,
 *     gtm_auth,
 *     gtm_preview
 * } = data;
 *
 * useInitializeGtm({
 *     enabled: is_enabled,
 *     gtmId: gtm_id,
 *     auth: gtm_auth,
 *     preview: gtm_preview
 * });
 * ```
 */
export const useInitializeGtm = (options: GtmOptions) => {
    const {setConfig} = useContext(GtmProviderContext);

    useEffect(() => {
        if (isEmpty(options)) return;

        setConfig(options);
    }, []);
};
