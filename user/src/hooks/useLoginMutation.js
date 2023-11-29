import {useMutation} from '@luft/apollo';
import {useCartIdQuery} from '@luft/quote';
import type {LoginInput} from '@luft/types';

import CART_LIMITED_QUERY from '@luft/quote/src/graphql/queries/CartLimited.query.graphql';
import LOGIN_MUTATION from '@luft/user/src/graphql/mutations/Login.mutation.graphql';
import VIEWER_QUERY from '@luft/user/src/graphql/queries/Viewer.query.graphql';

export const useLoginMutation = (opts = {}, mutation = LOGIN_MUTATION) => {
    const cartId = useCartIdQuery().data?.cart?.id;

    const [loginMutation, {client, ...payload}] = useMutation(mutation, {
        update: (cache, {data: {login}}) => {
            const {token, confirmed} = login || {};
            const isNotConfirmedAccount = confirmed === false;

            if (!token || isNotConfirmedAccount) return;

            cache.writeQuery({
                query: VIEWER_QUERY,
                data: {viewer: {...login}}
            });
        }
    });

    return [
        async (input: LoginInput) => {
            const response = await loginMutation({
                ...opts,
                variables: {
                    ...opts.variables,
                    input
                }
            });

            try {
                // Imperative refetch is used because we need to return a login
                // mutation response, even in case of error during the query
                // refetching, and we still want to wait until refetching is done
                await client.refetchQueries({
                    include: [{
                        query: CART_LIMITED_QUERY,
                        variables: {cart_id: cartId}
                    }]
                });
            } catch {
                // Silence refetch errors (mainly "cart not found" error)
            }

            return response;
        },
        {client, ...payload}
    ];
};
