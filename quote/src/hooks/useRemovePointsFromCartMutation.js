import {get} from 'lodash';

import {useMutation} from '@luft/apollo';
import {useCartIdQuery} from '@luft/quote';

import REMOVE_POINTS_MUTATION from '../graphql/mutations/RemovePointsFromCart.mutation.graphql';

export const useRemovePointsFromCartMutation = (options = {}, mutation = REMOVE_POINTS_MUTATION) => {
    const {onCompleted} = options;

    const [removePointsMutation, payload] = useMutation(mutation, {onCompleted});
    const cartId = get(useCartIdQuery(), 'data.cart.id');

    return [
        async () => await removePointsMutation({
            ...options,
            variables: {
                ...options.variables,
                input: {
                    cart_id: cartId
                }
            }
        }),
        payload
    ];
};
