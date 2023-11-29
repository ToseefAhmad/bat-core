import React, {useState, useCallback} from 'react';

import {
    LoaderComponent,
    ErrorComponent,
    NoCacheComponent
} from '@luft/common';
import {useCartDataPaymentMethod, useSavePaymentMethod} from '@luft/payment';
import {useCheckoutQuery} from '@luft/quote';
import type {PaymentMethod} from '@luft/types';

import {PaymentMethodListComponent} from '../PaymentMethodList.component';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: React.Component,
    /**
     * Method code for expose method
     */
    exposedMethod?: string,
    /**
     * Represent for loading view
     */
    loadingAs?: React.Component,
    /**
     * Represent for error view
     */
    errorAs?: React.Component,
    /**
     * Represent for no cache view
     */
    noCacheAs?: React.Component,
    /**
     * Await result
     */
    awaitResult?: boolean,
    /**
     * Callback used when payment method is changed
     */
    onSelectPaymentMethod?: ({ paymentMethod: PaymentMethod, publicHash?: string }) => void,
    /**
     * Callback used on Close
     */
    onBack?: () => void
};

/**
 * @module @luft/payment
 * @scope @luft/payment
 * @exports PaymentMethodListContainer
 * @function PaymentMethodListContainer
 * @kind Container
 *
 * @description
 * Container component, used to select payment method
 *
 * @param {React.Component|PaymentMethodListPresentationComponent} as=PaymentMethodListComponent -
 * Presentation component, that will consume data and callbacks from this container component
 */

/**
 * @typedef {React.Component} PaymentMethodListPresentationComponent
 * @kind Component
 *
 * @description
 * Presentation component, that consumes data from PaymentMethodListContainer
 *
 * @summary
 * List of props, passed to presentation component by container
 *
 * @param {PaymentMethod} selectedMethod - Payment Method, assigned to cart as selected
 * @param {Function} onSelectPaymentMethod - Callback used when payment method is changed
 * @param {PaymentMethod[]} paymentMethods - List of all Payment Methods available for selection
 * @param {boolean} loading - Flag, that either Payment Methods loading is in progress or selection of Payment Method
 * @param {boolean} error - Error, usually identifies Payment method selection failure
 */
export function PaymentMethodListContainer(
    {
        as: Component = PaymentMethodListComponent,
        onSelectPaymentMethod,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        ...other
    }: Props) {
    const [loading, setLoading] = useState(false);

    const {data, error, loading: cartLoading, noCache} = useCheckoutQuery();
    const {data: selectedMethod} = useCartDataPaymentMethod();
    const [savePaymentMethod] = useSavePaymentMethod();

    const paymentMethods = data?.cart?.payment_methods || [];

    const handleOnSelectPaymentMethod = useCallback(async (item) => {
        const {paymentMethod, publicHash} = item;

        if (paymentMethod?.code === selectedMethod?.code) return;

        setLoading(true);
        const resp = await savePaymentMethod(paymentMethod?.code, publicHash);
        setLoading(false);
        if (onSelectPaymentMethod) onSelectPaymentMethod(resp);

        return resp;
    }, [onSelectPaymentMethod, savePaymentMethod, selectedMethod]);

    if (awaitResult && cartLoading) return Loading && <Loading/>;
    if (awaitResult && error) return Error && <Error error={error}/>;
    if (awaitResult && noCache) return NoCache && <NoCache/>;

    return (
        <Component {...other}
                   selectedMethod={selectedMethod}
                   onSelectPaymentMethod={handleOnSelectPaymentMethod}
                   paymentMethods={paymentMethods}
                   loading={cartLoading || loading}
                   error={error}/>
    );
}
