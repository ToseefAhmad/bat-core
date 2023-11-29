import React, {useEffect, useCallback} from 'react';
import {
    noop,
    isUndefined,
    isEmpty
} from 'lodash';
import {useIntl} from 'react-intl';
import classnames from 'classnames';

import {ButtonComponent, useResolutions} from '@luft/common';
import {ProductListComponent} from '@luft/product';
import {RecentSearchesContainer} from '@luft/catalog';
import type {Product} from '@luft/types';

import messages from '@luft/catalog/src/components/SearchModal.component/resources/messages';

import {RecentViewedProductContainer} from '../RecentViewedProduct.container';
import {RecommendedCategoryContainer} from '../RecommendedCategory.container';
import {useLockBodyScroll, useCustomVhUnit} from '../../../../common';
import {trackSearch} from '../../../../data-layer';

type Props = {
    search: string,
    searchProductCount?: number,
    minSymbolsToSearch?: number,
    isAuthorized?: boolean,
    loading?: boolean,
    productList?: Product[],
    productTotal?: number,
    userId?: string,
    recommendedCategoryId?: number,
    onSearch: (search: string) => void,
    onNavigateSearchResults?: (search: string) => void,
    onRecentSearchItemClick: (search: string) => void,
    onReset: (e?: React.SyntheticEvent) => void,
    onClose: () => void
};

export function SearchModalComponent(props: Props) {
    const {
        search,
        searchProductCount = 6,
        minSymbolsToSearch = 3,
        isAuthorized,
        loading,
        productList,
        productTotal = 0,
        userId,
        recommendedCategoryId,
        onSearch,
        onNavigateSearchResults,
        onRecentSearchItemClick,
        onReset,
        onClose
    } = props;

    const {
        isSMdown,
        isSM,
        isXS
    } = useResolutions();
    const {formatMessage} = useIntl();

    const isAllowedSearch = search.length >= minSymbolsToSearch;
    const canShowMore = !!productList && productList.length > searchProductCount && isAllowedSearch;
    // Avoid body scrolling (instead of product list in search modal) on mobile
    const isLockedBodyScroll = isXS && isAllowedSearch;

    useLockBodyScroll(isLockedBodyScroll);
    useCustomVhUnit();

    useEffect(() => {
        if (search.length < minSymbolsToSearch) return;

        onSearch(search);
    }, [search, minSymbolsToSearch, onSearch]);

    useEffect(() => {
        if (!productList) return;

        trackSearch(search, productList.length, userId);
    }, [productList]);

    const onAddToWishlist = useCallback(() => {
        if (isAuthorized) return;

        onReset();
    }, [isAuthorized, onReset]);

    const onSearchPage = useCallback(() => {
        if (onReset) onReset();
        if (onNavigateSearchResults) onNavigateSearchResults(search);
    }, [onReset, onNavigateSearchResults, search]);

    const colNumber = {sm: 6, md: 4};
    const isZeroResult = !isUndefined(productList) && isEmpty(productList);
    const resultsClassName = classnames('search-modal-component-results', {
        'search-modal-component-results-empty': isZeroResult,
        'search-modal-component-results-full': !isZeroResult
    });

    return (
        <div className="search-modal-component">
            <div className="search-modal-component-content">
                {isAllowedSearch ? (
                    <div className={resultsClassName}>
                        <div className="search-modal-component-results-title">
                            {formatMessage(messages.related_products)}
                            {!loading && (
                                <span className="search-modal-component-results-title-quantity">
                                    {`(${productTotal})`}
                                </span>
                            )}
                        </div>
                        <div className="search-modal-component-results-list">
                            <ProductListComponent isLoading={loading}
                                                  products={productList?.slice(0, searchProductCount)}
                                                  onProductClick={onReset}
                                                  onAddToWishlist={onAddToWishlist}
                                                  col={colNumber}/>
                            {isZeroResult && !!recommendedCategoryId && (
                                <RecommendedCategoryContainer recommendedCategoryId={recommendedCategoryId}
                                                              numberVisible={isSM ? 3 : isSMdown ? 2 : 5}/>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="search-modal-component-results search-modal-component-recent-results search-modal-component-results-full">
                        <RecentSearchesContainer onRecentSearchItemClick={onRecentSearchItemClick}/>
                        <RecentViewedProductContainer onProductClick={onReset}
                                                      onAddToWishlist={onAddToWishlist}
                                                      productListAs={ProductListComponent}
                                                      col={{sm: 6}}/>
                    </div>
                )}
                {canShowMore && (
                    <div className="search-modal-component-more">
                        <ButtonComponent className="search-modal-component-more-button"
                                         variant="primary-link"
                                         type="button"
                                         onClick={onSearchPage}
                                         title={formatMessage(messages.show_all)}>
                            {formatMessage(messages.show_all)}
                        </ButtonComponent>
                    </div>
                )}
            </div>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div className="search-modal-component-overlay"
                 onClick={onClose}
                 onKeyPress={noop}/>
        </div>
    );
}
