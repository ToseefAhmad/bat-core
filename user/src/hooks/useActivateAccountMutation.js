import {useMutation} from '@luft/apollo';

import VIEWER_QUERY from '@luft/user/src/graphql/queries/Viewer.query.graphql';

import ACTIVATE_ACCOUNT_MUTATION from '../graphql/mutations/ActivateAccount.mutation.graphql';

export const useActivateAccountMutation = (options = {}, mutation = ACTIVATE_ACCOUNT_MUTATION) => {
    const [activateAccountMutation, payload] = useMutation(mutation, {
        update: (cache, {data: {activateAccount}}) => {
            cache.writeQuery({
                query: VIEWER_QUERY,
                data: {viewer: {...activateAccount}}
            });
        }
    });

    return [
        async (input) => await activateAccountMutation({
            ...options,
            variables: {
                ...options.variables,
                input
            }
        }),
        payload
    ];
};
