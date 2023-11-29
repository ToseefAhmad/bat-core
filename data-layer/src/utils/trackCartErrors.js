import TagManager from 'react-gtm-module';

import {getErrorFieldsData} from './getErrorFieldsData';

export const trackCartErrors = (errors, errorSource) => TagManager.dataLayer({
    dataLayer: {
        eventAction: 'cart',
        eventLabel: 'fail',
        event: errorSource,
        ...getErrorFieldsData(errors)
    }
});
