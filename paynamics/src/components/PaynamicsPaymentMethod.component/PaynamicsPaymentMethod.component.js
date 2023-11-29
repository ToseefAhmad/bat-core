import React from 'react';
import {useIntl} from 'react-intl';

import type {PaymentMethod} from '@luft/types';

import {PaymentMethodItemComponent} from '../../../../payment';
import messages from './resources/messages';

type Props = {
    /**
     * Presentation component, that will use to render payment method
     */
    as?: React.Component,
    /**
     * Payment method item
     */
    method: PaymentMethod
};

export function PaynamicsPaymentMethodComponent({
    as: Component = PaymentMethodItemComponent,
    method,
    ...other
}: Props) {
    const {formatMessage} = useIntl();
    const {code} = method;

    return (
        <Component method={method}
                   className={`paynamics-payment-method-component ${code}`}
                   paymentMethodTip={formatMessage(messages.paynamics_tip)}
                   {...other}/>
    );
}
