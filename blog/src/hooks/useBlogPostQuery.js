import {useQuery} from '@luft/apollo';

import BLOG_POST_QUERY from '../graphql/queries/BlogPost.query.graphql';

export function useBlogPostQuery(
    blogId,
    options = {},
    query = BLOG_POST_QUERY
) {
    const {
        variables,
        ...opts
    } = options;

    return useQuery(query, {
        variables: {
            ...variables,
            id: blogId
        },
        ...opts
    });
}
