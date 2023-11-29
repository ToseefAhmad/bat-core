import React from 'react';
import {useIntl} from 'react-intl';

import {
    useProductState,
    useProductContextField,
    ProductPriceComponent
} from '@luft/product';
import {
    ButtonComponent,
    MoneyComponent
} from '@luft/common';
import type {Money} from '@luft/types';

import {
    PATTERN,
    VERTICAL
} from '../../utils';

import messages from './resources/messages';

type Props = {
    /**
     * Flag, identifies if it's updating view
     */
    item?: Object,
    /**
     * Engraving money value
     */
    price: Money,
    /**
     * Callback, used to set engraving step
     */
    onChangeStep: (number) => void
};

export function ProductEngravingSummaryItemComponent(props: Props) {
    const {
        item,
        price,
        onChangeStep
    } = props;
    const {
        id,
        image,
        imageType,
        text,
        direction,
        font
    } = item || {};

    const {formatMessage} = useIntl();
    const productFrontImage = useProductContextField('product.psn_front_image');
    const name = useProductContextField('product.name');
    const [selectedEngravingOptions, setSelectedEngravingOptions] = useProductState('selectedEngravingOptions');
    const [, setActiveEngravingOption] = useProductState('activeEngravingOption');

    const handleRemoveItem = () => {
        const filteredOptions = selectedEngravingOptions.filter(option => option.id !== id);
        setSelectedEngravingOptions(filteredOptions);
    };

    const handleEditItem = (step) => {
        setActiveEngravingOption(item);
        onChangeStep(step);
    };

    const handleRemoveFront = () => {
        setSelectedEngravingOptions(prevState => prevState.map(option => {
            if (option.id === id) {
                return {
                    ...option,
                    image: null,
                    imageType: null
                };
            }
            return option;
        }));
    };

    const handleRemoveBack = () => {
        setSelectedEngravingOptions(prevState => prevState.map(option => {
            if (option.id === id) {
                return {
                    ...option,
                    text: null,
                    font: null,
                    direction: null
                };
            }
            return option;
        }));
    };

    const textDirection = formatMessage(direction === VERTICAL ? messages.vertical : messages.horizontal);
    const textImageType = formatMessage(imageType === PATTERN ? messages.pattern : messages.icon);

    return (
        <div className="product-engraving-summary-item-component">
            <div className="product-engraving-summary-item-component-product">
                <div className="product-engraving-summary-item-component-image-box">
                    <img src={productFrontImage?.url}
                         alt={productFrontImage?.name}/>
                </div>
                <div className="product-engraving-summary-item-component-product-title">
                    {name}
                </div>
                <div className="product-engraving-summary-item-component-product-price">
                    <ProductPriceComponent ignoreQty={true}/>
                </div>
                <ButtonComponent className="product-engraving-summary-item-component-options-item-actions-remove"
                                 onClick={handleRemoveItem}
                                 inline={true}
                                 title={formatMessage(messages.remove)}
                                 aria-label={formatMessage(messages.remove)}
                                 variant="primary-link"/>
            </div>
            <div className="product-engraving-summary-item-component-options">
                <div className="product-engraving-summary-item-component-options-title">
                    <span>
                        {formatMessage(messages.options_title)}
                    </span>
                    <MoneyComponent money={price}/>
                </div>

                {image && (
                    <div className="product-engraving-summary-item-component-options-item">
                        <div className="product-engraving-summary-item-component-image-box">
                            <img className="product-engraving-summary-item-component-image-box-icon"
                                 src={image.pattern_image || image.icon_image}
                                 alt={image.name}/>
                        </div>
                        <div className="product-engraving-summary-item-component-options-item-content">
                            <div className="product-engraving-summary-item-component-options-item-title">
                                {formatMessage(messages.front)}
                            </div>
                            <div className="product-engraving-summary-item-component-options-item-params">
                                <div className="product-engraving-summary-item-component-options-item-params-name">
                                    {textImageType}
                                </div>
                                <div className="product-engraving-summary-item-component-options-item-params-value">
                                    {image?.name}
                                </div>
                            </div>
                            <div className="product-engraving-summary-item-component-options-item-actions">
                                <ButtonComponent className="product-engraving-summary-item-component-options-item-actions-edit"
                                                 onClick={() => handleEditItem(1)}
                                                 inline={true}
                                                 title={formatMessage(messages.edit)}
                                                 aria-label={formatMessage(messages.edit)}
                                                 variant="primary-link">
                                    {formatMessage(messages.edit)}
                                </ButtonComponent>
                                <ButtonComponent className="product-engraving-summary-item-component-options-item-actions-remove"
                                                 onClick={handleRemoveFront}
                                                 inline={true}
                                                 title={formatMessage(messages.remove)}
                                                 aria-label={formatMessage(messages.remove)}
                                                 variant="primary-link"/>
                            </div>
                        </div>
                    </div>
                )}

                {text && (
                    <div className="product-engraving-summary-item-component-options-item">
                        <div className="product-engraving-summary-item-component-image-box"
                             style={{fontFamily: font?.name}}>
                            {text}
                        </div>
                        <div className="product-engraving-summary-item-component-options-item-content">
                            <div className="product-engraving-summary-item-component-options-item-title">
                                {formatMessage(messages.back)}
                            </div>
                            <div className="product-engraving-summary-item-component-options-item-params">
                                <div className="product-engraving-summary-item-component-options-item-params-name">
                                    {formatMessage(messages.text)}
                                </div>
                                <div className="product-engraving-summary-item-component-options-item-params-value">
                                    {text}
                                </div>
                            </div>
                            <div className="product-engraving-summary-item-component-options-item-params">
                                <div className="product-engraving-summary-item-component-options-item-params-name">
                                    {formatMessage(messages.orientation)}
                                </div>
                                <div className="product-engraving-summary-item-component-options-item-params-value">
                                    {textDirection}
                                </div>
                            </div>
                            <div className="product-engraving-summary-item-component-options-item-params">
                                <div className="product-engraving-summary-item-component-options-item-params-name">
                                    {formatMessage(messages.typeface)}
                                </div>
                                <div className="product-engraving-summary-item-component-options-item-params-value">
                                    {font?.name}
                                </div>
                            </div>
                            <div className="product-engraving-summary-item-component-options-item-actions">
                                <ButtonComponent className="product-engraving-summary-item-component-options-item-actions-edit"
                                                 onClick={() => handleEditItem(2)}
                                                 inline={true}
                                                 title={formatMessage(messages.edit)}
                                                 aria-label={formatMessage(messages.edit)}
                                                 variant="primary-link">
                                    {formatMessage(messages.edit)}
                                </ButtonComponent>
                                <ButtonComponent className="product-engraving-summary-item-component-options-item-actions-remove"
                                                 onClick={handleRemoveBack}
                                                 inline={true}
                                                 title={formatMessage(messages.remove)}
                                                 aria-label={formatMessage(messages.remove)}
                                                 variant="primary-link"/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
