import React from 'react';

import {ProductContext, useProductContextField} from '@luft/product';

type Props = {
    /**
     * Product name
     *
     * **Default value from ProductContext**
     */
    name?: string | ProductContext.product.name,
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: React.Component,
    /**
     * Color code, comes from product design attributes
     */
    colorCode?: string
};

/**
 * The component displays product name
 */
export function ProductTitleComponent(
    {
        name,
        colorCode,
        as: Component = 'h1'
    }: Props) {
    const $name = useProductContextField('product.name', name);
    const style = colorCode ? {color: colorCode} : {};

    return !!$name && (
        <Component className="product-title-component"
                   style={style}>
            {$name}
        </Component>
    );
}
