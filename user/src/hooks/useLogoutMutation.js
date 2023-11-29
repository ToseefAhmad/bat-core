import {useCallback} from 'react';

import {useMutation} from '@luft/apollo';
import {useClearCartCache} from '@luft/quote';
import LOGOUT_MUTATION from '@luft/user/src/graphql/mutations/Logout.mutation.graphql';

import VIEWER_QUERY from '../graphql/queries/Viewer.query.graphql';

/**
 * @module @luft/user
 * @scope @luft/user
 * @exports useLogoutMutation
 * @function useLogoutMutation
 * @kind Hook
 *
 * @description
 * User's logout
 *
 * @param {Object} opts - Apollo Client `useMutation` hook options
 * @param {DocumentNode} mutation - GraphQL mutation document
 * @returns {Array<function(): Promise<Object>, Object>} `MutationResult` of Apollo Client
 *
 * @example
 * ```js
 * import {useLogoutMutation} from '@luft/user';
 * ```
 *
 * @example
 * ```jsx
 * const [handler, payload] = useLogoutMutation();
 *
 * const handleLogout = async () => {
 *      try {
 *          return await handler();
 *      } catch (e) {
 *          ...
 *      }
 * };
 *
 * <Component onSubmit={handleLogout}/>
 * ```
 */
export const useLogoutMutation = (opts = {}, mutation = LOGOUT_MUTATION) => {
    const clearCartCacheHandler = useClearCartCache();
    const [logoutMutation, payload] = useMutation(mutation);

    return [
        useCallback(async () => await logoutMutation({
            ...opts,
            update: (cache) => {
                cache.writeQuery({
                    query: VIEWER_QUERY,
                    // Passing an empty object to viewer will cause an error.
                    // Apollo repo has issue about it (https://github.com/apollographql/apollo-client/issues/2510)
                    data: {
                        // Avoid difference in schema and errors in console
                        viewer: {
                            __typename: 'Viewer',
                            confirmed: null,
                            token: null,
                            user: null,
                            user_for_social_register: null
                        }
                    }
                });
                clearCartCacheHandler();
                if (opts.update) opts.update(cache);
            }
        }), [clearCartCacheHandler, logoutMutation, opts]),
        payload
    ];
};
