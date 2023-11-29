import TagManager from 'react-gtm-module';

import {getStoreCodeByPathname} from '../../../common';
import {getServerSideTimestamp} from './getServerSideTimestamp';

type Options = {
    /**
     * Current used ID
     */
    userId?: string,
    /**
     * Current pathname
     */
    pathname: string,
    /**
     * Store view timezone
     */
    timezone: string
};

export const trackPageVisit = ({userId, pathname, timezone}: Options) => {
    const countryCode = getStoreCodeByPathname().toUpperCase();

    TagManager.dataLayer({
        dataLayer: {
            UserID: userId || null,
            PageType: pathname,
            LoggedInStatus: userId ? 'logged in' : 'logged out',
            Country: countryCode,
            SiteSection: pathname,
            ServerSideTampstamp: getServerSideTimestamp(timezone)
        }
    });
};
