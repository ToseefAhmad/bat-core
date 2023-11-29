import React, {useCallback, useMemo} from 'react';
import {useIntl} from 'react-intl';

import {RadioComponent} from '@luft/common';
import {EditableBundleRadioComponent, ProductQtyComponent} from '@luft/product';
import type {BundleOption, BundleOptionInput} from '@luft/types';

import messages from '@luft/product/src/components/EditableBundleRadioButtons.component/resources/messages';
import custom_messages from './resources/messages';

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
    onChange?: (optionInput: BundleOptionInput | null, optionId: string | number) => void,
};

/**
 * A component displays list of options of bundled product which have radio button type.
 */
export function EditableBundleRadioButtonsComponent(
    {
        option,
        selectedOption,
        onChange
    }: Props) {
    const {formatMessage} = useIntl();

    const selectedProduct = useMemo(() => {
        if (!selectedOption?.values?.[0]) return;
        return option.products.find(({id}) => id === selectedOption.values[0]);
    }, [option, selectedOption]);

    const handleSelectNone = useCallback(() => {
        if (!onChange) return;
        onChange(null, option.id);
    }, [onChange, option]);

    const handleOnOptionSelect = useCallback(productId => {
        if (!onChange) return;
        if (productId) {
            const quantity = option.products.find(({id}) => id === productId).qty;
            onChange({
                option_id: option.id,
                values: [productId],
                quantity
            }, option.id);
        } else {
            onChange(null, option.id);
        }
    }, [onChange, option]);

    const handleOnQtyChange = useCallback(quantity => {
        if (!onChange) return;
        onChange({
            option_id: option.id,
            values: selectedOption?.values,
            quantity
        }, option.id);
    }, [onChange, option, selectedOption]);

    return (
        <div className="editable-bundle-radio-buttons-component">
            {!option.required && (
                <RadioComponent name={option.id}
                                className="editable-bundle-radio-buttons-component-none"
                                onChange={handleSelectNone}
                                label={formatMessage(messages.none)}/>
            )}
            {option.products?.map(item => !!item?.product?.inventory?.in_stock && (
                <EditableBundleRadioComponent key={item.id}
                                              option={option}
                                              bundledProduct={item}
                                              onChange={handleOnOptionSelect}
                                              defaultChecked={selectedProduct?.id === item.id}/>
            ))}
            <ProductQtyComponent inventory={selectedProduct?.product.inventory}
                                 onQtyChange={handleOnQtyChange}
                                 qty={selectedOption?.quantity}
                                 title={formatMessage(custom_messages.qty_title)}
                                 disabled={!selectedProduct?.qty_is_editable || !selectedOption?.values?.length}/>
        </div>
    );
}
