import {getStoreCodeByPathname} from './getStoreCodeByPathname';

const DATE_FORMAT = {
    ph: 'MM/dd/yyyy',
    default: 'dd/MM/yyyy'
};
const BACKEND_DATE_FORMAT = 'yyyy-MM-dd';

/**
 * @description
 * Get date format by website store code
 *
 * @returns {object}
 *
 * @example
 * ```js
 * const {dateFormat, backendDateFormat} = getDateFormatByStoreCode();
 * ```
 */
export const getDateFormatByStoreCode = (storeCode = getStoreCodeByPathname()) => ({
    dateFormat: DATE_FORMAT[storeCode] || DATE_FORMAT.default,
    backendDateFormat: BACKEND_DATE_FORMAT
});
