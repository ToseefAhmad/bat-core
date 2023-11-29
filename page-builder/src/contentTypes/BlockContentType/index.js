import {setContentTypeConfig} from '@magento/pagebuilder/lib/config';

import blockContentTypeConfigAggregator from '@luft/page-builder/src/contentTypes/BlockContentType/configAggregator';

import {BlockContentType} from './BlockContentType';

export const initBlockContentTypeConfig = () => {
    // sideEffects = true, due to this self-registration
    setContentTypeConfig('block', {
        configAggregator: blockContentTypeConfigAggregator,
        component: BlockContentType
    });
};
