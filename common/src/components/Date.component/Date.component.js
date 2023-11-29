import {useIntl} from 'react-intl';

import {formatDate as formatDateString} from '@luft/util';

export function DateComponent({date, options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}}) {
    const {formatDate} = useIntl();

    return formatDate(formatDateString(date), options);
}
