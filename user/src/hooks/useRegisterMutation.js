import {useMutation} from '@luft/apollo';
import type {RegisterInput} from '@luft/types';

import REGISTER_MUTATION from '@luft/user/src/graphql/mutations/Register.mutation.graphql';
import VIEWER_QUERY from '@luft/user/src/graphql/queries/Viewer.query.graphql';

export const useRegisterMutation = (opts = {}, mutation = REGISTER_MUTATION) => {
    const [registerMutation, payload] = useMutation(mutation, {
        update: (cache, {data: {register}}) => {
            cache.writeQuery({
                query: VIEWER_QUERY,
                data: {viewer: {...register}}
            });
        }
    });

    return [
        async (formInput: RegisterInput) => {
            // get rid of empty values Avoid problem that graphql doesn't allow to pass '' in enum fields
            // (such as gender) because it is enum value and empty string is not a valid value
            const input = {};
            Object.entries(formInput).forEach(([key, value]) => {
                if (value !== '') {
                    input[key] = value;
                }
            });
            return await registerMutation({
                ...opts,
                variables: {
                    ...opts.variables,
                    input
                }
            });
        },
        payload
    ];
};
