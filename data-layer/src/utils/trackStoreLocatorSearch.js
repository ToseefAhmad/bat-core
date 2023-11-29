import TagManager from 'react-gtm-module';

export const trackStoreLocatorSearch = (searchValue: string, storesCount: number) => {
    const data = storesCount ? {
        searchedstore: searchValue,
        storeSearchResults: storesCount?.toString()
    } : {
        searchedstore: 'no store found'
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
