import {useMutation} from '@luft/apollo';

import WISHLIST_SHARING_MUTATION from '../graphql/mutations/WishlistSharingMutation.graphql';

export const useWishlistSharingMutation = (opts = {}, mutation = WISHLIST_SHARING_MUTATION) => {
    const [wishlistSharingMutation, payload] = useMutation(mutation);

    return [
        async (input: ShareWishlistInput) => await wishlistSharingMutation({
            ...opts,
            variables: {
                ...opts.variables,
                input
            }
        }),
        payload
    ];
};
