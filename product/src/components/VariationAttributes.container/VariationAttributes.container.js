import React, {
    useCallback,
    useEffect,
    useLayoutEffect
} from 'react';

import {
    ProductContext,
    useProduct,
    useProductContextField,
    useProductState
} from '@luft/product';
import type {
    Product,
    Variation,
    VariationAttribute,
    VariationValue
} from '@luft/types';

import {VariationAttributesComponent} from '../VariationAttributes.component';
import {useProductVariationLazyQuery} from '../../hooks';

type Props = {
    /**
     * Product Entity
     *
     * **Default value from ProductContext**
     */
    product?: Product,
    /**
     * Presentation component, that will consume data and callbacks from this container component
     */
    as?: React.Component,
    /**
     * A list of product variation attributes
     */
    variationAttributes?: VariationAttribute[],
    /**
     * Product variations
     */
    variations?: Variation[],
    /**
     * Product variation, used for 'CONFIGURABLE' products
     *
     * **Default value from ProductContext state**
     */
    variation?: Variation | ProductContext.productState.variation,
    /**
     * A callback when user pick variant of product
     */
    onVariationChange?: (VariationValue[] | null) => void,
    /**
     * A callback when user load product variation
     */
    onVariationLoad?: (any) => Variation | null
}

export function VariationAttributesContainer(
    {
        product,
        as: Component = VariationAttributesComponent,
        variationAttributes,
        variation,
        variations,
        onVariationChange,
        onVariationLoad,
        ...other
    }: Props) {
    const [, setContextProduct] = useProduct();
    const [$variation, setVariation] = useProductState('variation', variation);
    const $originalProduct = useProductContextField('originalProduct', product);
    const $variationAttributes = useProductContextField('originalProduct.variation_attributes', variationAttributes);
    const $variations = useProductContextField('originalProduct.variations', variations);

    const [loadVariation, {data, loading, variables}] = useProductVariationLazyQuery();

    const handleVariationChange = useCallback((variationValues) => {
        setVariation(null);
        if (onVariationChange) onVariationChange(variationValues);
        if (variationValues) {
            return loadVariation({variables: {id: $originalProduct?.id, variationValues}});
        }
    }, [$originalProduct?.id, setVariation, loadVariation, onVariationChange]);

    useLayoutEffect(() => {
        const variationProduct = data?.product?.variation;
        if (!variationProduct) return;
        if (onVariationLoad) onVariationLoad(variationProduct);
        setVariation({
            product: variationProduct,
            variation_values: variables?.variationValues
        });
    }, [setVariation, setContextProduct, onVariationLoad, variables?.variationValues, data?.product?.variation]);

    useEffect(() => {
        if ($variation === undefined) return;

        setContextProduct({...$originalProduct, ...$variation?.product});
    }, [setContextProduct, $originalProduct, $variation]);

    return !!$variationAttributes?.length && (
        <Component {...other}
                   loading={loading}
                   variationAttributes={$variationAttributes}
                   variations={$variations}
                   selectedVariations={$variation?.variation_values}
                   onVariationChange={handleVariationChange}/>
    );
}
