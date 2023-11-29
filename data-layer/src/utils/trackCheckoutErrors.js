import TagManager from 'react-gtm-module';

import {getErrorFieldsData} from './getErrorFieldsData';

export const trackCheckoutErrors = (errors, errorSource, step) => TagManager.dataLayer({
    dataLayer: {
        eventAction: `checkout step ${step}`,
        eventLabel: 'fail',
        event: errorSource,
        ...getErrorFieldsData(errors)
    }
});
