import {hasData} from '@luft/apollo';
import {useStoreConfigQuery} from '@luft/common';

// PageNameProp should be a string that could includes names of pages like 'index', 'post', 'category' ets.
type PageNameProp = 'index' | 'post' | 'category' | 'author';

export function useBlogCanonicalUrlOnPage(pageName: PageNameProp) {
    const q = useStoreConfigQuery();

    if (!hasData(q)) {
        return null;
    }

    const blogPagesWithUrl = q.data.storeConfig?.mfblog_seo_use_canonical_meta_tag_for;
    return blogPagesWithUrl?.includes('all') || blogPagesWithUrl?.includes(pageName);
}
