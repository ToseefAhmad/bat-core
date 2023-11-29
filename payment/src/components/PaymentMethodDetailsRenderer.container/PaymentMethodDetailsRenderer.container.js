import React from 'react';

import {usePaymentMethodDetailsRenderer} from '../../hooks';

type Props = {
    /**
     * Payment method code
     */
    code?: string
};

export function PaymentMethodDetailsRendererContainer({code, ...other}: Props) {
    const Renderer = usePaymentMethodDetailsRenderer(code);

    if (!Renderer) {
        return null;
    }

    return (
        <Renderer {...other}/>
    );
}
