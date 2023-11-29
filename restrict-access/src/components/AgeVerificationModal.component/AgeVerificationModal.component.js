import React from 'react';
import {useIntl} from 'react-intl';

import {ModalComponent} from '@luft/common';

import {AgeVerificationComponent} from '../AgeVerification.component';
import messages from './resources/messages';

type Props = {
    /**
     * Indicates if modal should be opened
     */
    showModal: boolean,
    /**
     * Callback on close modal
     */
    onClose?: Function
};

export function AgeVerificationModalComponent(props: Props) {
    const {
        showModal,
        onClose,
        ...other
    } = props;

    const {formatMessage} = useIntl();

    return (
        <ModalComponent className="age-verification-modal-component"
                        show={showModal}
                        onToggleShow={onClose}
                        modalTitle={formatMessage(messages.title)}
                        headerVariant="secondary-revert"
                        size="confirm"
                        backdrop="static">
            <AgeVerificationComponent {...other}/>
        </ModalComponent>
    );
}
