import TagManager from 'react-gtm-module';

export const trackRegistration = (status: 'success' | 'fail', errors?: { [key: string]: string }) => {
    const dataLayer = {
        event: 'registration',
        eventAction: status === 'success' ? 'registration Success' : 'registration Failure',
        eventLabel: status
    };

    if (status === 'fail') {
        dataLayer.errorType = 'required_fields';
        dataLayer.errorFields = Object.keys(errors);
    }

    TagManager.dataLayer({dataLayer});
};
