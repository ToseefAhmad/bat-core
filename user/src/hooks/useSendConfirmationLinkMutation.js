import {useMutation} from '@luft/apollo';

import SEND_CONFIRMATION_LINK_MUTATION from '../graphql/mutations/SendConfirmationEmail.mutation.graphql';

export const useSendConfirmationLinkMutation = (options = {}, mutation = SEND_CONFIRMATION_LINK_MUTATION) => {
    const [sendConfirmationLink, payload] = useMutation(mutation);

    return [
        async (input) => await sendConfirmationLink({
            ...options,
            variables: {
                ...options.variables,
                input
            }
        }),
        payload
    ];
};
