import React, {
    useEffect,
    useState,
    useCallback
} from 'react';
import {useIntl} from 'react-intl';
import classnames from 'classnames';
import {noop} from 'lodash';

import {useProductState} from '@luft/product';
import {
    ButtonComponent,
    ErrorComponent,
    FormGroupComponent
} from '@luft/common';

import {
    VERTICAL,
    HORIZONTAL
} from '../../utils';
import type {Fonts} from '../../../../types';

import messages from './resources/messages';

type Props = {
    fonts: Fonts[],
    loading: boolean,
    showValidationError?: boolean,
    maxLengthHorizontal?: number,
    maxLengthVertical?: number,
    onChangeStep?: (number) => void,
    onValidateText?: (string) => void
};

export function ProductEngravingBackComponent(props: Props) {
    const {
        fonts,
        showValidationError,
        loading,
        maxLengthHorizontal,
        maxLengthVertical,
        onChangeStep,
        onValidateText,
    } = props;

    const {formatMessage} = useIntl();
    const [engravingText = '', setEngravingText] = useProductState('activeEngravingOption.text');
    const [engravingTextFont, setEngravingTextFont] = useProductState('activeEngravingOption.font');
    const [engravingTextDirection, setEngravingTextDirection] = useProductState('activeEngravingOption.direction');
    const [textError, setTextError] = useState();
    const [hasFontError, setHasFontError] = useState(false);
    const maxLength = engravingTextDirection === VERTICAL ? maxLengthVertical : maxLengthHorizontal;

    // Set engraving text direction as vertical by default
    useEffect(() => {
        if (engravingTextDirection) return;

        setEngravingTextDirection(VERTICAL);
    }, [engravingTextDirection, setEngravingTextDirection]);

    useEffect(() => {
        if (!engravingText) return;

        if (engravingText.length > maxLength) {
            setTextError(formatMessage(messages.max_length_error, {number: maxLength}));
        } else {
            setTextError(null);
        }
    }, [engravingText, engravingTextDirection, maxLength, formatMessage]);

    useEffect(() => {
        if (!showValidationError) return;

        setTextError(formatMessage(messages.valid_error));
    }, [showValidationError, setTextError, formatMessage]);

    const onChange = useCallback((e) => {
        const {value} = e.target;
        if (value.length > engravingText.length && value.length > maxLength) return;

        setEngravingText(value);
    }, [engravingText, setEngravingText, maxLength]);

    const handleSetFont = (font) => {
        setHasFontError(false);
        setEngravingTextFont(font);
    };

    const handleContinue = useCallback(() => {
        if (textError) return;

        const trimmedText = engravingText.trim();

        if (!trimmedText) {
            setTextError(formatMessage(messages.required_error));
            setEngravingText('');
            return;
        }

        if (!engravingTextFont) {
            setHasFontError(true);
            return;
        }

        if (onValidateText) onValidateText(engravingText);
    }, [engravingText, engravingTextFont, textError, onValidateText, formatMessage, setEngravingText]);

    const handleSkip = () => {
        setEngravingText('');
        setEngravingTextFont(null);
        setEngravingTextDirection(null);

        if (onChangeStep) onChangeStep(3);
    };

    const engravingTextError = textError ? {
        engravingText: new Error(textError)
    } : null;

    return (
        <div className="product-engraving-back-component">
            <div className="product-engraving-back-component-title">
                {formatMessage(messages.title)}
            </div>
            <div className="product-engraving-back-component-tabs">
                <div className="product-engraving-back-component-tabs-title">
                    {formatMessage(messages.control_title)}
                </div>
                <div className="product-engraving-back-component-tabs-control">
                    <ButtonComponent className={classnames('product-engraving-back-component-tabs-control-item',
                                     {active: engravingTextDirection === VERTICAL})}
                                     onClick={() => setEngravingTextDirection(VERTICAL)}
                                     inline={true}
                                     title={formatMessage(messages.vertical)}>
                        {formatMessage(messages.vertical)}
                    </ButtonComponent>
                    <ButtonComponent className={classnames('product-engraving-back-component-tabs-control-item',
                                     {active: engravingTextDirection === HORIZONTAL})}
                                     onClick={() => setEngravingTextDirection(HORIZONTAL)}
                                     inline={true}
                                     title={formatMessage(messages.horizontal)}>
                        {formatMessage(messages.horizontal)}
                    </ButtonComponent>
                </div>
            </div>
            <FormGroupComponent className="product-engraving-back-component-text"
                                name="engravingText"
                                value={engravingText}
                                errors={engravingTextError}
                                onChange={onChange}
                                label={formatMessage(messages.label)}/>
            <div className="product-engraving-back-component-text-tip">
                {formatMessage(messages.max_length_tip, {number: maxLength})}
            </div>
            <div className="product-engraving-back-component-variations">
                <div className="product-engraving-back-component-variations-list">
                    {fonts.map(font => (
                        <div className="product-engraving-back-component-variations-list-col"
                             key={font.id}>
                            <div className={classnames('product-engraving-back-component-variations-list-item',
                                {active: font.id === engravingTextFont?.id})}
                                 onClick={() => handleSetFont(font)}
                                 role="button"
                                 tabIndex="0"
                                 onKeyPress={noop}>
                                <div className="product-engraving-back-component-variations-list-item-preview"
                                     style={{fontFamily: font.name}}>
                                    {font.preview_text}
                                </div>
                                <div className="product-engraving-back-component-variations-list-item-title">
                                    {font.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {hasFontError && (
                    <ErrorComponent className="product-engraving-back-component-variations-error"
                                    error={{message: formatMessage(messages.font_error)}}/>
                )}
            </div>
            <div className="product-engraving-back-component-actions">
                <ButtonComponent className="product-engraving-back-component-actions-continue"
                                 onClick={handleContinue}
                                 inline={true}
                                 disabled={loading}
                                 title={formatMessage(messages.continue)}>
                    {formatMessage(messages.continue)}
                </ButtonComponent>
                <ButtonComponent className="product-engraving-back-component-actions-cancel"
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
