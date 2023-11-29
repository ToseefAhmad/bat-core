import {stringify} from 'query-string';
import {pick} from 'lodash';

import type {Sort} from '@luft/types';

const SORT_FIELDS = ['sort_option_id', 'direction'];

export const getSearchWithSort = (appliedSort: Sort, additionalQueryParams?: Object = {}) => {
    if (appliedSort.is_default) return stringify(additionalQueryParams);

    const sortQueryParams = pick(appliedSort, SORT_FIELDS);

    return stringify({
        ...sortQueryParams,
        ...additionalQueryParams
    });
};
