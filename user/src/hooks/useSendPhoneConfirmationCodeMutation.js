import {useMutation} from '@luft/apollo';

import SEND_PHONE_CONFIRM_CODE_MUTATION from '../graphql/mutations/SendPhoneConfirmationCode.mutation.graphql';

export const useSendPhoneConfirmationCodeMutation = (options = {}, mutation = SEND_PHONE_CONFIRM_CODE_MUTATION) => {
    const [requestCode, payload] = useMutation(mutation);

    return [
        async (input) => await requestCode({
            ...options,
            variables: {
                ...options.variables,
                input
            }
        }),
        payload
    ];
};
