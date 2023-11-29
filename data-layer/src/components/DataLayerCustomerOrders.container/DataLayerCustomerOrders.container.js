import {useState, useEffect} from 'react';
import {useLocation, useRouteMatch} from 'react-router';

import {useIsAuthorized} from '@luft/user';
import {useStoreConfigQuery} from '@luft/common';

import {useDataLayerViewerOrders} from '../../hooks';
import {trackCustomerOrders} from '../../utils';

export function DataLayerCustomerOrdersContainer() {
    const {pathname} = useLocation();
    const isAuthorized = useIsAuthorized();
    const {data: storeConfigData} = useStoreConfigQuery();
    const {data: viewerData} = useDataLayerViewerOrders({skip: !isAuthorized});
    const [isTracked, setIsTracked] = useState(false);

    const shouldTrackCustomerOrders = !!useRouteMatch({
        path: ['/account', '/account/orders'],
        exact: true
    });

    const user = viewerData?.viewer?.user;
    const timezone = storeConfigData?.storeConfig?.timezone;

    // Track "customer orders" event only on certain pages and only once
    useEffect(() => {
        if (!shouldTrackCustomerOrders || isTracked || !user) return;

        trackCustomerOrders({user, pathname, timezone});
        setIsTracked(true);
    }, [shouldTrackCustomerOrders, isTracked, user, pathname, timezone]);

    return null;
}
