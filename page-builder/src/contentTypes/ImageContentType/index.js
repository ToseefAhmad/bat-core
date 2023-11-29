import React from 'react';
import {setContentTypeConfig} from '@magento/pagebuilder/lib/config';

import imageContentTypeConfigAggregator from './configAggregator';

export const initImageContentTypeConfig = () => {
    // sideEffects = true, due to this self-registration
    setContentTypeConfig('image', {
        configAggregator: imageContentTypeConfigAggregator,
        component: React.lazy(() => import('./image'))
    });
};
