import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import classnames from 'classnames';
import {noop} from 'lodash';

import {ButtonComponent, ErrorComponent} from '@luft/common';
import {useProductState} from '@luft/product';

import {
    PATTERN,
    ICON
} from '../../utils';
import type {Pattern, Icon} from '../../../../types';

import messages from './resources/messages';

type Props = {
    patterns: Pattern[],
    icons: Icon[],
    onChangeStep: (number) => void
};

export function ProductEngravingFrontComponent(props: Props) {
    const {
        patterns,
        icons,
        onChangeStep
    } = props;

    const {formatMessage} = useIntl();
    const [engravingImage, setEngravingImage] = useProductState('activeEngravingOption.image');
    const [engravingImageType, setEngravingImageType] = useProductState('activeEngravingOption.imageType');
    const [hasTypeError, setHasTypeError] = useState(false);
    const [hasImageError, setHasImageError] = useState(false);

    const iconsToRender = engravingImageType === PATTERN ? patterns : icons;

    const handleSetType = (chosenType) => {
        setHasTypeError(false);
        setEngravingImageType(chosenType);
        setEngravingImage(null);
    };

    const handleSetFrontImage = (image) => {
        setHasImageError(false);
        setEngravingImage(image);
    };

    const handleContinue = () => {
        if (!engravingImageType) {
            setHasTypeError(true);
            return;
        }

        if (!engravingImage) {
            setHasImageError(true);
            return;
        }

        onChangeStep(2);
    };

    const handleSkip = () => {
        setEngravingImage(null);
        setEngravingImageType(null);
        onChangeStep(2);
    };

    return (
        <div className="product-engraving-front-component">
            <div className="product-engraving-front-component-title">
                {formatMessage(messages.title)}
            </div>
            <div className="product-engraving-front-component-tabs">
                <div className="product-engraving-front-component-tabs-title">
                    {formatMessage(messages.tabs_title)}
                </div>
                <div className="product-engraving-front-component-tabs-control">
                    <ButtonComponent className={classnames('product-engraving-front-component-tabs-control-item',
                        {active: engravingImageType === PATTERN})}
                                     onClick={() => handleSetType(PATTERN)}
                                     inline={true}
                                     title={formatMessage(messages.pattern)}>
                        {formatMessage(messages.pattern)}
                    </ButtonComponent>
                    <ButtonComponent className={classnames('product-engraving-front-component-tabs-control-item',
                        {active: engravingImageType === ICON})}
                                     onClick={() => handleSetType(ICON)}
                                     inline={true}
                                     title={formatMessage(messages.icon)}>
                        {formatMessage(messages.icon)}
                    </ButtonComponent>
                </div>
                {hasTypeError && (
                    <ErrorComponent className="product-engraving-front-component-tabs-error"
                                    error={{message: formatMessage(messages.type_error)}}/>
                )}
            </div>
            {!!engravingImageType && (
                <div className="product-engraving-front-component-variations">
                    <div className="product-engraving-front-component-variations-title">
                        {formatMessage(engravingImageType === PATTERN ? messages.choose_pattern : messages.choose_icon)}
                    </div>
                    <div className="product-engraving-front-component-variations-list">
                        {iconsToRender.map(icon => (
                            <div className="product-engraving-front-component-variations-list-col"
                                 key={icon.id}>
                                <div className={classnames('product-engraving-front-component-variations-list-item',
                                    {active: icon.thumbnail_image === engravingImage?.thumbnail_image})}
                                     onClick={() => handleSetFrontImage(icon)}
                                     role="button"
                                     tabIndex="0"
                                     onKeyPress={noop}>
                                    <img className="product-engraving-front-component-variations-list-item-image"
                                         src={icon.thumbnail_image}
                                         alt={icon.name}/>
                                    <div className="product-engraving-front-component-variations-list-item-title">
                                        {icon.name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {hasImageError && (
                        <ErrorComponent className="product-engraving-front-component-variations-error"
                                        error={{message: formatMessage(messages.image_error)}}/>
                    )}
                </div>
            )}
            <div className="product-engraving-front-component-actions">
                <ButtonComponent className="product-engraving-front-component-actions-continue"
                                 onClick={handleContinue}
                                 inline={true}
                                 title={formatMessage(messages.continue)}>
                    {formatMessage(messages.continue)}
                </ButtonComponent>
                <ButtonComponent className="product-engraving-front-component-actions-cancel"
                                 onClick={handleSkip}
                                 inline={true}
                                 title={formatMessage(messages.skip)}
                                 variant="primary-link">
                    {formatMessage(messages.skip)}
                </ButtonComponent>
            </div>
        </div>
    );
}
