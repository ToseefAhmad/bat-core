import {noop} from 'lodash';

import {useQuery} from '@luft/apollo';
import {useUpdateUrlResolver} from '@luft/url-resolver';

import CMS_PAGE_QUERY from '@luft/cms/src/graphql/queries/CmsPage.graphql';

export function useCmsPageQuery(id, options = {}, query = CMS_PAGE_QUERY) {
    const updateUrlResolver = useUpdateUrlResolver();

    const {
        onCompleted = noop,
        ...opts
    } = options;

    return useQuery(query, {
        variables: {id},
        skip: !id,
        onCompleted: (data) => {
            onCompleted(data);
            updateUrlResolver(data?.cmsPage?.url_rewrite);
        },
        ...opts
    });
}
