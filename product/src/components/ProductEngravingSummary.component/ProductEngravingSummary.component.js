import React, {useEffect, useMemo} from 'react';
import {useIntl} from 'react-intl';

import {
    useProductState,
    useProductContextField
} from '@luft/product';
import {
    ButtonComponent,
    ErrorComponent,
    MoneyComponent
} from '@luft/common';
import type {Money} from '@luft/types';

import {AddToCartPanelComponent} from '../../../../cart';
import {ProductEngravingSummaryItemComponent} from '../ProductEngravingSummaryItem.component';

import messages from './resources/messages';

type Props = {
    /**
     * Engraving money value
     */
    price: Money,
    /**
     * Flag, identifies if it's updating view
     */
    isUpdate?: boolean,
    /**
     * Update type
     */
    updateType?: 'cart' | 'wishlist',
    /**
     * Loading state, identifies update product processing
     */
    updateLoading?: boolean,
    /**
     * Error, identifies update product failure
     */
    updateError?: Error,
    /**
     * Callback, used to set engraving step
     */
    onChangeStep: (number) => void,
    /**
     * Callback, used to update product
     */
    onItemUpdate: () => void
};

export function ProductEngravingSummaryComponent(props: Props) {
    const {
        price,
        isUpdate,
        updateType = 'cart',
        updateLoading,
        updateError,
        onChangeStep,
        onItemUpdate
    } = props;
    const {formatMessage} = useIntl();

    const $productPrice = useProductContextField('product.price');
    const [selectedEngravingOptions = [], setSelectedEngravingOptions] = useProductState('selectedEngravingOptions');
    const [activeEngravingOption, setActiveEngravingOption] = useProductState('activeEngravingOption');

    const updateButtonLabel = isUpdate && formatMessage(messages[`update_${updateType}`]);

    useEffect(() => {
        if (!activeEngravingOption) return;

        const activeIndex = selectedEngravingOptions.findIndex(option => option.id === activeEngravingOption.id);
        if (activeIndex !== -1) {
            const modifiedOptions = [...selectedEngravingOptions];
            modifiedOptions.splice(activeIndex, 1, activeEngravingOption);

            setSelectedEngravingOptions(modifiedOptions);
        } else {
            setSelectedEngravingOptions([...selectedEngravingOptions, activeEngravingOption]);
        }
    }, [activeEngravingOption]);

    const totalPrice = useMemo(() => {
        const {value, currency} = $productPrice?.final?.amount || {};
        const engravingValue = price?.value || 0;

        const total = selectedEngravingOptions.reduce((prev, current) => {
            const hasEngraving = current.image || current.text;
            const currentValue = hasEngraving ? (value + engravingValue) : value;

            return prev + currentValue;
        }, 0);

        return {
            currency,
            value: total
        };
    }, [$productPrice, price, selectedEngravingOptions]);

    const handleAddAnotherDevice = () => {
        setActiveEngravingOption({
            id: Date.now()
        });
        onChangeStep(1);
    };

    return (
        <div className="product-engraving-summary-component">
            <div className="product-engraving-summary-component-title">
                {formatMessage(messages.title)}
            </div>

            <div className="product-engraving-summary-component-list-items">
                {selectedEngravingOptions.map(item => (
                    <ProductEngravingSummaryItemComponent key={item.id}
                                                          item={item}
                                                          price={price}
                                                          onChangeStep={onChangeStep}/>
                ))}
            </div>

            {!isUpdate && (
                <ButtonComponent className="product-engraving-summary-component-add"
                                 title={formatMessage(messages.add)}
                                 inline={true}
                                 disabled={updateLoading}
                                 variant="tertiary"
                                 onClick={handleAddAnotherDevice}>
                    {formatMessage(messages.add)}
                </ButtonComponent>
            )}

            <div className="product-engraving-summary-component-price-total">
                <MoneyComponent money={totalPrice}/>
            </div>

            <div className="product-engraving-summary-component-actions">
                {isUpdate ? (
                    <>
                        {updateError && <ErrorComponent error={updateError}/>}
                        <ButtonComponent className="product-engraving-summary-component-actions-update"
                                         title={updateButtonLabel}
                                         inline={true}
                                         disabled={updateLoading}
                                         onClick={onItemUpdate}>
                            {updateButtonLabel}
                        </ButtonComponent>
                    </>
                ) : (
                    <AddToCartPanelComponent/>
                )}
            </div>
        </div>
    );
}
