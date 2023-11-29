import React from 'react';
import type {ComponentType} from 'react';
import {useIntl} from 'react-intl';

import {LoaderComponent} from '@luft/common';
import {ProductListSliderComponent} from '@luft/product';
import type {Product} from '@luft/types';

import messages from '@luft/catalog/src/components/RecentViewedProduct.component/resources/messages';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    productListAs?: ComponentType<{}>,
    /**
     * Products list
     */
    recentViewedList?: Product[],
    /**
     * Shows that data is loading
     */
    loading?: boolean,
    /**
     * Callback on product click
     */
    onProductClick?: Function
};

export function RecentViewedProductComponent(props: Props) {
    const {
        productListAs: Component = ProductListSliderComponent,
        recentViewedList = [],
        loading,
        onProductClick,
        ...other
    } = props;

    const {formatMessage} = useIntl();

    return (
        <div className="recent-viewed-product-component">
            <h4 className="recent-viewed-product-component-title">
                {formatMessage(messages.recent_viewed)}
            </h4>

            {loading ? (
                <LoaderComponent/>
            ) : (
                <Component {...other}
                           products={recentViewedList}
                           onProductClick={onProductClick}/>
            )}
        </div>
    );
}
