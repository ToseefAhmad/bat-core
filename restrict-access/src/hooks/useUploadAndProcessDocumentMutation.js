import {useMutation} from '@luft/apollo';

import UPLOAD_AND_PROCESS_DOCUMENT_MUTATION from '../graphql/mutations/UploadAndProcessDocument.mutation.graphql';

export const useUploadAndProcessDocumentMutation = (opts = {}, mutation = UPLOAD_AND_PROCESS_DOCUMENT_MUTATION) => {
    const [processDocument, payload] = useMutation(mutation, opts);

    return [
        async (input) => await processDocument({
            ...opts,
            variables: {
                ...opts.variables,
                input
            }
        }),
        payload
    ];
};
