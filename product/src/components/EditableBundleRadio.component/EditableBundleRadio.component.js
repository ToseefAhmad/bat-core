// TODO: Overridden from a future LUFT version. Should be removed after upgrading LUFT packages to 2.2.0 version
import React, {useCallback} from 'react';

import {
    MoneyComponent,
    RadioComponent
} from '@luft/common';
import type {
    BundleOption,
    BundledProduct,
    BundleOptionInput
} from '@luft/types';

type Props = {
    /**
     * Represent bundle option that has several variants of products to choose
     */
    option?: BundleOption,
    /**
     * Options that user selected
     */
    bundledProduct?: BundledProduct,
    /**
     * If Radio is selected initially
     */
    defaultChecked?: boolean,
    /**
     * Function that sets selected options and price to state
     */
    onChange?: (optionInput: BundleOptionInput | null, optionId: string | number) => void,
};

/**
 * Component displays bundled product option as a product with price which customer can choose within a radio button.
 */
export function EditableBundleRadioComponent(
    {
        option,
        bundledProduct,
        defaultChecked,
        onChange
    }: Props) {
    const handleChange = useCallback(({target}) => onChange(target.value), [onChange]);

    return (
        <div className="editable-bundle-radio-component">
            <RadioComponent name={option.id}
                            value={bundledProduct.id}
                            onChange={handleChange}
                            label={(
                                <span className="editable-bundle-radio-component-label">
                                    {bundledProduct.product.name}
                                </span>
                            )}
                            className="editable-bundle-radio-component-radio"
                            checked={defaultChecked}/>
            <span className="editable-bundle-radio-component-price">
                <MoneyComponent money={bundledProduct.price}/>
            </span>
        </div>
    );
}
