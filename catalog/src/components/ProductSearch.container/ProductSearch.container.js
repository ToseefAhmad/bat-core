import React, {useRef, useMemo} from 'react';

import {ErrorComponent, NoCacheComponent} from '@luft/common';
import {ProductListProvider} from '@luft/product';
import {ProductSearchComponent, useProductSearchQuery} from '@luft/catalog';
import {useViewerQuery} from '@luft/user';
import type {FilterInput, SortInput} from '@luft/types';

import {trackSearch} from '../../../../data-layer';

type Props = {
    /**
     * The string by which the list of products is searched
     */
    search: string,
    /**
     * Filter inputs
     */
    filterInputs: FilterInput[],
    /**
     * Sort input
     */
    sortInput: SortInput,
    /**
     * Number of products for pagination
     */
    pageSize?: number,
    /**
     * A callback on filter clear
     */
    onFilterInputsClear?: () => void,
    /**
     * A callback on filter apply
     */
    onFilterInputsApply: (filters: FilterInput[]) => void,
    /**
     * A callback on filter change
     */
    onFilterInputsChange?: (filters: FilterInput[]) => void,
    /**
     * A callback on filter update
     */
    onFilterInputsUpdate?: (filters: FilterInput[]) => void,
    /**
     * A callback on sort change
     */
    onSortInputChange?: (sort: SortInput) => void,
    /**
     * A callback on sort clear
     */
    onSortInputClear?: () => void,
    /**
     * A callback on page loaded
     */
    onPageLoaded?: () => void,
    /**
     * Presentation component, that will consume data and callbacks from this container component
     */
    as?: React.Component,
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
    awaitResult: boolean,
    /**
     * Children element(s). will be used instead `as` prop if not null
     */
    children?: React.ReactNode
}

/**
 * @module @luft/catalog
 * @scope @luft/catalog
 * @exports ProductSearchContainer
 * @function ProductSearchContainer
 * @kind Container
 *
 * @description
 * Container component, used to get list of products based on search string, filters and sorting params
 */

/**
 * @typedef {React.Component} ProductSearchPresentationComponent
 * @kind Component
 *
 * @description
 * Presentation component, that consumes data from ProductSearchContainer
 *
 * @summary
 * List of props, passed to presentation component by container
 *
 * @param {Array} filters - List of filters
 * @param {Array} appliedFilters - List of applied filters
 * @param {Object} sort - Sort params
 * @param {Object} appliedSort - Applied sorting params
 * @param {Array} products - List of products
 * @param {Boolean} canLoadMore - Flag, that identifies remaining number of products for pagination
 * @param {Boolean} isLoading - Is loading status
 * @param {Boolean} isLoadingMore - Loading state, usually identifies fetch pagination items processing
 * @param {Function} onLoadMore - Callback on load more items
 * @param {Boolean} isSortingSwitchOff - Flag, that identifies if sorting option is switched off
 * @param {Boolean} isFiltersSwitchOff - Flag, that identifies if filtering option is switched off
 * @param {Function} onFilterInputsChange - Callback on filter change
 * @param {Function} onFilterInputsUpdate - Callback on filter update
 * @param {Function} onFilterInputsApply - Callback on filter apply
 * @param {Function} onFilterInputsClear - Callback on filter clear
 * @param {Function} onSortInputChange - Callback on sort change
 * @param {Function} onSortInputClear - Callback on sort clear
 * @param {String} search - The string by which the list of products is searched
 */
export function ProductSearchContainer(
    {
        search,
        filterInputs,
        sortInput,
        pageSize,
        onFilterInputsClear,
        onFilterInputsApply,
        onFilterInputsChange,
        onFilterInputsUpdate,
        onSortInputChange,
        onSortInputClear,
        onPageLoaded: onPageCompleted,
        as: Component = ProductSearchComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = false,
        children,
        ...other
    }: Props) {
    const q = useProductSearchQuery(search, filterInputs, sortInput, {skip: !sortInput, onPageCompleted});
    const {data: viewerData} = useViewerQuery();
    const productSearchRef = useRef(null);

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

    const productSearch = data?.productSearch || previousData?.productSearch;
    const total = productSearch?.total;

    const hasMore = useMemo(() => {
        const lastPageData = lastPage?.data?.productSearch;
        return !!lastPageData?.items && lastPageData.start + lastPageData.count < total;
    }, [lastPage, total]);

    const products = useMemo(() => pages?.reduce((memo, page) => {
        const productItems = page?.data?.productSearch?.items || [];
        return [...memo, ...productItems];
    }, []), [pages]);

    if (awaitResult && q.dataError) return Error && <Error error={q.error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const appliedFilters = productSearch?.applied_filters;
    const appliedSort = productSearch?.applied_sort;
    const userId = viewerData?.viewer?.user?.id;

    // TODO: Backward compatibility usage:
    const filters = productSearch?.filters;
    const sorts = productSearch?.sorts;

    // TODO: This needs a rework
    if (!productSearchRef.current && productSearch) {
        trackSearch(search, total, userId);
        productSearchRef.current = productSearch;
    }

    return (
        <ProductListProvider products={products}
                             search={productSearch}
                             appliedFilters={appliedFilters}
                             appliedSort={appliedSort}
                             isLoading={loading}
                             isLoadingMore={loadingMore && online}
                             hasMore={hasMore}
                             onLoadMore={fetchNextPage}>
            {children || (!!Component && (
                <Component {...other}
                           products={products}
                           search={search}
                           filterInputs={filterInputs}
                           filters={filters}
                           appliedFilters={appliedFilters}
                           sorts={sorts}
                           appliedSort={appliedSort}
                           total={total}
                           canLoadMore={hasMore}
                           isLoading={loading}
                           isLoadingMore={loadingMore && online}
                           onLoadMore={fetchNextPage}/>
            ))}
        </ProductListProvider>
    );
}
