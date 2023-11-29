import {useEffect} from 'react';
import {useLocation} from 'react-router';

import {useViewerQuery} from '@luft/user';
import {useStoreConfigQuery} from '@luft/common';

import {trackPageVisit} from '../../utils';

export function DataLayerPageVisitContainer() {
    const {pathname} = useLocation();
    const {data: storeConfigData} = useStoreConfigQuery();
    const {data: viewerData} = useViewerQuery();

    const timezone = storeConfigData?.storeConfig?.timezone;
    const userId = viewerData?.viewer?.user?.id;

    // Track on every single page
    useEffect(() => {
        trackPageVisit({userId, pathname, timezone});
    }, [userId, pathname, timezone]);

    return null;
}
