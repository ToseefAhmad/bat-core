import {useQuery} from '@luft/apollo';

import DATA_LAYER_VIEWER_ORDERS_QUERY from '../graphql/queries/DataLayerViewerOrders.query.graphql';

export const useDataLayerViewerOrders = (opts = {}, query = DATA_LAYER_VIEWER_ORDERS_QUERY) => useQuery(query, opts);
