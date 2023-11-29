import {useQuery} from '@luft/apollo';

import VIEWER_ORDER_QUERY from '../graphql/queries/ViewerOrder.query.graphql';

export const useViewerOrderQuery = (opts, query = VIEWER_ORDER_QUERY) => useQuery(query, opts);
