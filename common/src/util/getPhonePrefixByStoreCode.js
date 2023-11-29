import {getStoreCodeByPathname} from './getStoreCodeByPathname';

const PHONE_PREFIXES = {
    id: '+62',
    pk: '+92',
    uae: '+971',
    ph: '+63',
    my: '+60',
    sa: '+966'
};

/**
 * @description
 * Get phone prefix using the store code
 *
 * @param {string=} storeCode
 * @returns phone prefix
 *
 * @example
 * ```js
 * import {getPhonePrefixByStoreCode} from 'bat-core/common';
 *
 * const phonePrefix = getPhonePrefixByStoreCode();
 * ```
 */
export const getPhonePrefixByStoreCode = (storeCode = getStoreCodeByPathname()) => PHONE_PREFIXES[storeCode];
