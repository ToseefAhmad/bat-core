import React, {useCallback, useMemo} from 'react';
import {useIntl} from 'react-intl';

import {MoneyComponent, SelectComponentLoadable as SelectComponent} from '@luft/common';
import {ProductQtyComponent} from '@luft/product';
import type {BundleOption, BundleOptionInput} from '@luft/types';

import messages from './resources/messages';

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
 * Component displays bundled product option as a product with price which customer can choose within a dropdown.
 */
export function EditableBundleDropdownComponent(
    {
        option,
        selectedOption,
        onChange,
    }: Props) {
    const {formatMessage, formatNumber} = useIntl();

    const selectedProduct = useMemo(() => {
        if (!selectedOption?.values?.[0]) return;
        return option?.products?.find(({id}) => id === selectedOption.values[0]);
    }, [option, selectedOption]);

    const selectOptions = useMemo(() => option?.products.map(bundledProduct => {
        if (!bundledProduct?.product || !bundledProduct?.product?.inventory?.in_stock) return null;
        const {name} = bundledProduct.product;
        const {price} = bundledProduct;
        const priceText = price ? formatNumber(price.value, {
            style: 'currency',
            format: 'money',
            currency: price.currency,
        }) : null;

        return {
            code: bundledProduct.id,
            // for some reason eslint crashes on template string in this case
            // eslint-disable-next-line prefer-template
            name: priceText ? name + ' - ' + priceText : name
        };
    }).filter(Boolean), [option, formatNumber]);

    const handleOnProductChange = useCallback(({target}) => {
        if (!onChange) return;
        if (target.value) {
            const productId = target.value;
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
        <div className="editable-bundle-dropdown-component">
            {option.required && option.products.length === 1 ? (
                <p className="editable-bundle-dropdown-component-single-item">
                    <span className="editable-bundle-dropdown-component-single-item-name">
                        {selectedProduct?.name}
                    </span>
                    {!!selectedProduct?.price && (
                        <span className="editable-bundle-dropdown-component-single-item-price">
                            <MoneyComponent money={selectedProduct.price}/>
                        </span>
                    )}
                </p>
            ) : (
                <SelectComponent options={selectOptions}
                                 className="editable-bundle-dropdown-component-select"
                                 variant="no-label"
                                 onChange={handleOnProductChange}
                                 isClearable
                                 defaultValue={selectedProduct?.id}/>
            )}
            <ProductQtyComponent inventory={selectedProduct?.product.inventory}
                                 onQtyChange={handleOnQtyChange}
                                 qty={selectedOption?.quantity}
                                 title={formatMessage(messages.qty_title)}
                                 disabled={!selectedProduct?.qty_is_editable || !selectedOption?.values?.length}/>
        </div>
    );
}
