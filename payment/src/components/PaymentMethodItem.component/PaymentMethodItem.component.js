import React, {useCallback} from 'react';
import classnames from 'classnames';

import {RadioComponent} from '@luft/common';
import type {PaymentMethod, SelectedPaymentMethod} from '@luft/types';

type Props = {
    /**
     * Payment method item
     */
    method: PaymentMethod,
    /**
     * Payment Method, assigned to cart as selected
     */
    selectedMethod?: SelectedPaymentMethod,
    /**
     * Additional classname
     */
    className?: string,
    /**
     * Payment method tip
     */
    tip?: string,
    /**
     * Callback used when payment method is changed
     */
    onSelectPaymentMethod?: ({paymentMethod: PaymentMethod}) => void
};

/**
 * Presentational component to show payment method item
 */
export function PaymentMethodItemComponent(
    {
        method,
        selectedMethod,
        onSelectPaymentMethod,
        className,
        tip
    }: Props) {
    const {code, name} = method || {};

    const selectedPaymentMethod = selectedMethod?.payment_method;
    const isSelectedMethod = selectedPaymentMethod?.code === code;

    const handleSelectMethod = useCallback(() => {
        if (onSelectPaymentMethod) onSelectPaymentMethod({paymentMethod: method});
    }, [onSelectPaymentMethod, method]);

    return (
        <div className={classnames('payment-method-item-component', className)}>
            <RadioComponent id={code}
                            label={name}
                            value={code}
                            name="payment-method"
                            checked={isSelectedMethod}
                            onChange={handleSelectMethod}/>
            {isSelectedMethod && tip && (
                <div className="payment-method-item-component-tip">
                    {tip}
                </div>
            )}
        </div>
    );
}
