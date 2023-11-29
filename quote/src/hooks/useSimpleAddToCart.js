import {useCallback, useMemo} from 'react';

import {useCartMutation, useCartIdQuery} from '@luft/quote';

import ADD_ITEMS_TO_CART_MUTATION from '@luft/quote/src/graphql/mutations/AddItemsToCart.mutation.graphql';

/**
 * @module @luft/quote
 * @scope @luft/quote
 * @exports useSimpleAddToCart
 * @function useSimpleAddToCart
 * @kind Hook
 *
 * @description
 * Add product to cart
 *
 * @param {Object} opts - Apollo Client `useMutation` hook options
 * @returns {Array<function(*): Promise<Object>, Object>} `MutationResult` of Apollo Client
 *
 * @example
 * ```js
 * import {useSimpleAddToCart} from '@luft/quote';
 * ```
 *
 * @example
 * ```jsx
 * const [addItem, payload] = useSimpleAddToCart();
 *
 * const handleAddToCart = async () => await addItem(productId, qty);
 *
 * <Component onSubmit={handleAddToCart}/>
 * ```
 */
export const useSimpleAddToCart = (opts = {}) => {
    const cart_id = useCartIdQuery()?.data?.cart?.id;
    const [addSimpleItem, payload] = useCartMutation(ADD_ITEMS_TO_CART_MUTATION, opts);
    const mutation = useCallback(async (
        productId,
        quantity,
        engravingOptions,
        {removeFrom}
    ) => {
        let cartItems = [{
            product_id: productId,
            quantity
        }];

        if (engravingOptions?.length) {
            cartItems = engravingOptions.map(item => ({
                product_id: productId,
                quantity,
                engraved_options: item
            }));
        }

        return await addSimpleItem({
            variables: {
                input: {
                    cart_id,
                    cart_items: cartItems,
                    remove_from: removeFrom
                }
            }
        });
    }, [cart_id, addSimpleItem]);
    return useMemo(() => [mutation, payload], [mutation, payload]);
};
