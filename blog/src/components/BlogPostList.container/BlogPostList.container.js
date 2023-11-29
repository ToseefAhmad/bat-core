import React from 'react';

import {
    ErrorComponent,
    NoCacheComponent,
    LoaderComponent,
    useStoreConfigQuery
} from '@luft/common';

import {BlogPostListComponent} from '../BlogPostList.component';
import {useBlogPostsQuery} from '../../hooks';
import {useGetCurrentPage} from '../../../../common/index';

type Props = {
    as?: React.Component,
    loadingAs?: React.Component,
    errorAs?: React.Component,
    noCacheAs?: React.Component,
    awaitResult?: boolean,
    isBlogWidget?: boolean
};

const POST_SORT_OPTIONS = {
    0: {sortFiled: 'publish_time', sort: ['DESC']},
    1: {sortFiled: 'position', sort: ['ASC']},
    2: {sortFiled: 'title', sort: ['ASC']}
};

const WIDGET_SORT_OPTIONS = {
    sortFiled: 'publish_time',
    sort: ['DESC']
};

export function BlogPostListContainer(props: Props) {
    const {
        as: Component = BlogPostListComponent,
        errorAs: Error = ErrorComponent,
        loadingAs: Loading = LoaderComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        isBlogWidget = false,
        ...other
    } = props;

    const {data} = useStoreConfigQuery();
    const {visiblePage} = useGetCurrentPage();
    const blogConfig = data?.storeConfig;
    const blogOptions = !isBlogWidget
        ? {
            allPosts: false,
            currentPage: visiblePage,
            pageSize: blogConfig?.mfblog_post_list_posts_per_page,
            ...POST_SORT_OPTIONS[blogConfig?.mfblog_index_page_posts_sort_by]
        }
        : WIDGET_SORT_OPTIONS;
    const skipPostsQuery = !blogConfig?.mfblog_post_list_posts_per_page && !blogConfig?.mfblog_permalink_route;
    const q = useBlogPostsQuery(blogOptions, {skip: skipPostsQuery});

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const blogs = q?.data?.blogPosts?.items;

    return (
        <Component {...other}
                   blogs={blogs}
                   currentPage={visiblePage}
                   blogsTotalCount={q?.data?.blogPosts?.total_count}
                   blogPageRoute={blogConfig?.mfblog_permalink_route}
                   pageTitle={blogConfig?.mfblog_index_page_title}
                   postsPerPage={blogConfig?.mfblog_post_list_posts_per_page}/>
    );
}
