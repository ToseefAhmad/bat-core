import {useMutation} from '@luft/apollo';

import CONTACT_US_MUTATION from '../graphql/mutations/SendContactUsFormToCRM.graphql';

export function useContactUsMutation(token, options = {}, mutation = CONTACT_US_MUTATION) {
    const [sendContactUsForm, payload] = useMutation(mutation, token ? {context: {headers: {'x-recaptcha': token}}} : {});

    return [
        async (input) => await sendContactUsForm({
            ...options,
            variables: {
                ...options.variables,
                input
            }
        }),
        payload
    ];
}
