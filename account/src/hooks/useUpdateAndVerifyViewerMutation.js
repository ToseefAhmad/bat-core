import {mapValues} from 'lodash';

import {useMutation} from '@luft/apollo';
import type {Mutation, UpdateViewerInput} from '@luft/types';
import VIEWER_QUERY from '@luft/user/src/graphql/queries/Viewer.query.graphql';

import UPDATE_AND_VERIFY_VIEWER_INFO_MUTATION from '../graphql/mutations/UpdateAndVerifyViewer.mutation.graphql';

/**
 * @description
 * Update and verify viewer information
 *
 * @param {Object} opts - Apollo Client `useMutation` hook options
 * @param {DocumentNode} mutation - GraphQL mutation document
 * @returns {Array<Promise<Object>, Object>} `MutationResult` of Apollo Client
 *
 * @example
 * ```js
 * import {useUpdateAndVerifyViewerMutation} from '@luft/account';
 * ```
 *
 * @example
 * ```jsx
 * const [updateAccount, payload] = useUpdateAndVerifyViewerMutation();
 *
 * const handleUpdateAccount = async ({password, new_password, ...others}) =>
 * await updateAccount({viewer_info: {...others}, password, new_password});
 *
 * <Component onSubmit={handleUpdateAccount}/>
 * ```
 */
export const useUpdateAndVerifyViewerMutation = (
    opts: Object = {},
    mutation: Mutation = UPDATE_AND_VERIFY_VIEWER_INFO_MUTATION
) => {
    const [updateAndVerifyViewerInfoMutation, payload] = useMutation(mutation);

    return [
        async (formInput: UpdateViewerInput) => {
            const input = {
                ...formInput,
                // change empty values to null. Avoid problem that graphql doesn't allow to pass '' in enum fields
                // (such as gender) because it is enum value and empty string is not a valid value
                viewer_info: mapValues(formInput.viewer_info, (value) => (value === '' ? null : value))
            };
            return await updateAndVerifyViewerInfoMutation({
                ...opts,
                variables: {
                    ...opts.variables,
                    input
                },
                update: (cache, {data: {updateViewer}}) => {
                    cache.writeQuery({
                        query: VIEWER_QUERY,
                        data: {viewer: {...updateViewer}}
                    });
                }
            });
        },
        payload
    ];
};
