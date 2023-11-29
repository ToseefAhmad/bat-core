import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';
import InfiniteScroll from 'react-infinite-scroller';

import {
    AlertComponent,
    LoaderComponent,
    LayoutWrapperComponent,
    LayoutRowComponent,
    LayoutColComponent
} from '@luft/common';
import {useProductListContextField, useProductRenderer} from '@luft/product';
import type {Product} from '@luft/types';

import {ProductsLoaderComponent} from '../ProductsLoader.component';
import {useStoreConfigQuery} from '../../../../common';
import messages from './resources/messages';
import type {ProductListContext} from '../../contexts';

type Props = {
    /**
     * Presentation component, that will consume data and callbacks
     */
    as?: React.Component,
    /**
     * Products list
     */
    products?: Product[] | ProductListContext.products,
    /**
     * Is loading status
     */
    isLoading?: boolean | ProductListContext.isLoading,
    /**
     * Is loading sort input status
     */
    isLoadingSort?: boolean,
    /**
     * A callback on load more items
     */
    onLoadMore?: () => Promise | ProductListContext.onLoadMore,
    /**
     * Flag, that identifies remaining number of products for pagination
     */
    canLoadMore?: boolean | ProductListContext.hasMore,
    /**
     * Loading state, usually identifies fetch pagination items processing
     */
    isLoadingMore?: boolean | ProductListContext.isLoadingMore,
    /**
     * Columns number per breakpoint
     */
    col?: { xs: number, sm: number, md: number, lg: number, xl: number },
    /**
     * Number of product placeholder loadings
     */
    placeholderItemsNumber?: number,
    /**
     * Allow to fill all of its available horizontal space
     */
    fluid?: boolean | 'sm' | 'md' | 'lg' | 'xl',
    /**
     * A callback, fired on product click
     */
    onProductClick?: (React.SyntheticEvent) => void,
    /**
     * Children element(s). will be used instead `as` prop if not null
     */
    children?: React.ReactNode
};

/**
 * Presentational component that displays list of products
 */
export function ProductListComponent(props: Props) {
    const ProductPreviewComponent = useProductRenderer('ProductPreviewComponent');

    const {
        as: Component = ProductPreviewComponent,
        products,
        isLoadingSort,
        isLoading,
        isLoadingMore,
        canLoadMore,
        onLoadMore,
        col = {xs: 6, md: 4, lg: 3},
        placeholderItemsNumber = 12,
        fluid = false,
        children,
        ...other
    } = props;

    const {formatMessage} = useIntl();
    const {data: storeConfigData} = useStoreConfigQuery();
    const $products = useProductListContextField('products', products);
    const $isLoading = useProductListContextField('isLoading', isLoading);
    const $isLoadingMore = useProductListContextField('isLoadingMore', isLoadingMore);
    const $hasMore = useProductListContextField('hasMore', canLoadMore);
    const $onLoadMore = useProductListContextField('onLoadMore', onLoadMore);

    const wishlistEnabled = storeConfigData?.storeConfig?.magento_wishlist_general_is_enabled === '1';

    const $loadMore = useCallback(() => {
        if (!$isLoadingMore && $hasMore && $onLoadMore) $onLoadMore();
    }, [$hasMore, $isLoadingMore, $onLoadMore]);

    if ($isLoading || isLoadingSort) {
        return (
            <ProductsLoaderComponent col={col}
                                     itemsNumber={placeholderItemsNumber}/>
        );
    }

    return (
        <LayoutWrapperComponent className="product-list-component"
                                fluid={fluid}>
            {$products?.length ? (
                // https://github.com/CassetteRocks/react-infinite-scroller/issues/214
                // TODO: use another lib or fix this one to wait for async load more funcs
                <InfiniteScroll loadMore={$loadMore}
                                hasMore={$hasMore}
                                initialLoad={false}
                                threshold={500}
                                loader={$isLoadingMore && (
                                    <LoaderComponent size="sm"
                                                     key="spinner"/>
                                )}>
                    <LayoutRowComponent key="row">
                        {$products.map(product => (
                            <LayoutColComponent {...col}
                                                key={product.id}>
                                {children || (!!Component && (
                                    <Component {...other}
                                               product={product}
                                               wishlistEnabled={wishlistEnabled}/>
                                ))}
                            </LayoutColComponent>
                        ))}
                    </LayoutRowComponent>
                </InfiniteScroll>
            ) : (
                <AlertComponent>
                    {formatMessage(messages.no_products)}
                </AlertComponent>
            )}
        </LayoutWrapperComponent>
    );
}
