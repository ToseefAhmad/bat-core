import {useQuery} from '@luft/apollo';

import VIEWER_QUERY from '../graphql/queries/Viewer.query.graphql';

export const useViewerQuery = (opts, query = VIEWER_QUERY) => useQuery(query, opts);
