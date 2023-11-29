import React from 'react';
import type {ComponentType} from 'react';

import {useRecentViewedProducts} from '@luft/catalog/src/hooks';

import {RecentViewedProductComponent} from '../RecentViewedProduct.component';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: ComponentType<{}>,
    /**
     * Callback for on product click
     */
    onProductClick?: Function
}

export function RecentViewedProductContainer(props: Props) {
    const {
        as: Component = RecentViewedProductComponent,
        onProductClick,
        ...other
    } = props;

    const [products, loading] = useRecentViewedProducts();

    return (
        <Component {...other}
                   loading={loading}
                   recentViewedList={products}
                   onProductClick={onProductClick}/>
    );
}
