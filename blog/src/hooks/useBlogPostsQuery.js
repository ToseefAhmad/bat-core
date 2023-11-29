import {usePagesQuery} from '@luft/apollo';

import BLOG_POSTS_QUERY from '../graphql/queries/BlogPosts.query.graphql';

export function useBlogPostsQuery(
    blogsListInputSettings = {},
    options = {},
    query = BLOG_POSTS_QUERY
) {
    const {
        variables,
        page,
        ...opts
    } = options;

    const {
        pageSize,
        currentPage,
        filter = {},
        sort = ['DESC'],
        sortFiled = 'publish_time',
        allPosts = true
    } = blogsListInputSettings;

    return usePagesQuery(query, {
        page,
        variables: {
            ...variables,
            allPosts,
            filter,
            sort,
            sortFiled,
            currentPage,
            pageSize
        },
        ...opts
    });
}
