import React from 'react';
import {useIntl} from 'react-intl';

import messages from './resources/messages';

type Props = {
    /**
     * Flag shows if payment step is selected
     */
    isPaymentStep?: boolean
};

export function PaynamicsPaymentDetailsComponent({isPaymentStep}: Props) {
    const {formatMessage} = useIntl();

    if (isPaymentStep) {
        return null;
    }

    return (
        <div className="paynamics-payment-details-component">
            {formatMessage(messages.note)}
        </div>
    );
}
