import {useMutation} from '@luft/apollo';

import VIEWER_QUERY from '@luft/user/src/graphql/queries/Viewer.query.graphql';

import PREFERENCES_INFO_MUTATION from '../graphql/mutations/UpdatePreferences.mutation.graphql';

export const useUpdatePreferencesMutation = (opts = {}, mutation = PREFERENCES_INFO_MUTATION) => {
    const [updatePreferencesMutation, payload] = useMutation(mutation);

    return [
        async (input: UpdatePreferencesInput) => await updatePreferencesMutation({
            ...opts,
            variables: {
                ...opts.variables,
                input
            },
            // TODO: It will be a way better to return Viewer as a mutation response, instead of refetching
            awaitRefetchQueries: true,
            refetchQueries: () => [{query: VIEWER_QUERY}]
        }),
        payload
    ];
};
