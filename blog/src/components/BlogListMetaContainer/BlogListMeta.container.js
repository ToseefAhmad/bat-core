import React from 'react';

import {hasData} from '@luft/apollo';
import {
    MetaComponent,
    LoaderComponent,
    useStoreConfigQuery
} from '@luft/common';

import {useBlogCanonicalUrlOnPage} from '../../hooks';

export function BlogListMetaContainer(props: Props) {
    const {
        loadingAs: Loading = LoaderComponent,
        awaitResult = true,
        ...other
    } = props;

    const q = useStoreConfigQuery();
    const shouldUseCanonicalUrl = useBlogCanonicalUrlOnPage('index');

    if (!hasData(q)) {
        return null;
    }

    if (awaitResult && q.loading) return Loading && <Loading/>;

    const configData = q.data?.storeConfig;
    const meta = {
        meta_title: configData?.mfblog_index_page_meta_title,
        meta_keywords: configData?.mfblog_index_page_meta_keywords,
        meta_description: configData?.mfblog_index_page_meta_description
    };

    const og = shouldUseCanonicalUrl ? {
        url: configData?.mfblog_permalink_route
    } : {};

    return (
        <MetaComponent {...other}
                       meta={meta}
                       og={og}/>
    );
}
