import {useCallback, useMemo} from 'react';

import {useMutation} from '@luft/apollo';
import WISHLIST_QUERY from '@luft/wishlist/src/graphql/queries/Wishlist.query.graphql';
import CART_QUERY from '@luft/quote/src/graphql/queries/Cart.query.graphql';

import {useWishlistQuery} from './useWishlistQuery';

import ADD_WISHLIST_ITEMS_TO_CART_MUTATION from '../graphql/mutations/addWishlistItemsToCart.mutation.graphql';

export const useWishlistAddToCart = (opts = {}, mutation = ADD_WISHLIST_ITEMS_TO_CART_MUTATION) => {
    const [wishlistAddToCartMutation, {loading, error}] = useMutation(mutation);
    const {data} = useWishlistQuery();
    const wishlistId = data?.viewer?.user?.wishlist?.id;

    const addToCart = useCallback(async (wishlistItemIds = []) => await wishlistAddToCartMutation({
        ...opts,
        awaitRefetchQueries: true,
        refetchQueries: [{query: WISHLIST_QUERY}, {query: CART_QUERY}],
        variables: {
            ...opts.variables,
            wishlistId,
            wishlistItemIds
        }
    }), [opts, wishlistAddToCartMutation, wishlistId]);
    return useMemo(() => [addToCart, {loading, error}], [addToCart, error, loading]);
};
