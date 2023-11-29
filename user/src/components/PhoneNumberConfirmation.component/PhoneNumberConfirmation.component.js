import React from 'react';
import {useIntl} from 'react-intl';

import {ModalComponent, LoaderComponent} from '@luft/common';

import {PhoneNumberConfirmationFormComponent} from '../PhoneNumberConfirmationForm.component';
import messages from './resources/messages';

type Props = {
    /**
     * Indicates if modal should be opened
     */
    showModal: boolean,
    /**
     * Is loading status
     */
    loading?: boolean,
    /**
     * Error for represent
     */
    error?: Error,
    /**
     * Time in seconds left until a new code can be requested
     */
    penaltyTime?: number,
    /**
     * Callback to confirm a code that a customer fill in
     */
    onConfirmCode?: (code: number) => void,
    /**
     * Callback to request one more confirmation code
     */
    onRequestCode?: () => void,
    /**
     * Callback on close modal
     */
    onClose?: () => void
};

export function PhoneNumberConfirmationComponent(props: Props) {
    const {
        showModal,
        loading = false,
        error,
        penaltyTime,
        onConfirmCode,
        onRequestCode,
        onClose,
        ...others
    } = props;

    const {formatMessage} = useIntl();

    return (
        <ModalComponent className="phone-number-confirmation-component"
                        show={showModal}
                        onHide={onClose}
                        modalTitle={formatMessage(messages.title)}
                        headerVariant="secondary-revert"
                        size="confirm"
                        backdrop="static">
            {loading && <LoaderComponent />}
            <PhoneNumberConfirmationFormComponent {...others}
                                                  penaltyTime={penaltyTime}
                                                  error={error}
                                                  onConfirmCode={onConfirmCode}
                                                  onRequestCode={onRequestCode}/>
        </ModalComponent>
    );
}
