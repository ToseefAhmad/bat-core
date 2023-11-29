import {useQuery} from '@luft/apollo';

import IS_RESET_TOKEN_VALID_QUERY from '../graphql/queries/IsPasswordResetTokenValid.query.graphql';

export const useIsPasswordResetTokenValid = (opts, query = IS_RESET_TOKEN_VALID_QUERY) => useQuery(query, opts);
