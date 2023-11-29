import {
    parse as parseDate,
    format as formatDate,
    isDate
} from 'date-fns';

import {getDateFormatByStoreCode} from './getDateFormatByStoreCode';

// This date format is used in Mutations
// Need to check with the BE if we can use a common date format, the same as for Queries
const BACKEND_DATE_FORMAT = 'MM/dd/yyyy';

export const getFormattedDate = (inputDate: string | Date, toBackendFormat?: boolean) => {
    if (!inputDate) return '';

    const {dateFormat: storeDateFormat, backendDateFormat} = getDateFormatByStoreCode();

    const parseFormat = toBackendFormat ? storeDateFormat : backendDateFormat;
    const parsedDate = isDate(inputDate) ? inputDate : parseDate(inputDate, parseFormat, new Date());
    const destinationFormat = toBackendFormat ? BACKEND_DATE_FORMAT : storeDateFormat;

    return formatDate(parsedDate, destinationFormat);
};
