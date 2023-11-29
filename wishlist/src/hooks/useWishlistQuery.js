import {usePagesQuery} from '@luft/apollo';

import WISHLIST_QUERY from '../graphql/queries/Wishlist.query.graphql';

/**
 * @module @luft/wishlist
 * @scope @luft/wishlist
 * @exports useWishlistQuery
 * @function useWishlistQuery
 * @kind Hook
 *
 * @description
 * Fetch list of wishlist products
 *
 * @param {Object} options - Apollo Client `useQuery` hook options
 * @param {DocumentNode} query - GraphQL query document
 * @returns {ApolloQueryResult} `QueryResult` of Apollo Client
 *
 * @example
 * ```js
 * import {useWishlistQuery} from '@luft/wishlist';
 * ```
 *
 * @example
 * ```jsx
 * const q = useWishlistQuery();
 * ```
 */
export const useWishlistQuery = (options = {}, query = WISHLIST_QUERY) => usePagesQuery(query, options);
