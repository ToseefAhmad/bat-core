import React, {useEffect} from 'react';

import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent
} from '@luft/common';
import type {Product} from '@luft/types';

import {ProductProvider, useProductDetailQuery} from '@luft/product';

import {trackProductPageVisit} from '../../../../data-layer';

type Props = {
    /**
     * A Product Entity Id
     */
    productId: string | number,
    /**
     * A Product Entity, skips query execution if passed
     */
    product: Product,
    /**
     * A prop, that identifies component, used for data presentation
     * @deprecated - use children instead
     */
    as?: React.Component,
    /**
     * A representation for loading view
     */
    loadingAs?: React.Component,
    /**
     * A representation for error view
     */
    errorAs?: React.Component,
    /**
     * A representation for no cache view
     */
    noCacheAs?: React.Component,
    /**
     * An await result state
     */
    awaitResult?: boolean,
    /**
     * Children element(s). will be used instead `as` prop if not null
     */
    children?: React.ReactNode
}

export function ProductContainer(
    {
        productId: id,
        product: propProduct,
        as: Component,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        children,
        ...other
    }: Props) {
    const q = useProductDetailQuery(id, {skip: !!propProduct});
    const product = propProduct || q?.data?.product;

    useEffect(() => {
        if (!product?.id) return;

        trackProductPageVisit(product);
    }, [product]);

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    return (
        <ProductProvider product={product}
                         {...other}>
            {children || (!!Component && (
                <Component product={product}
                           {...other}/>
            ))}
        </ProductProvider>
    );
}
