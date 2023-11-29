import {useIntl} from 'react-intl';

import {getLanguageCodeByPathname} from '../util';

export function useFormatDate({date, options = {}}) {
    const {
        year = 'numeric',
        month = 'long',
        day = 'numeric',
        ...other
    } = options;

    const {formatDate} = useIntl();
    const dateString = formatDate(date, {year, month, day, ...other});
    const [mm, dd, yy] = dateString.replace(/,/g, '').split(' ');

    switch (getLanguageCodeByPathname()) {
        case 'ar':
            return dateString; // DD MM YYYY

        default:
            return [dd, mm, yy].join(' ');
    }
}
