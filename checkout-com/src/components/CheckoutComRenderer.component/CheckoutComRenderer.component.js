import React, {
    useEffect,
    useState,
    useContext
} from 'react';
import {useIntl} from 'react-intl';
import Script from 'react-load-script';

import {
    ErrorComponent,
    LoaderComponent
} from '@luft/common';

import {CheckoutContext} from '../../../../checkout';
import {CHECKOUT_COM_JS} from '../../utils';

import messages from './resources/messages';

type Props = {
    /**
     * Checkout.com Frames configuration
     */
    config: Object
};

export function CheckoutComRendererComponent({config}: Props) {
    const [scriptError, setScriptError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isFrameReady, setIsFrameReady] = useState(false);
    const {formatMessage} = useIntl();
    const {
        checkoutComFrames: Frames,
        setCheckoutComFrames: setFrames
    } = useContext(CheckoutContext);

    useEffect(() => {
        if (!Frames || isFrameReady || isLoading) return;
        const customConfig = {
            ...config,
            localization: {
                cardNumberPlaceholder: formatMessage(messages.card_number_placeholder),
                expiryMonthPlaceholder: formatMessage(messages.month_placeholder),
                expiryYearPlaceholder: formatMessage(messages.year_placeholder),
                cvvPlaceholder: formatMessage(messages.cvv_placeholder)
            }
        };

        setIsLoading(true);
        Frames.init(customConfig);
    }, [Frames, config, isFrameReady, isLoading, formatMessage]);

    useEffect(() => {
        if (!Frames) return;

        // Triggered when Frames is registered on the global namespace and safe to use.
        Frames.addEventHandler(
            Frames.Events.READY,
            () => {
                setIsFrameReady(true);
            }
        );

        return () => {
            Frames.removeAllEventHandlers(Frames.Events.READY);
        };
    }, [Frames]);

    const handleOnLoadScript = () => {
        setScriptError(false);

        if (typeof window === 'undefined' || !setFrames) return;

        setFrames(window.Frames);
    };

    const scriptErrorMessage = scriptError && {message: formatMessage(messages.error_script)};

    return (
        <div className="checkout-com-renderer-component">
            {!Frames && !scriptError && <LoaderComponent/>}
            {scriptErrorMessage && <ErrorComponent error={scriptErrorMessage}/>}
            <Script url={CHECKOUT_COM_JS}
                    onError={() => setScriptError(true)}
                    onLoad={handleOnLoadScript}/>
            {!!Frames && (
                <>
                    <div className="checkout-com-renderer-component-card-number">
                        <div className="card-number-frame">
                            {/* card number iframe will be added here */}
                        </div>
                    </div>
                    <div className="checkout-com-renderer-component-wrapper">
                        <div className="checkout-com-renderer-component-date">
                            <span className="checkout-com-renderer-component-date-label">
                                {formatMessage(messages.date_label)}
                            </span>
                            <div className="expiry-date-frame">
                                {/* date iframe will be added here */}
                            </div>
                        </div>
                        <div className="checkout-com-renderer-component-code">
                            <div className="cvv-frame">
                                {/* cvv number iframe will be added here */}
                            </div>
                        </div>
                        <div className="checkout-com-renderer-component-image"/>
                    </div>
                </>
            )}
        </div>
    );
}
