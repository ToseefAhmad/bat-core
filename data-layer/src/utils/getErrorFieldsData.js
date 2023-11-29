import type {RefObject} from 'react';

type Errors = {
    [key: string]: {
        ref: RefObject,
        type: string
    }
};

export const getErrorFieldsData = (errors: Errors) => Object.values(errors).reduce((data, {ref, type}) => {
    if (ref) {
        data.fieldsList.push(ref.id);
        // eslint-disable-next-line no-param-reassign
        data.errorType = type;
    }

    return data;
}, {fieldsList: [], errorType: null});
