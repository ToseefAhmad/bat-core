import React, {
    useState,
    useEffect,
    useCallback
} from 'react';

import {useProductState} from '@luft/product';

import {ProductEngravingControlComponent} from '../ProductEngravingControl.component';
import {ProductEngravingStepsControlComponent} from '../ProductEngravingStepsControl.component';
import {ProductEngravingFrontComponent} from '../ProductEngravingFront.component';
import {ProductEngravingBackContainer} from '../ProductEngravingBack.container';
import {ProductEngravingSummaryContainer} from '../ProductEngravingSummary.container';
import {
    ENGRAVING_STEP,
    PATTERN,
    ICON
} from '../../utils';

import type {
    Pattern,
    Icon,
    Font,
    EngravedOptionsInfo
} from '../../../../types';

type Options = {
    patterns?: Pattern[],
    icons?: Icon[],
    fonts?: Font[]
}

type Props = {
    /**
     * Flag used to identify if engraving options should be shown
     */
    showOptions: boolean,
    /**
     * List of options that are used to personalize the product
     */
    options: Options,
    /**
     * Options of engraved product (from cartItem), used when updating the engraved product
     */
    engravingOptions?: EngravedOptionsInfo,
    /**
     * Cart item identifier (used to update engraved product)
     */
    cartItemId?: string,
    /**
     * Wishlist item identifier (used to update engraved product)
     */
    wishlistItemId?: string,
    /**
     * Config for product personalization
     */
    config: Object,
    /**
     * Callback used to set if engraving options should be shown
     */
    onShowOptions: (boolean) => void
};

export function ProductEngravingComponent(props: Props) {
    const {
        showOptions,
        onShowOptions,
        options = {},
        engravingOptions,
        cartItemId,
        wishlistItemId,
        config = {}
    } = props;

    const [activeEngravingOption, setActiveEngravingOption] = useProductState('activeEngravingOption');
    const [, setSelectedEngravingOptions] = useProductState('selectedEngravingOptions');
    const [, setEngravingStep] = useProductState(ENGRAVING_STEP);
    const [step, setStep] = useState(1);
    const hasEngravingOptions = engravingOptions?.psn_is_personalisable || wishlistItemId;

    useEffect(() => {
        if (!step) return;

        setEngravingStep(step);
    }, [step, setEngravingStep]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [step]);

    // Set initial active option with uniq ID
    useEffect(() => {
        if (!showOptions || activeEngravingOption?.id) return;

        setActiveEngravingOption({id: Date.now()});
    }, [showOptions, activeEngravingOption]);

    // Preset engraving options (in case of updating product)
    useEffect(() => {
        if (!engravingOptions || !options) return;

        const engravingOption = {id: Date.now()};
        const patternId = engravingOptions.psn_front_pattern_id;
        const iconId = engravingOptions.psn_front_icon_id;
        const fontId = engravingOptions.psn_back_text_font_family_id;

        if (patternId) {
            const pattern = options.patterns.find(p => p.id === patternId);
            if (pattern) {
                engravingOption.image = pattern;
                engravingOption.imageType = PATTERN;
            }
        }

        if (iconId) {
            const icon = options.icons.find(i => i.id === iconId);
            if (icon) {
                engravingOption.image = icon;
                engravingOption.imageType = ICON;
            }
        }

        if (engravingOptions.psn_back_text) {
            engravingOption.text = engravingOptions.psn_back_text;
            engravingOption.direction = engravingOptions.psn_back_text_direction;

            const font = options.fonts.find(f => f.id === fontId);
            if (font) engravingOption.font = font;
        }

        setActiveEngravingOption(engravingOption);
    }, [engravingOptions, options]);

    const handlePrevStep = useCallback(() => {
        setStep(prevStep => prevStep - 1);
    }, []);

    const handleChangeStep = useCallback((nextStep) => {
        setStep(nextStep);
    }, []);

    const handleCancel = useCallback(() => {
        setActiveEngravingOption(null);
        setSelectedEngravingOptions([]);
        setStep(1);
        onShowOptions(false);
    }, [setStep, onShowOptions]);

    return (
        <div className="product-engraving-component">
            {showOptions ? (
                <>
                    <ProductEngravingStepsControlComponent step={step}
                                                           onBack={handlePrevStep}
                                                           onCancel={handleCancel}/>
                    {step === 1 && (
                        <ProductEngravingFrontComponent patterns={options.patterns}
                                                        icons={options.icons}
                                                        onChangeStep={handleChangeStep}/>
                    )}
                    {step === 2 && (
                        <ProductEngravingBackContainer fonts={options.fonts}
                                                       maxLengthHorizontal={config.maxLengthHorizontal}
                                                       maxLengthVertical={config.maxLengthVertical}
                                                       onChangeStep={handleChangeStep}/>
                    )}
                    {step === 3 && (
                        <ProductEngravingSummaryContainer price={config.price}
                                                          isUpdate={hasEngravingOptions}
                                                          cartItemId={cartItemId}
                                                          wishlistItemId={wishlistItemId}
                                                          onChangeStep={handleChangeStep}/>
                    )}
                </>
            ) : (
                <ProductEngravingControlComponent price={config.price}
                                                  disclaimer={config.disclaimer}
                                                  onShowOptions={onShowOptions}/>
            )}
        </div>
    );
}
