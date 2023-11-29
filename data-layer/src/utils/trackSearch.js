import TagManager from 'react-gtm-module';

export const trackSearch = (search, total, userId) => {
    const event = total ? 'search' : 'unsuccessfulsearch';

    TagManager.dataLayer({
        dataLayer: {
            event,
            searchedItem: search,
            searchedResults: total || 0,
            UserID: userId || null,
            pageType: 'search'
        }
    });
};
