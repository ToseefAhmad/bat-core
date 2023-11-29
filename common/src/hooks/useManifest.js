import {useEffect} from 'react';
import {isUndefined} from 'lodash';

import {useCurrentStoreBaseName} from '@luft/multistore';
import {isProduction} from '@luft/util';

/**
 * @description
 * Inject a particular `manifest` link, depending on the store basename
 *
 * @example
 * ```jsx
 * import {useManifest} from 'bat/common';
 *
 * useManifest();
 * ```
 */
export const useManifest = () => {
    const baseName = useCurrentStoreBaseName();

    useEffect(() => {
        if (isUndefined(window)) return;

        const manifest = document.head.querySelector('[rel="manifest"]');

        if (manifest) return;

        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = isProduction() ? `${baseName}/manifest.json` : '/manifest.json';

        document.head.append(link);
    }, [baseName]);
};
