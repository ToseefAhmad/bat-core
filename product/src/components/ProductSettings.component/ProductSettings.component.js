import React, {useMemo} from 'react';

import {
    ConfigurableProductSettingsComponent,
    GiftCardProductSettingsComponent,
    GroupedProductSettingsComponent,
    ProductQtyComponent,
    useProductContextField,
    ProductContext
} from '@luft/product';
import {EditableBundleSettingsComponent} from '@luft/product/src/components/EditableBundleSettings.component';

import type {ProductType} from '@luft/types';
import {ProductTypeValues} from '@luft/types';

import {BundledProductSettingsComponent} from '../BundledProductSettings.component';
import {useIsEditableBundle} from '../../hooks';

type Props = {
    /**
     * A Product type to identify which settings component to use.
     *
     * **Default value from ProductContext**
     */
    productType?: ProductType | ProductContext.originalProduct.type
};

/**
 * Aggregation component for all supported product types.
 * Supports: CONFIGURABLE, BUNDLE, EDITABLE_BUNDLE, GIFTCARD, GROUPED, SIMPLE
 */
export function ProductSettingsComponent(
    {
        productType,
        ...other
    }: Props) {
    const $productType = useProductContextField('originalProduct.type', productType);
    const $bundledOptions = useProductContextField('product.bundled_products');
    const isEditableBundle = useIsEditableBundle($bundledOptions);

    const Component = useMemo(() => {
        switch ($productType) {
            case ProductTypeValues.CONFIGURABLE:
                return ConfigurableProductSettingsComponent;
            case ProductTypeValues.BUNDLE:
                return BundledProductSettingsComponent;
            case ProductTypeValues.EDITABLE_BUNDLE:
                // TODO: temporary fix to identify Editable Bundle product
                if (isEditableBundle) {
                    return EditableBundleSettingsComponent;
                }

                return BundledProductSettingsComponent;
            case ProductTypeValues.GIFTCARD:
                return GiftCardProductSettingsComponent;
            case ProductTypeValues.GROUPED:
                return GroupedProductSettingsComponent;
            case ProductTypeValues.SIMPLE:
            default:
                return ProductQtyComponent;
        }
    }, [$productType, isEditableBundle]);

    return <Component {...other}/>;
}
