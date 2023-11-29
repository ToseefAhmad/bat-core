import React from 'react';
import type {ComponentType} from 'react';

import {
    ErrorComponent,
    LoaderComponent
} from '@luft/common';
import {ProductListSliderComponent} from '@luft/product';
import {useCategoryProductsQuery} from '@luft/catalog';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: ComponentType<{}>,
    /**
     * Represent for loading view
     */
    loadingAs?: ComponentType<{}>,
    /**
     * Represent for error view
     */
    errorAs?: ComponentType<{}>,
    /**
     *  Recommended category ID
     */
    recommendedCategoryId?: number,
    /**
     * Await result
     */
    awaitResult?: boolean
};

export function RecommendedCategoryContainer(props: Props) {
    const {
        as: Component = ProductListSliderComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        recommendedCategoryId,
        awaitResult = true,
        ...other
    } = props;

    const q = useCategoryProductsQuery(recommendedCategoryId);

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.error}/>;

    const title = q?.data?.category?.name;
    const products = q?.data?.category?.products?.items;

    return (
        <Component {...other}
                   title={title}
                   className="recommended-category-component"
                   products={products}/>
    );
}
