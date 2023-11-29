import React from 'react';
import {setContentTypeConfig} from '@magento/pagebuilder/lib/config';
import buttonsContentTypeConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Buttons/configAggregator';

import {PageBuilderButtonsShimmerComponent} from '../../components';

export const initButtonsContentTypeConfig = () => {
    // sideEffects = true, due to this self-registration
    setContentTypeConfig('buttons', {
        configAggregator: buttonsContentTypeConfigAggregator,
        component: React.lazy(() => import('@magento/pagebuilder/lib/ContentTypes/Buttons/buttons')),
        componentShimmer: PageBuilderButtonsShimmerComponent
    });
};
