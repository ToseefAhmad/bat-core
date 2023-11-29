import React from 'react';

import type {PaymentMethod, SelectedPaymentMethod} from '@luft/types';

import {usePaymentMethodRenderer} from '../../hooks';

type Props = {
    as?: React.Component,
    method: PaymentMethod,
    selectedMethod: SelectedPaymentMethod,
    onSelectPaymentMethod: () => void
};

export function PaymentMethodRendererComponent(props: Props) {
    const {
        method,
        selectedMethod,
        onSelectPaymentMethod
    } = props;

    const Renderer = usePaymentMethodRenderer(method.code);
    const {as: Component = Renderer} = props;

    return (
        <Component method={method}
                   selectedMethod={selectedMethod}
                   onSelectPaymentMethod={onSelectPaymentMethod}/>
    );
}
