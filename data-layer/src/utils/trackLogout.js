import TagManager from 'react-gtm-module';

export const trackLogout = () => TagManager.dataLayer({
    dataLayer: {
        event: 'account',
        eventAction: 'logout',
        eventLabel: 'success'
    }
});
