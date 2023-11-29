import React, {useCallback} from 'react';

import {ErrorComponent, useStoreConfigQuery} from '@luft/common';
import {useIsAuthorized, useViewerQuery} from '@luft/user';
import {useProductSearchLazyQuery, useAddNewRecentSearch} from '@luft/catalog';

import {SearchModalComponent} from '../SearchModal.component';

type Props = {
    /**
     * Search query
     */
    search: string | number,
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: React.Component,
    /**
     * Represent for error view
     */
    errorAs?: React.Component,
    /**
     * Await result
     */
    awaitResult?: boolean,
    /**
     * Callback after search
     */
    onSearch?: (search: string) => void
};

export function SearchModalContainer(props: Props) {
    const {
        search = '',
        as: Component = SearchModalComponent,
        errorAs: Error = ErrorComponent,
        awaitResult = false,
        onSearch,
        ...other
    } = props;

    const isAuthorized = useIsAuthorized();
    const [getProducts, {error, data: searchData, loading}] = useProductSearchLazyQuery();
    const addNewRecentSearch = useAddNewRecentSearch();
    const {data: storeConfigData} = useStoreConfigQuery();
    const {data: viewerData} = useViewerQuery();

    const handleSearch = useCallback(async (searchText) => {
        const resp = await getProducts({variables: {search: searchText}});
        // TODO: This function does not return a promise
        await addNewRecentSearch(searchText);
        if (onSearch) onSearch(searchText);

        return resp;
    }, [getProducts, addNewRecentSearch, onSearch]);

    if (awaitResult && error) return Error && <Error error={error}/>;

    const productList = searchData?.productSearch?.items;
    const productTotal = searchData?.productSearch?.total;
    const categoryId = storeConfigData?.storeConfig?.search_recommendation_category_id;
    const userId = viewerData?.viewer?.user?.id;

    return (
        <Component {...other}
                   search={search}
                   productList={productList}
                   productTotal={productTotal}
                   isAuthorized={isAuthorized}
                   loading={loading}
                   userId={userId}
                   recommendedCategoryId={categoryId}
                   onSearch={handleSearch}/>
    );
}
