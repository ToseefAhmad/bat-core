import React from 'react';

import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent
} from '@luft/common';
import {usePagesQuery} from '@luft/apollo';
import {useProductListContextField} from '@luft/product';
import type {ProductListContext} from '@luft/product';
import type {
    Filter,
    FilterInput,
    SortInput,
    Sort
} from '@luft/types';

import {useCategoryProductFiltersAndSortsQuery} from '../../hooks';

type Props = {
    /**
     * Category ID
     */
    categoryId: string,
    /**
     * Start of page
     */
    start?: number,
    /**
     * Size of page
     */
    count?: number,
    /**
     * Filter inputs
     */
    filterInputs?: FilterInput[],
    /**
     * Applied filters
     */
    appliedFilters?: Filter[] | ProductListContext.appliedFilters,
    /**
     * Sort input
     */
    sortInput?: SortInput | ProductListContext.appliedSort,
    /**
     * Applied sort
     */
    appliedSort?: Sort,
    /**
     * is product empty
     */
    hasProducts?: number,
    /**
     * View component
     */
    as?: React.Component,
    /**
     * Represent loader component
     */
    loadingAs?: React.Component,
    /**
     * Represent error component
     */
    errorAs?: React.Component,
    /**
     * No cache component
     */
    noCacheAs?: React.Component,
    /**
     * Await result
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
    onFilterInputsClear?: () => void,
    /**
     * A callback on sort change
     */
    onSortInputChange?: (sort: SortInput) => void,
    /**
     * A callback on sort clear
     */
    onSortInputClear?: () => void
}

export function CategoryProductFiltersAndSortsContainer(
    {
        categoryId,
        start = 0,
        count = usePagesQuery.DEFAULT_SIZE,
        filterInputs = [],
        appliedFilters,
        sortInput = [],
        appliedSort,
        as: Component = null,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = false,
        isSortingSwitchOff,
        isFiltersSwitchOff,
        ...other
    }: Props) {
    const $appliedFilters = useProductListContextField('appliedFilters', appliedFilters);
    const $appliedSort = useProductListContextField('appliedSort', appliedSort);

    const {
        data,
        loading,
        error,
        dataError,
        noCache
    } = useCategoryProductFiltersAndSortsQuery({
        variables: {
            id: categoryId,
            start,
            count,
            filters: filterInputs
        }
    });

    if (awaitResult && loading) return Loading && <Loading/>;
    if (awaitResult && dataError) return Error && <Error error={error}/>;
    if (awaitResult && noCache) return NoCache && <NoCache/>;

    const filters = data?.category?.products?.filters;
    const sorts = data?.category?.available_sort_by_sorts;
    const total = data?.category?.products?.total;

    return (!!total || loading) && (
        <Component isLoading={(!filters?.length || !sorts?.length) && loading}
                   filters={filters}
                   sorts={sorts}
                   appliedSort={$appliedSort}
                   appliedFilters={$appliedFilters}
                   filterInputs={filterInputs}
                   sortInput={sortInput}
                   {...other}/>
    );
}
