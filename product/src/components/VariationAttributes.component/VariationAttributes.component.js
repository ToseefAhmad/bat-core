/* eslint-disable max-len */
import React, {
    useCallback,
    useEffect,
    useState,
    useRef
} from 'react';
import {
    reject,
    find,
    intersectionWith,
    isMatch
} from 'lodash';

import {LoaderComponent, useStoreConfigQuery} from '@luft/common';
import type {
    VariationAttribute,
    VariationAttributeValue,
    Variation,
    VariationValue
} from '@luft/types';

import {VariationAttributeComponent, useProductContextField} from '@luft/product';

/**
 * Get new set of selected variation values.
 * If selected value is already in the set, remove it.
 * If there is another value for selected attribute, replace with new one
 * If previously attribute value was not selected, add to set
 *
 * @param variationValues - current variation values set
 * @param attribute - attribute, that has this variation value
 * @param variationAttributeValue - selected attribute value
 * @returns {Array}
 */
const getSelectedVariationValues = (variationValues, attribute, variationAttributeValue) => {
    // find if variation value is already in the set
    const previousVariationValue = find(variationValues, {variation_attribute_id: attribute.variation_attribute_id});
    // generate new set based on previous set, but without previous value for the selected attribute if existed
    const newVariationValues = reject(variationValues, {variation_attribute_id: attribute.variation_attribute_id});
    // if there is a new value and it differs from previous, set it
    if (previousVariationValue?.value !== variationAttributeValue?.id) {
        newVariationValues.push({
            variation_attribute_id: attribute.variation_attribute_id,
            value: variationAttributeValue.id
        });
    }
    return newVariationValues;
};

const hasVariationValue = (item, attr, attrValue) => {
    const isMatchAttrId = item.variation_attribute_id === attr.variation_attribute_id;
    return isMatchAttrId && item.value === attrValue.id;
};

const isInitialVariationValueDisabled = (variations, attr, attrValue) => !variations?.some(variation => {
    const {variation_values} = variation;
    return variation_values.some(v => hasVariationValue(v, attr, attrValue));
});

const isVariationApplicable = (variation_values, attr, variationValues) => variationValues.every(item => {
    const {variation_attribute_id: id, value} = item;
    if (item.variation_attribute_id === attr.variation_attribute_id) {
        return true;
    }
    return variation_values.filter(v => v.variation_attribute_id === id && v.value === value).length;
});

const getValueVariationsBySelections = (variations, attr, attrValue, variationValues) => variations.filter(v => {
    const {variation_values} = v;
    if (isVariationApplicable(variation_values, attr, variationValues)) {
        return variation_values.filter(val => hasVariationValue(val, attr, attrValue)).length;
    }
    return false;
});

const getDisabledValuesIds = (attr, variations, variationValues) => attr.values.map(attrVal => {
    let isDisable = false;
    if (variationValues && variationValues.length) {
        const attrValueVariations = getValueVariationsBySelections(variations, attr, attrVal, variationValues);
        if (!attrValueVariations.length) {
            isDisable = true;
        }
    } else {
        isDisable = isInitialVariationValueDisabled(variations, attr, attrVal);
    }

    return isDisable ? attrVal.id : '';
});

// List of attributes names with associated array of disabled variation value IDs
const getAttrsWithDisabledValues = (attributes, variations, variationValues) => attributes?.reduce((memo, attr) => {
    const disabledValuesIds = getDisabledValuesIds(attr, variations, variationValues).filter(Boolean);
    return {
        ...memo,
        [attr.variation_attribute_id]: disabledValuesIds
    };
}, {});

/**
 * gets variation for selected set of variation values if there is a possible match
 *
 * @param variations: Variation[]
 * @param variationValues: VariationValue[]
 */
const getVariationForVariationValues = (variations, variationValues) => variations.find(({variation_values}) => {
    // Run through each variation, and take it's variation values
    // get the intersection by main set of values
    const intersection = intersectionWith(variation_values, variationValues, isMatch);
    // if intersection is same length, then we have fully matching set for variation
    return intersection.length === variation_values.length;
});

type Props = {
    /**
     * Loading state, identifies loading product variation information
     */
    loading?: boolean,
    /**
     * A list of product variation attributes
     */
    variationAttributes: VariationAttribute[],
    /**
     * Product variations
     */
    variations: Variation[],
    /**
     * A list of selected variation values
     */
    selectedVariations?: VariationValue[],
    /**
     * A callback when user select variation value
     */
    onVariationAttributeSelect?: (VariationAttribute, VariationAttributeValue) => void,
    /**
     * A callback that informing variation value set change
     */
    onVariationValuesChange?: (VariationValue | null) => void,
    /**
     * A callback that informing new variation value set should change the variation
     */
    onVariationChange?: (VariationValue | null) => void
};

/**
 * The component displays product variation attributes.
 */
export function VariationAttributesComponent(
    {
        loading,
        variationAttributes,
        variations,
        selectedVariations,
        onVariationAttributeSelect,
        onVariationValuesChange,
        onVariationChange
    }: Props) {
    const $originalProductId = useProductContextField('originalProduct.id');
    const [variationValues, setVariationValues] = useState(selectedVariations);
    const isFirstRun = useRef(true);
    const {data: storeConfigData} = useStoreConfigQuery();
    const isProductAlertEnabled = storeConfigData?.storeConfig?.is_product_alert_stock_enabled;

    const disabledAttrsMap = getAttrsWithDisabledValues(variationAttributes, variations, variationValues);

    const getVariationValue = (variation_attribute_id) => find(variationValues, {variation_attribute_id});

    const onValueSelect = useCallback((attribute, variationAttributeValue) => {
        // callback informing variation value select
        if (onVariationAttributeSelect) onVariationAttributeSelect(attribute, variationAttributeValue);

        // get new Variation Value Set
        const opaqueVariationValues = getSelectedVariationValues(variationValues, attribute, variationAttributeValue);
        // get variation for variation values if possible
        const variation = getVariationForVariationValues(variations, opaqueVariationValues);

        // a small optimization to keep cache clean, we always try to return variation values
        // in the order of declaration in variation itself
        // for example if we select color and size, variation values can be:
        // [color, size] or [size, color] depending on selection order.
        // we would prefer to always have it in order of variation.
        // So we check if current set matches any from variations available and if there is a match,
        // use array from variation.
        const originalVariationValues = variation?.variation_values
            .map(({variation_attribute_id, value}) => ({variation_attribute_id, value}));

        const newVariationValues = originalVariationValues || opaqueVariationValues;
        const isVariationEnabled = variation || isProductAlertEnabled;
        setVariationValues(newVariationValues);
        // callback informing variation value set change
        if (onVariationValuesChange) onVariationValuesChange(newVariationValues);
        // callback informing new variation value set should change the variation
        if (isVariationEnabled && onVariationChange) {
            onVariationChange(newVariationValues);
        } else if (onVariationChange) {
            onVariationChange(null);
        }
    }, [
        isProductAlertEnabled,
        onVariationAttributeSelect,
        variationValues,
        variations,
        setVariationValues,
        onVariationValuesChange,
        onVariationChange
    ]);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        setVariationValues(null);
    }, [$originalProductId]);

    return !!variationAttributes?.length && (
        <div className="variation-attributes-component">
            {loading && <LoaderComponent type="overlay"/>}
            {variationAttributes.map(variationAttribute => {
                const {variation_attribute_id} = variationAttribute;
                const disabledValue = disabledAttrsMap[variation_attribute_id];
                const disabledValuesIds = isProductAlertEnabled ? [] : disabledValue;

                return (
                    <VariationAttributeComponent key={variation_attribute_id}
                                                 variationAttribute={variationAttribute}
                                                 variationValue={getVariationValue(variation_attribute_id)}
                                                 disabledValuesIds={disabledValuesIds}
                                                 onValueSelect={variationAttributeValue => {
                                                     onValueSelect(variationAttribute, variationAttributeValue);
                                                 }}/>
                );
            })}
        </div>
    );
}
