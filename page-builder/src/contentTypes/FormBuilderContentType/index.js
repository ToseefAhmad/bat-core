import React from 'react';
import {setContentTypeConfig} from '@magento/pagebuilder/lib/config';

export const initFormBuilderContentTypeConfig = () => {
    // sideEffects = true, due to this self-registration
    setContentTypeConfig('formbuilder', {
        component: React.lazy(() => import('./formBuilder'))
    });
};
