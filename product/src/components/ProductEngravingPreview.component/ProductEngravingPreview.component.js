import React, {useState, useEffect} from 'react';
import {useIntl} from 'react-intl';
import classnames from 'classnames';

import {ButtonComponent} from '@luft/common';
import {useProductContextField, useProductState} from '@luft/product';

import {
    ENGRAVING_STEP,
    VERTICAL
} from '../../utils';

import messages from './resources/messages';

export function ProductEngravingPreviewComponent() {
    const {formatMessage} = useIntl();

    const $productFrontImage = useProductContextField('product.psn_front_image');
    const productBackImage = useProductContextField('product.psn_background_image');
    const [engravingImage] = useProductState('activeEngravingOption.image');
    const [engravingText] = useProductState('activeEngravingOption.text');
    const [engravingTextDirection = VERTICAL] = useProductState('activeEngravingOption.direction');
    const [engravingTextFont] = useProductState('activeEngravingOption.font');
    const [engravingStep] = useProductState(ENGRAVING_STEP);
    const [isFrontView, setIsFrontView] = useState(true);

    useEffect(() => {
        if (!engravingStep) return;

        setIsFrontView(engravingStep === 1 || engravingStep === 3);
    }, [engravingStep, setIsFrontView]);

    return (
        <div className="product-engraving-preview-component">
            <div className="product-engraving-preview-component-box">
                {isFrontView ? (
                    <>
                        <img src={$productFrontImage?.url}
                             className="product-engraving-preview-component-product-image"
                             alt="preview"/>
                        {engravingImage && (
                            <img src={engravingImage.pattern_image || engravingImage.icon_image}
                                 className="product-engraving-preview-component-front-image"
                                 alt="preview"/>
                        )}
                    </>
                ) : (
                    <>
                        <img src={productBackImage?.url}
                             className="product-engraving-preview-component-product-image"
                             alt="preview"/>
                        {!!engravingText && (
                            <div className={classnames('product-engraving-preview-component-back-text',
                                {vertical: engravingTextDirection === VERTICAL})}
                                 style={{fontFamily: engravingTextFont?.name}}>
                                {engravingText}
                            </div>
                        )}
                    </>
                )}
            </div>
            {engravingStep === 3 && (
                <div className="product-engraving-preview-component-controls">
                    <ButtonComponent className={classnames('product-engraving-preview-component-controls-action',
                        {active: isFrontView})}
                                     onClick={() => setIsFrontView(true)}
                                     inline={true}
                                     title={formatMessage(messages.front)}>
                        {formatMessage(messages.front)}
                    </ButtonComponent>
                    <ButtonComponent className={classnames('product-engraving-preview-component-controls-action',
                        {active: !isFrontView})}
                                     onClick={() => setIsFrontView(false)}
                                     inline={true}
                                     title={formatMessage(messages.back)}>
                        {formatMessage(messages.back)}
                    </ButtonComponent>
                </div>
            )}
        </div>
    );
}
