import React from 'react';

import type {PaymentMethod, SelectedPaymentMethod} from '@luft/types';

import {PaymentMethodItemComponent} from '../../../../payment';

type Props = {
    /**
     * Presentation component, that will consume data and callbacks from this container component
     */
    as?: React.Component,
    /**
     * Payment method item
     */
    method: PaymentMethod,
    /**
     * Payment Method, assigned to cart as selected
     */
    selectedMethod?: SelectedPaymentMethod,
    /**
     * Callback used when payment method is changed
     */
    onSelectPaymentMethod?: ({paymentMethod: PaymentMethod}) => void
};

export function ChechoutComPaymentMethodItemComponent({
    as: Component = PaymentMethodItemComponent,
    method,
    selectedMethod,
    onSelectPaymentMethod
}: Props) {
    return (
        <Component method={method}
                   className="checkoutcom-payment-method-item-component"
                   selectedMethod={selectedMethod}
                   onSelectPaymentMethod={onSelectPaymentMethod}/>
    );
}
