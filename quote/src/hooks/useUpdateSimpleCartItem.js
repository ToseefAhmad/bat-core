import {useCallback, useMemo} from 'react';

import {
    useCartMutation,
    useCartIdQuery
} from '@luft/quote';

import UPDATE_CART_ITEMS_MUTATION from '@luft/quote/src/graphql/mutations/UpdateCartItems.mutation.graphql';

export const useUpdateSimpleCartItem = (opts, mutation = UPDATE_CART_ITEMS_MUTATION) => {
    const cartId = useCartIdQuery()?.data?.cart?.id;
    const [updateItem, payload] = useCartMutation(mutation, opts);
    const handleUpdateItem = useCallback(async (itemId, {qty, engraved_options}) => updateItem({
        variables: {
            input: {
                cart_id: cartId,
                cart_items: [{
                    cart_item_id: itemId,
                    quantity: qty,
                    engraved_options
                }]
            }
        }
    }), [cartId, updateItem]);

    return useMemo(() => [handleUpdateItem, payload], [handleUpdateItem, payload]);
};
