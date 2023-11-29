import React, {CSSProperties} from 'react';
import classnames from 'classnames';

import {useProductListByIds} from '@luft/catalog';
import {ProductGridComponent} from '@luft/widget';
import {useResolutions} from '@luft/common';

import {ProductListSliderComponent} from '../../../../product';

import '@luft/widget/src/components/ProductGrid.component/index.scss';
import '@luft/product/src/components/ProductSlider.component/index.scss';

type Props = {
    /**
     * List of Product ids to be loaded
     */
    ids: string[],
    /**
     * Should Products be represented as carousel or as grid
     */
    appearance?: 'carousel' | 'grid',
    /**
     * if carousel should be in infinite loop
     */
    infinite?: boolean,
    /**
     * if carousel should have arrows
     */
    arrows?: boolean,
    /**
     * if carousel should have pagination elements at the bottom
     */
    dots?: boolean,
    /**
     * React CSS Properties Object
     */
    style?: CSSProperties,
    /**
     * custom className
     */
    className?: string,
};

export function ProductsContentType(
    {
        ids,
        appearance,
        infinite,
        arrows,
        dots,
        style,
        className,
        ...other
    }: Props) {
    const {isSMdown} = useResolutions();
    const {data} = useProductListByIds(ids, {skip: !ids?.length});

    const isCarousel = appearance === 'carousel';
    const Component = isCarousel ? ProductListSliderComponent : ProductGridComponent;
    const numberVisible = isCarousel ? (isSMdown ? 2 : 4) : data?.products?.length;

    if (!ids?.length || !data?.products?.length) return null;

    return (
        <div className={classnames('products-content-type', className)}
             style={style}>
            <Component {...other}
                       products={data?.products}
                       numberVisible={numberVisible}
                       infiniteLoop={infinite}
                       showArrows={arrows}
                       showDots={dots}/>
        </div>

    );
}
