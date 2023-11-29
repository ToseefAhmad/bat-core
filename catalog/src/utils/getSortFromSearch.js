import {parse} from 'query-string';
import {pick, isEmpty} from 'lodash';

const SORT_FIELDS = ['sort_option_id', 'direction'];

export const getSortFromSearch = (search: string) => {
    if (!search) return;

    const queryParams = parse(search);
    const sort = pick(queryParams, SORT_FIELDS);

    if (isEmpty(sort)) return;

    return sort;
};
