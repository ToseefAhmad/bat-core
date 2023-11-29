import {useMutation} from '@luft/apollo';

import VERIFY_CONFIRMATION_CODE_MUTATION from '../graphql/mutations/VerifyPhoneConfirmationCode.mutation.graphql';

export const useVerifyConfirmationCodeMutation = (options = {}, mutation = VERIFY_CONFIRMATION_CODE_MUTATION) => {
    const [confirmCode, payload] = useMutation(mutation);

    return [
        async (input) => await confirmCode({
            ...options,
            variables: {
                ...options.variables,
                input
            }
        }),
        payload
    ];
};
