import {usePaginatedQuery} from '@luft/apollo';

import VIEWER_ORDERS_QUERY from '../graphql/queries/BatViewerOrders.query.graphql';

const DEFAULT_PAGE_SIZE = 10;

export const useViewerOrdersQuery = (opts = {}, query = VIEWER_ORDERS_QUERY) => usePaginatedQuery(query, {
    count: DEFAULT_PAGE_SIZE,
    pagedDataAccessor: data => data.viewer.user.orders,
    ...opts,
    variables: {
        ...opts.variables
    }
});
