import React from 'react';
import {useIntl} from 'react-intl';

import messages from './resources/messages';

export function CcAvenuePaymentDetailsComponent() {
    const {formatMessage} = useIntl();

    return (
        <div className="ccavenue-payment-details-component">
            {formatMessage(messages.note)}
        </div>
    );
}
