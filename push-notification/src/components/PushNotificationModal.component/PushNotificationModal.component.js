import React from 'react';
import {useIntl} from 'react-intl';

import {ButtonComponent, ModalComponent} from '@luft/common';

import messages from './resources/messages';

type Props = {
    isOpen?: boolean,
    brandName?: string,
    onAgree?: Function,
    onCancel?: Function
};

export function PushNotificationModalComponent(props: Props) {
    const {
        isOpen,
        brandName,
        onAgree,
        onCancel
    } = props;

    const {formatMessage} = useIntl();

    return (
        <ModalComponent className="push-notification-modal-component"
                        size="confirm"
                        backdrop="static"
                        headerVariant="tertiary"
                        modalTitle={formatMessage(messages.notification_title)}
                        show={isOpen}>
            <span className="push-notification-modal-component-message">
                {formatMessage(messages.notification_message, {brand: brandName})}
            </span>
            <ModalComponent.Footer>
                <ButtonComponent className="push-notification-modal-component-confirm"
                                 variant="primary"
                                 type="button"
                                 onClick={onAgree}
                                 title={formatMessage(messages.agreement)}>
                    {formatMessage(messages.agreement)}
                </ButtonComponent>
                <ButtonComponent className="push-notification-modal-component-cancel"
                                 variant="link"
                                 type="button"
                                 onClick={onCancel}
                                 title={formatMessage(messages.disagreement)}>
                    {formatMessage(messages.disagreement)}
                </ButtonComponent>
            </ModalComponent.Footer>
        </ModalComponent>
    );
}
