import React from 'react';
import {setContentTypeConfig} from '@magento/pagebuilder/lib/config';
import videoContentTypeConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Video/configAggregator';

export const initVideoContentTypeConfig = () => {
    // sideEffects = true, due to this self-registration
    setContentTypeConfig('video', {
        configAggregator: videoContentTypeConfigAggregator,
        component: React.lazy(() => import('./video'))
    });
};
