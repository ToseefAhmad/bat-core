import {isNull} from 'lodash';

import {isDevelopment} from '@luft/util';

const {LUFT_APP_SERVER_URL} = process.env;

const getCurrentUrl = (url) => {
    if (isDevelopment()) {
        const {pathname} = new URL(url);

        // LUFT_APP_SERVER_URL is needed for a local development. It contains url of dev server.
        // This variable is used for search necessary store, since locally there will be localhost.
        return LUFT_APP_SERVER_URL + pathname;
    }

    return url;
};

export function getCurrentStore(stores = [], url) {
    if (!stores?.length) return;

    const currentUrl = getCurrentUrl(url);
    const defaultStore = stores.find(({code}) => isNull(code));

    return stores.find(({base_url}) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        currentUrl === base_url || currentUrl.startsWith(`${base_url}/`)
    ) || defaultStore;
}
