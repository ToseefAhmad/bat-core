import {useLocation} from 'react-router-dom';
import {useQuery} from '@luft/apollo';
import {replaceUrl} from '@luft/url-resolver/src/utils';

import URL_RESOLVER_QUERY from '../graphql/queries/UrlResolver.graphql';

export function useUrlResolver(url, options = {}, query = URL_RESOLVER_QUERY) {
    const {pathname} = useLocation();

    const {fetchPolicy = 'network-only'} = options;
    const resultUrl = url || pathname;

    return useQuery(query, {
        variables: {url: replaceUrl(resultUrl)},
        fetchPolicy,
        ...options
    });
}
