import {useMutation} from '@luft/apollo';

import VALIDATE_ENGRAVING_TEXT_MUTATION from '../graphql/mutations/ValidateEngravingTextMutation.graphql';

export const useValidateEngravingText = (opts = {}, mutation = VALIDATE_ENGRAVING_TEXT_MUTATION) => {
    const [validateEngravingText, payload] = useMutation(mutation, opts);

    return [
        async (text) => await validateEngravingText({
            ...opts,
            variables: {
                ...opts.variables,
                input: {
                    engraving_text: text
                }
            }
        }),
        payload
    ];
};
