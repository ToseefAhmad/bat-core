import React from 'react';

import {
    ErrorComponent,
    NoCacheComponent,
    LoaderComponent,
    useStoreConfigQuery
} from '@luft/common';

import {BlogPostComponent} from '../BlogPost.component';
import {useBlogPostQuery} from '../../hooks';

type Props = {
    blogId: string,
    as?: React.Component,
    loadingAs?: React.Component,
    errorAs?: React.Component,
    noCacheAs?: React.Component,
    awaitResult?: boolean
};

export function BlogPostContainer(props: Props) {
    const {
        blogId,
        as: Component = BlogPostComponent,
        errorAs: Error = ErrorComponent,
        loadingAs: Loading = LoaderComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        ...other
    } = props;

    const q = useBlogPostQuery(blogId);
    const {data, loading: storeConfigLoading, error: storeConfigError} = useStoreConfigQuery();

    if (awaitResult && (q.loading || storeConfigLoading)) return Loading && <Loading/>;
    if (awaitResult && (q.dataError || storeConfigError)) return Error && <Error error={q.error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const blog = q?.data?.blogPost;
    const blogConfig = data?.storeConfig;
    const isSocialSharingEnabled = blogConfig?.mfblog_social_add_this_enabled === '1' && blog?.enable_social_sharing;
    const {
        mfblog_social_add_this_pubid: addThisId,
        mfblog_social_add_this_language: addThisLang
    } = blogConfig || {};

    return (
        <Component {...other}
                   blog={blog}
                   isRelatedPostsEnabled={blogConfig?.mfblog_post_view_related_posts_enabled}
                   blogPageRoute={blogConfig?.mfblog_permalink_route}
                   isSocialSharingEnabled={isSocialSharingEnabled}
                   addThisId={addThisId}
                   addThisLang={addThisLang}/>
    );
}
