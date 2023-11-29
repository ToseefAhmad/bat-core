import TagManager from 'react-gtm-module';

export const trackStoreLocatorClick = (searchValue, distance) => {
    const data = {
        searchedstore: searchValue,
        distance,
        getDirections: 'yes'
    };

    TagManager.dataLayer({
        dataLayer: {
            eventName: 'StoreLocatorSearch',
            ...data
        }
    });

    TagManager.dataLayer({
        dataLayer: {
            eventName: 'StoreLocatorUseLocation',
            ...data
        }
    });
};
