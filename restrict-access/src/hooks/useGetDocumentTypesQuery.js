import {useQuery} from '@luft/apollo';

import GET_DOCUMENT_TYPES_QUERY from '../graphql/queries/GetDocumentTypes.query.graphql';

export const useGetDocumentTypesQuery = (opts, query = GET_DOCUMENT_TYPES_QUERY) => useQuery(query, opts);
