import React, {
    useState,
    useContext,
    useEffect,
    useCallback
} from 'react';
import {useIntl} from 'react-intl';

import {
    ButtonComponent,
    ErrorComponent,
    LoaderComponent
} from '@luft/common';

import {CheckoutContext} from '../../../../checkout';

import messages from './resources/messages';

type Props = {
    /**
     * Is loading status
     */
    loading: boolean,
    /**
     * Error for represent
     */
    error: Error,
    /**
     * Callback, when checkout.com Frames is submitted
     */
    onSubmit: Function
};

export function CheckoutComPlaceOrderComponent({loading, error, onSubmit}: Props) {
    const {formatMessage} = useIntl();
    const {
        checkoutComFrames: Frames
    } = useContext(CheckoutContext);
    const [isValidCard, setIsValidCard] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isPlacingOrder = loading || isLoading;

    useEffect(() => {
        if (!Frames) return;

        Frames.addEventHandler(
            Frames.Events.CARD_VALIDATION_CHANGED,
            () => {
                const isValid = Frames.isCardValid();
                setIsValidCard(isValid);
            }
        );

        Frames.addEventHandler(
            Frames.Events.CARD_TOKENIZED,
            (event) => {
                Frames.enableSubmitForm();
                setIsLoading(false);
                if (onSubmit) onSubmit(event);
            }
        );

        Frames.addEventHandler(
            Frames.Events.CARD_TOKENIZATION_FAILED,
            () => {
                Frames.enableSubmitForm();
                setIsLoading(false);
            }
        );

        return () => {
            Frames.removeAllEventHandlers(Frames.Events.CARD_VALIDATION_CHANGED);
            Frames.removeAllEventHandlers(Frames.Events.CARD_TOKENIZED);
            Frames.removeAllEventHandlers(Frames.Events.CARD_TOKENIZATION_FAILED);
        };
    }, [Frames]);

    const handleSubmit = useCallback(() => {
        if (!isValidCard) return;

        setIsLoading(true);
        Frames.submitCard();
    }, [Frames, isValidCard]);

    return (
        <div className="checkout-com-place-order-component">
            {error && <ErrorComponent error={error}/>}
            {isPlacingOrder && <LoaderComponent type="overlay"/>}
            <ButtonComponent className="checkout-com-place-order-component-action"
                             onClick={handleSubmit}
                             variant="secondary"
                             disabled={!isValidCard || loading || isLoading}
                             title={formatMessage(messages.action_title)}>
                {formatMessage(messages.action_title)}
            </ButtonComponent>
        </div>
    );
}
