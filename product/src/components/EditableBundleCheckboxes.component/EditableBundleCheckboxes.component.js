// TODO: Overridden from a future LUFT version. Should be removed after upgrading LUFT packages to 2.2.0 version
import React, {useCallback, useMemo} from 'react';
import {useIntl} from 'react-intl';

import {CheckboxComponent, MoneyComponent} from '@luft/common';
import type {BundleOption, BundleOptionInput} from '@luft/types';

import messages from '@luft/product/src/components/EditableBundleCheckboxes.component/resources/messages';

type Props = {
    /**
     * Represent bundle option that has several variants of products to choose
     */
    option?: BundleOption,
    /**
     * Options that user selected
     */
    selectedOption?: BundleOptionInput,
    /**
     * Function that sets selected options and price to state
     */
    onChange?: (optionInput: BundleOptionInput | null, optionId: string | number) => void
};

/**
 * Component displays bundled product option as a product with price which customer can choose within a checkbox.
 */
export function EditableBundleCheckboxesComponent(
    {
        option,
        selectedOption,
        onChange
    }: Props) {
    const {formatMessage} = useIntl();

    const selectedProductsMap = useMemo(() => {
        const productsMap = option.products.reduce((memo, product) => ({...memo, [product.id]: product}), {});
        return selectedOption?.values?.reduce((memo, id) => ({...memo, [id]: productsMap[id]}), {});
    }, [option, selectedOption]);

    const handleChange = useCallback(({target}) => {
        if (!onChange) return;
        const {
            value: productId,
            checked
        } = target;
        const values = (selectedOption?.values || []).filter(id => id !== productId);
        if (checked) {
            values.push(productId);
        }
        if (values.length) {
            onChange({
                option_id: option.id,
                values,
                quantity: 1
            }, option.id);
        } else {
            onChange(null, option.id);
        }
    }, [option, selectedOption, onChange]);

    return (
        <div className="editable-bundle-checkboxes-component">
            {option.products?.map(bundledProduct => !!bundledProduct?.product?.inventory?.in_stock && (
                <div className="editable-bundle-checkboxes-component-checkbox"
                     key={bundledProduct.id}>
                    <CheckboxComponent id={bundledProduct.id}
                                       name="checkbox.products_ids"
                                       value={bundledProduct.id}
                                       label={(
                                           <div className="editable-bundle-checkboxes-component-label">
                                               {formatMessage(messages.option_text, {
                                                   qty: bundledProduct.qty,
                                                   productName: bundledProduct.product.name
                                               })}
                                           </div>
                                       )}
                                       variant="center"
                                       onChange={handleChange}
                                       checked={!!selectedProductsMap?.[bundledProduct.id]}/>
                    <span className="editable-bundle-checkboxes-component-price">
                        <MoneyComponent money={bundledProduct.price}/>
                    </span>
                </div>
            ))}
        </div>
    );
}
