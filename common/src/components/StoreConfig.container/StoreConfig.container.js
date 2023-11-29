import React from 'react';
import type {ComponentType} from 'react';

import {useStoreConfigQuery} from '@luft/common';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as: ComponentType<{}>,
    /**
     * Prop, that identifies component, used for presentation of loading state
     */
    loadingAs?: ComponentType<{}>,
    /**
     * Flag, used to identify handling of loading state by container
     */
    awaitResult?: boolean
};

export function StoreConfigContainer({
    as: Component,
    loadingAs: Loading = null,
    awaitResult = true,
    ...other
}: Props) {
    const q = useStoreConfigQuery();

    if (awaitResult && q.loading) return Loading && <Loading/>;

    const storeConfig = q.data?.storeConfig;

    return (
        <Component {...other}
                   storeConfig={storeConfig}
                   error={q.error}/>
    );
}
