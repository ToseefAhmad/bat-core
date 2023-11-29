import React, {useEffect, useRef} from 'react';
import {useLocation} from 'react-router';
import type {ComponentType} from 'react';

import {
    LoaderComponent,
    ErrorComponent,
    NoCacheComponent,
    useStoreConfigQuery
} from '@luft/common';
import {OrdersComponent} from '@luft/sales';

import {useViewerOrdersQuery} from '../../hooks';
import {trackCustomerOrders} from '../../../../data-layer';
import {getStoreCodeByPathname} from '../../../../common';

type Props = {
    as?: ComponentType<{}>,
    loadingAs?: ComponentType<{}>,
    errorAs?: ComponentType<{}>,
    noCacheAs?: ComponentType<{}>,
    awaitResult?: boolean
}

export function OrdersContainer(props: Props) {
    const {
        as: Component = OrdersComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        ...other
    } = props;

    const {pathname} = useLocation();
    const userOrdersData = useViewerOrdersQuery();
    const timezone = useStoreConfigQuery()?.data?.storeConfig?.timezone;
    const userIdRef = useRef(null);

    useEffect(() => {
        const isIndonesia = getStoreCodeByPathname() === 'id';

        if (!isIndonesia) return;

        const user = userOrdersData.data?.viewer?.user;

        if (user && !userIdRef.current) {
            trackCustomerOrders({user, pathname, timezone});
            userIdRef.current = user.id;
        }
    }, [userOrdersData, pathname, timezone]);

    if (awaitResult && userOrdersData.loading) return Loading && <Loading/>;
    if (awaitResult && userOrdersData.dataError) return Error && <Error error={userOrdersData.error}/>;
    if (awaitResult && userOrdersData.noCache) return NoCache && <NoCache/>;

    const ordersData = userOrdersData.data?.viewer?.user?.orders;
    const orders = ordersData?.items;
    const canLoadMore = ordersData ? ordersData.total > ordersData.count : undefined;

    return (
        <Component {...other}
                   q={userOrdersData}
                   orders={orders}
                   canLoadMore={canLoadMore}
                   isLoadingMore={userOrdersData.loadingMore}
                   onLoadMore={userOrdersData.fetchMore}/>
    );
}
