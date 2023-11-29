import React, {
    useMemo,
    useEffect,
    useRef
} from 'react';
import {
    isEmpty,
    isEqual
} from 'lodash';

import {ErrorComponent, NoCacheComponent} from '@luft/common';
import {ProductListProvider} from '@luft/product';
import {useCategoryProductsQuery} from '@luft/catalog';
import type {FilterInput, SortInput} from '@luft/types';

import {trackCategoryPageVisit} from '../../../../data-layer';

type Props = {
    /**
     * Category ID
     */
    categoryId: string | number,
    /**
     * Filter inputs
     */
    filterInputs: FilterInput[],
    /**
     * Sort input
     */
    sortInput: SortInput,
    /**
     * A callback on filter change
     */
    onFilterInputsChange?: (filters: FilterInput[]) => void,
    /**
     * A callback on filter update
     */
    onFilterInputsUpdate?: (filters: FilterInput[]) => void,
    /**
     * A callback on filter apply
     */
    onFilterInputsApply?: (filters: FilterInput[]) => void,
    /**
     * A callback on filter clear
     */
    onFilterInputsClear?: Function,
    /**
     * A callback on sort change
     */
    onSortInputChange?: (sort: SortInput) => any,
    /**
     * A callback on sort clear
     */
    onSortInputClear?: Function,
    /**
     * A callback on page loaded
     */
    onPageLoaded?: () => void,
    /**
     * Presentation component, that will consume data and callbacks from this container component
     */
    as?: React.Component,
    /**
     * Prop, that identifies component, used for presentation of loading state
     */
    loadingAs?: React.Component,
    /**
     * Prop, that identifies component, used for presentation of error state
     */
    errorAs?: React.Component,
    /**
     * Prop, that identifies component, used for presentation when offline and not enough cached data
     */
    noCacheAs?: React.Component,
    /**
     * Flag, used to identify handling of loading, error and no-cache state by container
     */
    awaitResult?: boolean,
    /**
     * Sorting option is switched off
     */
    isSortingSwitchOff?: boolean,
    /**
     * Filtering option is switched off
     */
    isFiltersSwitchOff?: boolean,
    /**
     * Children element(s). will be used instead `as` prop if not null
     */
    children?: React.ReactNode
}

/**
 * @module @luft/catalog
 * @scope @luft/catalog
 * @exports CategoryProductsContainer
 * @function CategoryProductsContainer
 * @kind Container
 *
 * @description
 * Container component, used to get list of products based on category identifier, filters and sorting params
 */

/**
 * @typedef {React.Component} CategoryProductsPresentationComponent
 * @kind Component
 *
 * @description
 * Presentation component, that consumes data from CategoryProductsContainer
 *
 * @summary
 * List of props, passed to presentation component by container
 *
 * @param {String} categoryId - Category ID
 * @param {Array} products - List of products
 * @param {Array} appliedFilters - List of applied filters
 * @param {Object} appliedSort - Applied sorting params
 * @param {Array} filterInputs - Filter input is used as an argument for search query
 * @param {String} title - Title of component
 * @param {Number} total - Total count of products
 * @param {Boolean} canLoadMore - Flag, that identifies remaining number of products for pagination
 * @param {Boolean} isLoading - Is loading status
 * @param {Boolean} isLoadingMore - Loading state, usually identifies fetch pagination items processing
 * @param {Function} onLoadMore - Callback on load more items
 */
export function CategoryProductsContainer(
    {
        categoryId,
        filterInputs,
        sortInput,
        onPageLoaded: onPageCompleted,
        as: Component,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = false,
        children,
        ...other
    }: Props) {
    const q = useCategoryProductsQuery(categoryId, filterInputs, sortInput, {skip: !sortInput, onPageCompleted});

    const {
        data,
        previousData,
        lastPage,
        loading,
        loadingMore,
        online,
        fetchNextPage,
        pages
    } = q;

    const category = data?.category || previousData?.category;
    const total = category?.products?.total;

    const currentProductsRef = useRef([]);

    const hasMore = useMemo(() => {
        const lastPageProducts = lastPage?.data?.category?.products;
        return !!lastPageProducts && lastPageProducts.start + lastPageProducts.count < total;
    }, [lastPage, total]);

    const products = useMemo(() => pages?.reduce((memo, page) => {
        const productItems = page?.data?.category?.products?.items || [];
        return [...memo, ...productItems];
    }, []), [pages]);

    const isProductsChanged = useMemo(() => {
        if (!isEmpty(products) && !isEqual(products, currentProductsRef.current)) {
            currentProductsRef.current = products;
            return true;
        }
        return false;
    }, [products]);

    useEffect(() => {
        if (!isProductsChanged) return;

        trackCategoryPageVisit(products);
    }, [isProductsChanged]);

    if (awaitResult && q.dataError) return Error && <Error error={q.error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const appliedFilters = category?.products?.applied_filters;
    const appliedSort = category?.products?.applied_sort;

    // TODO: Backward compatibility usage:
    const title = category?.name;

    return (
        <ProductListProvider category={category}
                             products={products}
                             appliedFilters={appliedFilters}
                             appliedSort={appliedSort}
                             isLoading={loading}
                             isLoadingMore={loadingMore && online}
                             hasMore={hasMore}
                             onLoadMore={fetchNextPage}>
            {children || (!!Component && (
                <Component {...other}
                           categoryId={categoryId}
                           products={products}
                           appliedFilters={appliedFilters}
                           appliedSort={appliedSort}
                           filterInputs={filterInputs}
                           title={title}
                           total={total}
                           canLoadMore={hasMore}
                           isLoading={loading}
                           isLoadingMore={loadingMore && online}
                           onLoadMore={fetchNextPage}/>
            ))}
        </ProductListProvider>
    );
}
