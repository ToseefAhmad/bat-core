import React from 'react';
import {useIntl} from 'react-intl';

import {
    BackComponent,
    ErrorComponent,
    LoaderComponent
} from '@luft/common';
import type {PaymentMethod} from '@luft/types';

import messages from '@luft/payment/src/components/PaymentMethodList.component/resources/messages';

import {PaymentMethodRendererComponent} from '../PaymentMethodRenderer.component';

type Props = {
    /**
     * Payment Method, assigned to cart as selected
     */
    selectedMethod?: {payment_method: PaymentMethod},
    /**
     * List of all Payment Methods available for selection
     */
    paymentMethods?: PaymentMethod[],
    /**
     * Flag, that either Payment Methods loading is in progress or selection of Payment Method
     */
    loading?: boolean,
    /**
     * Error, that should be displayed on top of component, usually identifies Payment method selection failure
     */
    error?: Error,
    /**
     * Callback used on Close
     */
    onBack?: () => void,
    /**
     * Callback used when payment method is changed
     */
    onSelectPaymentMethod?: ({paymentMethod: PaymentMethod}) => void
};

export function PaymentMethodListComponent(props: Props) {
    const {
        selectedMethod,
        onSelectPaymentMethod,
        onBack,
        loading,
        paymentMethods,
        error
    } = props;

    const {formatMessage} = useIntl();

    return (
        <div className="payment-method-list-component">
            <BackComponent title={formatMessage(messages.add_method)}
                           variant="header"
                           onBack={onBack}/>

            <div className="payment-method-list-component-body">
                {!paymentMethods?.length ? (
                    <div className="payment-method-list-component-empty">
                        {formatMessage(messages.no_methods)}
                    </div>
                ) : (
                    <>
                        {loading && <LoaderComponent type="overlay"/>}
                        {error && <ErrorComponent error={error}/>}

                        <div className="payment-method-list-component-items">
                            {paymentMethods.map((method) => (
                                <PaymentMethodRendererComponent key={method.code}
                                                                method={method}
                                                                selectedMethod={selectedMethod}
                                                                onSelectPaymentMethod={onSelectPaymentMethod}/>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
