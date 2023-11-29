import TagManager from 'react-gtm-module';

export const trackNewsletter = () => TagManager.dataLayer({
    dataLayer: {
        event: 'newsletter',
        eventAction: 'newsletter sign up',
        eventLabel: 'success'
    }
});
