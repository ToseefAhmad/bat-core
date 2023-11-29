import React from 'react';

import {useGetEnableCmsPages} from '@luft/cms';
import {useStoreConfigQuery} from '@luft/common';

import {CmsPageComponent} from '../CmsPage.component';
import {useCmsPageQuery} from '../../hooks';

type Props = {
    /**
     * Cms Page identifier
     */
    cmsPageId: string,
    /**
     * Presentation component, that will consume data and callbacks from this container component
     */
    as?: React.Component,
    /**
     * Represent for loading view
     */
    loadingAs?: React.Component,
    /**
     * Represent for error view
     */
    errorAs?: React.Component,
    /**
     * Represent for no cache view
     */
    noCacheAs?: React.Component,
    /**
     * Await result
     */
    awaitResult?: boolean
}

/**
 * @module @luft/cms
 * @scope @luft/cms
 * @exports CmsPageContainer
 * @function CmsPageContainer
 * @kind Container
 *
 * @description
 * Container component, used to load Cms page content based on ID and pass to component
 */

/**
 * @typedef {React.Component} CmsPagePresentationComponent
 * @kind Component
 *
 * @description
 * Presentation component, that consumes data from CmsPageContainer
 *
 * @summary
 * List of props, passed to presentation component by container
 *
 * @param {string} pageId - Page identifier
 * @param {CmsPage} cmsPage - CMS page contains HTML
 */
export function CmsPageContainer({
    cmsPageId,
    as: Component = CmsPageComponent,
    loadingAs: Loading = null,
    errorAs: Error = null,
    noCacheAs: NoCache = null,
    awaitResult = true,
    ...other
}: Props) {
    const enablePages = useGetEnableCmsPages();
    const q = useCmsPageQuery(cmsPageId, {skip: !enablePages});
    const {data: storeConfigData} = useStoreConfigQuery();

    if (!enablePages) return null;
    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const hreflangs = q.data?.cmsPage?.url_rewrite?.hreflangs;
    const mediaLinks = {
        youtube_url: storeConfigData?.storeConfig?.youtube_url,
        facebook_url: storeConfigData?.storeConfig?.facebook_url,
        instagram_url: storeConfigData?.storeConfig?.instagram_url
    };

    return (
        <Component {...other}
                   cmsPage={q?.data?.cmsPage}
                   hreflangs={hreflangs}
                   mediaLinks={mediaLinks}
                   pageId={cmsPageId}/>
    );
}
