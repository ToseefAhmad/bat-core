/**
 * @description
 * Create SAV storage key, combining a unique key and a store basename.
 *
 * @param {string} key
 * @param {string=} baseName
 * @returns SAV storage key
 *
 * @example
 * ```js
 * const key = 'my-own-key';
 * const storeBaseName = '/pk/en';
 *
 * // my-own-key-pk-en
 * const storageKey = createSavStorageKey(key, storeBaseName);
 * ```
 */
export const createSavStorageKey = (key, baseName) => {
    if (!baseName) return key;

    return `${key}${baseName.replace(/\//g, '-')}`;
};
