import {useCallback, useMemo} from 'react';

import {useMutation} from '@luft/apollo';

import UPDATE_WISHLIST_ITEMS_MUTATION from '@luft/wishlist/src/graphql/mutations/UpdateWishlistItems.mutation.graphql';

/**
 * @module @luft/wishlist
 * @scope @luft/wishlist
 * @exports useUpdateSimpleWishlistItems
 * @function useUpdateSimpleWishlistItems
 * @kind Hook
 *
 * @description
 * Update WishlistItem with Simple Product type
 *
 *
 * @param {Object} options - Apollo Client `useMutation` hook options
 * @param {DocumentNode} mutation - GraphQL mutation document
 * @returns {Array<function(itemId, {qty}): Promise<FetchResult<any> | void>, {error: *}>}
 * `MutationResult` of Apollo Client
 *
 * @example
 * ```js
 * import {useUpdateSimpleWishlistItems} from '@luft/wishlist';
 * ```
 *
 * @example
 * ```jsx
 * const [updateItems, payload] = useUpdateSimpleWishlistItems();
 * const handleOnItemsUpdate = async qty => await updateItems(wishlistItemId, {qty});
 *
 * <Component onSubmit={handleOnItemsUpdate}/>
 * ```
 */
export const useUpdateSimpleWishlistItems = (options, mutation = UPDATE_WISHLIST_ITEMS_MUTATION) => {
    const [updateItems, payload] = useMutation(mutation, options);
    const handleUpdateItems = useCallback(async (itemId, {qty, engraved_options}) => updateItems({
        variables: {
            input: {
                items: [{
                    wishlist_item_id: itemId,
                    quantity: qty,
                    ...(engraved_options && {engraved_options})
                }]
            }
        }
    }), [updateItems]);

    return useMemo(() => [handleUpdateItems, payload], [handleUpdateItems, payload]);
};
