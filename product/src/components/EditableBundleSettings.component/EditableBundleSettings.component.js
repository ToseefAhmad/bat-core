// Overrided from a future LUFT version. Should be removed after LUFT update to 2.2.0 version
import React, {
    useCallback,
    useEffect,
    useMemo
} from 'react';
import {useIntl} from 'react-intl';

import {
    EditableBundleOptionComponent,
    ProductQtyComponent,
    useProductContextField,
    useProductState
} from '@luft/product';
import {EditableBundlePriceContainer} from '@luft/product/src/components/EditableBundlePrice.container';
import type {BundleOption, BundleOptionInput} from '@luft/types';
import {BundleInputTypeValues} from '@luft/types';

import messages from '@luft/product/src/components/EditableBundleSettings.component/resources/messages';

/**
 * Get bundle options, look for products that needs to be preselected
 * and return an array that contain information about this preselected values.
 * The array is used later as graphql input to find out total price for a bundle configuration
 * and to add bundle product to a cart.
 *
 * @param {BundleOption[]} options
 * @returns {BundleOptionInput[]}
 */
const getInitialEditableBundleOptions = options => options?.map(option => {
    let defaultProductIds;
    if (option.required && option.products.length === 1) {
        defaultProductIds = [option.products[0].id];
    } else {
        defaultProductIds = option.products
            .filter(({is_default}) => is_default)
            .map(({id}) => id);
    }

    if (!defaultProductIds.length) return;
    switch (option.input_type) {
        case BundleInputTypeValues.CHECKBOX:
        case BundleInputTypeValues.MULTISELECT:
            return {
                option_id: option.id,
                values: defaultProductIds,
                quantity: 1
            };
        case BundleInputTypeValues.DROPDOWN:
        case BundleInputTypeValues.RADIO:
        default:
            return {
                option_id: option.id,
                values: defaultProductIds.slice(0, 1),
                quantity: option.products.find(({id}) => id === defaultProductIds[0])?.qty
            };
    }
}).filter(Boolean);

type Props = {
    /**
     * An object of current product
     */
    bundledProducts?: BundleOption[],
    /**
     * An array with 'EDITABLE_BUNDLE' selected options
     */
    editableBundleOptions?: BundleOptionInput[],
    /**
     * A function to update 'EDITABLE_BUNDLE' info
     */
    onEditableBundleOptionsChange: (BundleOptionInput[]) => void,
};

/**
 * A component displays list of bundled product options and total sum of the selected products.
 * The visibility switches in `EditableBundlePrimaryInfo.component`. All component's properties can
 * be obtained from the ProductContext.
 */
export function EditableBundleSettingsComponent(
    {
        bundledProducts,
        editableBundleOptions: editableBundleOpts,
        onEditableBundleOptionsChange
    }: Props) {
    const $bundledProducts = useProductContextField('originalProduct.bundled_products', bundledProducts);
    const $inStock = useProductContextField('originalProduct.inventory.in_stock');
    const [$editableBundleOpts, setEditableBundleOpts] = useProductState('editableBundleOptions', editableBundleOpts);
    const {formatMessage} = useIntl();

    const selectedOptionsMap = useMemo(() => $editableBundleOpts?.reduce((memo, selectedOption) => ({
        ...memo,
        [selectedOption.option_id]: selectedOption
    }), {}), [$editableBundleOpts]);

    const handleOptionChange = useCallback((newOptionInput, newOptionId) => {
        const newOptions = [...($editableBundleOpts?.filter(({option_id}) => option_id !== newOptionId) || [])];
        if (newOptionInput) {
            newOptions.push(newOptionInput);
        }
        if (onEditableBundleOptionsChange) onEditableBundleOptionsChange(newOptions);
        setEditableBundleOpts(newOptions);
    }, [setEditableBundleOpts, $editableBundleOpts, onEditableBundleOptionsChange]);

    // initial groupSet state based on data from product
    useEffect(() => {
        if ($editableBundleOpts || !$bundledProducts) return;
        const initialEditableBundleOptions = getInitialEditableBundleOptions($bundledProducts);
        if (onEditableBundleOptionsChange) onEditableBundleOptionsChange(initialEditableBundleOptions);
        setEditableBundleOpts(initialEditableBundleOptions);
    }, [$editableBundleOpts, $bundledProducts, onEditableBundleOptionsChange, setEditableBundleOpts]);

    if (!$editableBundleOpts) return null;

    return !!$bundledProducts && !!$inStock && (
        <form className="editable-bundle-settings-component">
            <div className="editable-bundle-settings-component-options">
                {$bundledProducts?.map(option => (
                    <EditableBundleOptionComponent key={option.id}
                                                   option={option}
                                                   selectedOption={selectedOptionsMap?.[option.id]}
                                                   onChange={handleOptionChange}/>
                ))}
            </div>
            <p className="editable-bundle-settings-component-required-hint">
                {formatMessage(messages.required_fields)}
            </p>
            <div className="editable-bundle-settings-component-price">
                <EditableBundlePriceContainer/>
            </div>
            <div className="editable-bundle-settings-component-qty-wrapper">
                <ProductQtyComponent/>
            </div>
        </form>
    );
}
