import React from 'react';

import {useStoreSwitcherQuery} from '@luft/multistore';

import {StoreViewSwitcherComponent} from '../StoreViewSwitcher.component';

type Props = {
    as?: React.Component,
    loadingAs?: React.Component,
    errorAs?: React.Component,
    noCacheAs?: React.Component,
    awaitResult?: boolean,
    websiteId?: string
}

export function StoreViewSwitcherContainer(props: Props) {
    const {
        as: Component = StoreViewSwitcherComponent,
        loadingAs: Loading = null,
        errorAs: Error = null,
        noCacheAs: NoCache = null,
        awaitResult = true,
        websiteId,
        ...other
    } = props;

    const q = useStoreSwitcherQuery();

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const storeViewsList = q.data?.storeSwitcher;

    if (!storeViewsList) return null;

    const storeViews = storeViewsList.filter(storeView => storeView.website_id === websiteId);

    return (
        <Component {...other}
                   storeViews={storeViews}/>
    );
}
