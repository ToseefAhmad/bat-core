import {get} from 'lodash';

import {useMutation} from '@luft/apollo';
import {useCartIdQuery} from '@luft/quote';

import APPLY_POINTS_MUTATION from '../graphql/mutations/ApplyPointsToCart.mutation.graphql';

export const useApplyPointsToCartMutation = (options = {}, mutation = APPLY_POINTS_MUTATION) => {
    const {onCompleted} = options;

    const [applyPointsMutation, payload] = useMutation(mutation, {onCompleted});
    const cartId = get(useCartIdQuery(), 'data.cart.id');

    return [
        async (points) => await applyPointsMutation({
            ...options,
            variables: {
                ...options.variables,
                input: {
                    cart_id: cartId,
                    points
                }
            }
        }),
        payload
    ];
};
