import TagManager from 'react-gtm-module';

export const trackLogin = (status: 'success' | 'fail', errorMessage?: string) => {
    const dataLayer = {
        event: 'account',
        eventAction: 'login',
        eventLabel: status
    };

    if (status === 'fail') {
        dataLayer.errorType = 'incorrect_credentials';
        dataLayer.errorFields = errorMessage;
    }

    TagManager.dataLayer({dataLayer});
};
