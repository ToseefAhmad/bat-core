import TagManager from 'react-gtm-module';

import {getStoreCodeByPathname} from '../../../common';
import {getServerSideTimestamp} from './getServerSideTimestamp';
import type {User} from '../../../types';

type Options = {
    /**
     * Current user data
     */
    user: User,
    /**
     * Current pathname
     */
    pathname: string,
    /**
     * Store view timezone
     */
    timezone: string
};

const getPreviousProductList = (orders = []) => {
    const productList = [];

    orders.forEach((order) => {
        order.items.forEach((item) => {
            const name = item?.product?.name;

            if (productList.includes(name)) return;

            productList.push(name);
        });
    });

    return productList;
};

export const trackCustomerOrders = ({user, pathname, timezone}: Options) => {
    const countryCode = getStoreCodeByPathname().toUpperCase();
    const type = 'newsletter_subscribe' in user ? 'newsletter_subscribe' : 'consent';
    const isSubscribed = user[type];

    const dataLayer = {
        UserID: user.id,
        PageType: pathname,
        LoggedInStatus: 'logged in',
        Country: countryCode,
        SiteSection: pathname,
        Previousorders: user.orders?.total,
        PreviousorderedProducts: getPreviousProductList(user.orders?.items),
        ServerSideTampstamp: getServerSideTimestamp(timezone),
        emailsubscription: isSubscribed ? 'yes' : 'no'
    };

    if (isSubscribed) {
        dataLayer.emailsubscriptionItem = 'newsletter';
    }

    TagManager.dataLayer({dataLayer});
};
