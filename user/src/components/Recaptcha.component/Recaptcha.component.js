import React, {useRef} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import type {RecaptchaConfig} from '../../../../types';

type Props = {
    /**
     * Recaptcha config
     */
    recaptchaConfig?: RecaptchaConfig,
    /**
     * This function will be called when reCaptcha is ready, and receives the recaptchaToken as the first and unique
     * parameter
     */
    onVerify?: (token: string) => void
};

export function RecaptchaComponent(
    {
        recaptchaConfig = {},
        onVerify
    }: Props) {
    const recaptchaRef = useRef(null);
    const {
        public_key: recaptchaPublicKey,
        size: recaptchaSize,
        theme: recaptchaTheme,
        lang: recaptchaLang
    } = recaptchaConfig;

    if (!recaptchaPublicKey) return null;

    const lang = recaptchaLang ? {hl: recaptchaLang} : {};

    return (
        <div className="recaptcha-component">
            <ReCAPTCHA sitekey={recaptchaPublicKey}
                       ref={recaptchaRef}
                       onChange={onVerify}
                       onErrored={() => recaptchaRef.current?.reset()}
                       theme={recaptchaTheme}
                       size={recaptchaSize}
                       {...lang}/>
        </div>
    );
}
