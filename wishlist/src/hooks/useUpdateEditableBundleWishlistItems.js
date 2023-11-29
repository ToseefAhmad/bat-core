import {useCallback, useMemo} from 'react';

import {useMutation} from '@luft/apollo';

import UPDATE_WISHLIST_ITEMS_MUTATION from '@luft/wishlist/src/graphql/mutations/UpdateEditableBundleWishlistItems.mutation.graphql';

/**
 * @module @luft/wishlist
 * @scope @luft/wishlist
 * @exports useUpdateEditableBundleWishlistItems
 * @function useUpdateEditableBundleWishlistItems
 * @kind Hook
 *
 * @description
 * Update WishlistItem with EditableBundle Product type
 *
 *
 * @param {Object} options - Apollo Client `useMutation` hook options
 * @param {DocumentNode} mutation - GraphQL mutation document
 * @returns {Array<function(itemId, {qty, editableBundleOptions}): Promise<FetchResult<any> | void>, {error: *}>}
 * `MutationResult` of Apollo Client
 *
 * @example
 * ```js
 * import {useUpdateEditableBundleWishlistItems} from '@luft/wishlist';
 * ```
 *
 * @example
 * ```jsx
 * const [updateItems, payload] = useUpdateEditableBundleWishlistItems();
 * const handleOnItemsUpdate = async qty => await updateItems(wishlistItemId, {qty, editableBundleOptions});
 *
 * <Component onSubmit={handleOnItemsUpdate}/>
 * ```
 */
export const useUpdateEditableBundleWishlistItems = (options, mutation = UPDATE_WISHLIST_ITEMS_MUTATION) => {
    const [updateItems, payload] = useMutation(mutation, options);
    const handleUpdateItems = useCallback(async (itemId, {qty, editableBundleOptions, engraved_options}) => (
        updateItems({
            variables: {
                input: {
                    items: [{
                        wishlist_item_id: itemId,
                        quantity: qty,
                        ...(editableBundleOptions?.length && {bundle_options: editableBundleOptions}),
                        ...(engraved_options && {engraved_options})
                    }]
                }
            }
        })
    ), [updateItems]);

    return useMemo(() => [handleUpdateItems, payload], [handleUpdateItems, payload]);
};
