import {useQuery} from '@luft/apollo';

import STORE_CONFIG_QUERY from '../graphql/queries/StoreConfig.query.graphql';

let fetched = false;

/**
 * @module @luft/common
 * @scope @luft/common
 * @exports useStoreConfigQuery
 * @function useStoreConfigQuery
 * @kind Hook
 *
 * @description
 * Fetch Store config information for the current store
 *
 * @param {Object} [options = {}] - Apollo Client `useQuery` hook options
 * @param {DocumentNode} [query=STORE_CONFIG_QUERY] - GraphQL query document
 * @returns {Object} `QueryResult` of Apollo Client
 *
 * @example
 * ```js
 * import {useStoreConfigQuery} from '@luft/common';
 * ```
 *
 * @example
 * ```jsx
 * const {data, loading, error} = useStoreConfigQuery();
 * ```
 */
export function useStoreConfigQuery(options = {}, query = STORE_CONFIG_QUERY) {
    const {onCompleted, ...other} = options;

    return useQuery(query, {
        fetchPolicy: fetched ? 'cache-first' : 'cache-and-network',
        onCompleted: (response) => {
            fetched = true;

            if (onCompleted) onCompleted(response);
        },
        ...other
    });
}
