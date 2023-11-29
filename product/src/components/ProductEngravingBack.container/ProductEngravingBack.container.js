import React, {useState} from 'react';

import {ProductEngravingBackComponent} from '../ProductEngravingBack.component';
import {useValidateEngravingText} from '../../hooks';

type Props = {
    /**
     * Presentation component, that will consume data and callbacks from this container component
     */
    as?: React.Component,
    /**
     * Callback, used to set engraving step
     */
    onChangeStep: (number) => void
}

export function ProductEngravingBackContainer(
    {
        as: Component = ProductEngravingBackComponent,
        onChangeStep,
        ...other
    }: Props) {
    const [validateText, {loading}] = useValidateEngravingText();
    const [showValidationError, setShowValidationError] = useState(false);

    const handleValidateText = async (text) => {
        try {
            setShowValidationError(false);
            const res = await validateText(text);
            const isValid = res?.data?.validateEngravingText?.is_valid;
            if (isValid) {
                onChangeStep(3);
            } else {
                setShowValidationError(true);
            }
        } catch (e) {
            setShowValidationError(true);
        }
    };

    return (
        <Component {...other}
                   showValidationError={showValidationError}
                   loading={loading}
                   onChangeStep={onChangeStep}
                   onValidateText={handleValidateText}/>
    );
}
