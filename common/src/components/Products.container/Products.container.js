import React from 'react';

import {useCategoryProductsQuery} from '@luft/catalog';
import {useUrlResolver} from '@luft/url-resolver';

type Props = {
    url?: string,
    className?: string,
    categoryId: string,
    filterInputs: Object[],
    count: number,
    as?: React.Component,
    loadingAs?: React.Component,
    errorAs?: React.Component,
    noCacheAs?: React.Component,
    awaitResult?: boolean
};

export function ProductsContainer(props: Props) {
    const {
        url,
        count = 20,
        as: Component = null,
        loadingAs: Loading = null,
        errorAs: Error = null,
        noCacheAs: NoCache = null,
        awaitResult = true,
        ...other
    } = props;

    const urlResolverQ = useUrlResolver(url, {skip: props.categoryId || !url});
    const categoryId = props.categoryId || urlResolverQ.data?.urlResolver?.entity_id;
    const q = useCategoryProductsQuery(categoryId, [], null, {skip: !categoryId, pageSize: count});

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const products = q.pages.reduce((memo, page) => {
        const productItems = page?.data?.category?.products?.items || [];
        return [...memo, ...productItems];
    }, []);
    const title = q.data?.category?.name;

    return Component && (
        <Component {...other}
                   q={q}
                   title={title}
                   products={products}/>
    );
}
