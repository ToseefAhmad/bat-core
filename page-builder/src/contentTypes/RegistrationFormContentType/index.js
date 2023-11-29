import React from 'react';

import {setContentTypeConfig} from '@magento/pagebuilder/lib/config';

export const initRegistrationFormContentTypeConfig = () => {
    // sideEffects = true, due to this self-registration
    setContentTypeConfig('registration_form', {
        configAggregator: () => null,
        component: React.lazy(() => import('./registrationForm'))
    });
};
