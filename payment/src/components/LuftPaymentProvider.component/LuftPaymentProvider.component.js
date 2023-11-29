import React, {useMemo} from 'react';

import {PaymentProviderContext} from '@luft/payment/src/contexts/context';

import {CreateOrderContainer} from '../../../../quote';
import {PaymentMethodItemComponent} from '../PaymentMethodItem.component';

export type LuftPaymentProps = {
    /**
     * Renderers for payment methods. Each of payment codes is mapped to
     * specific component responsible for handling this payment method.
     */
    renderers?: Map,
    /**
     * Default renderer for cases, where there is no component for payment code
     */
    defaultRenderer?: React.Component | CreateOrderContainer,
    /**
     * Renderers for payment methods
     */
    methodRenderers?: Map,
    /**
     * Default renderer for cases, where there is no component for payment method
     */
    methodDefaultRenderer?: React.Component | PaymentMethodItemComponent,
    /**
     * Renderers for payment method details
     */
    methodDetailsRenderers?: React.Component | null,
    /**
     * Children component
     */
    children?: React.Node
};

export const LuftPaymentProviderComponent = (props: LuftPaymentProps) => {
    const {
        renderers = new Map(),
        defaultRenderer = CreateOrderContainer,
        methodRenderers = new Map(),
        methodDefaultRenderer = PaymentMethodItemComponent,
        methodDetailsRenderers,
        children
    } = props;

    const renderersMemo = useMemo(() => renderers.set('_default', defaultRenderer), [renderers]);
    const methodRenderersMemo = useMemo(() => methodRenderers.set('_methodDefault', methodDefaultRenderer), [methodRenderers]);
    const methodDetailsRenderersMemo = useMemo(() => methodDetailsRenderers, [methodDetailsRenderers]);

    return (
        <PaymentProviderContext.Provider value={{
            renderers: renderersMemo,
            methodRenderers: methodRenderersMemo,
            methodDetailsRenderers: methodDetailsRenderersMemo
        }}>
            {children}
        </PaymentProviderContext.Provider>
    );
};
