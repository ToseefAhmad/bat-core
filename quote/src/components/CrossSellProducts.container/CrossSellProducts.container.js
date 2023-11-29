import React, {useMemo, useEffect} from 'react';
import type {ComponentType} from 'react';

import {
    ErrorComponent,
    LoaderComponent
} from '@luft/common';

import {CrossSellProductsComponent} from '../CrossSellProducts.component';
import {useCrossSellProductsQuery} from '../../hooks';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: ComponentType<{}>,
    /**
     * Number of items in cart
     */
    cartTotalItems: number
};

export function CrossSellProductsContainer(props: Props) {
    const {
        as: Component = CrossSellProductsComponent,
        cartTotalItems,
        ...other
    } = props;

    const {
        data,
        loading,
        error,
        refetch: refetchCrossSellProducts
    } = useCrossSellProductsQuery();

    const crossSellProducts = data?.cart?.crosssell_products_list;

    useEffect(() => {
        refetchCrossSellProducts();
    }, [cartTotalItems]);

    // Only 4 cross-sell items should be displayed in the block
    const products = useMemo(() => {
        if (!crossSellProducts) return [];

        return crossSellProducts.slice(0, 4);
    }, [crossSellProducts]);

    if (loading) return <LoaderComponent/>;
    if (error) return <ErrorComponent error={error}/>;

    return (
        <Component {...other}
                   products={products}/>
    );
}
