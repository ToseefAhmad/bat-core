import {useCallback, useMemo} from 'react';

import {useMutation} from '@luft/apollo';

import UPDATE_WISHLIST_ITEMS_MUTATION from '@luft/wishlist/src/graphql/mutations/UpdateConfigurableWishlistItems.mutation.graphql';

/**
 * @module @luft/wishlist
 * @scope @luft/wishlist
 * @exports useUpdateConfigurableWishlistItems
 * @function useUpdateConfigurableWishlistItems
 * @kind Hook
 *
 * @description
 * Update WishlistItem with Configurable Product type
 *
 *
 * @param {Object} options - Apollo Client `useMutation` hook options
 * @param {DocumentNode} mutation - GraphQL mutation document
 * @returns {Array<function(itemId, {qty, variation}): Promise<FetchResult<any> | void>, {error: *}>}
 * `MutationResult` of Apollo Client
 *
 * @example
 * ```js
 * import {useUpdateConfigurableWishlistItems} from '@luft/wishlist';
 * ```
 *
 * @example
 * ```jsx
 * const [updateItems, payload] = useUpdateConfigurableWishlistItems();
 * const handleOnItemsUpdate = async qty => await updateItems(wishlistItemId, {qty, variation});
 *
 * <Component onSubmit={handleOnItemsUpdate}/>
 * ```
 */
export const useUpdateConfigurableWishlistItems = (options, mutation = UPDATE_WISHLIST_ITEMS_MUTATION) => {
    const [updateItems, payload] = useMutation(mutation, options);
    const handleUpdateItems = useCallback(async (itemId, {qty, variation, engraved_options}) => updateItems({
        variables: {
            ...options?.variables,
            input: {
                items: [{
                    wishlist_item_id: itemId,
                    quantity: qty,
                    ...({variant_product_id: variation?.product?.id || null}),
                    ...(engraved_options && {engraved_options})
                }]
            }
        }
    }), [options, updateItems]);

    return useMemo(() => [handleUpdateItems, payload], [handleUpdateItems, payload]);
};
