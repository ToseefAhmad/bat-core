import React, {
    useMemo, useState, useCallback
} from 'react';
import {useIntl} from 'react-intl';

import {LoaderComponent, ErrorComponent} from '@luft/common';
import type {PaymentMethod} from '@luft/types';

import {Ipay88MethodItemComponent} from '../Ipay88MethodItem.component';

import messages from './resources/messages';

type Props = {
    /**
     * List of online payment methods
     */
    online?: Array,
    /**
     * List of credit pauement methods
     */
    credit?: Array,
    /**
     * List of wallet peyment methods
     */
    wallet?: Array,
    /**
     * Flag shows that is loading data
     */
    loading?: loading,
    /**
     * Error
     */
    error?: Error,
    /**
     * Selected payment method
     */
    selectedPaymentMethod?: PaymentMethod,
    /**
     * Callback to save payment method id
     */
    onSavePaymentMethodId?: (id: number) => void,
    /**
     * Callback to save Ipay88 payment method without payment id
     */
    onSaveIpayMethod?: () => void
};

const FPX = {
    name: 'FPX',
    logo: 'fpx.png'
};

export function Ipay88MethodsListComponent({
    online,
    credit,
    wallet,
    loading = false,
    error,
    selectedPaymentMethod,
    onSavePaymentMethodId,
    onSaveIpayMethod
}: Props) {
    const {formatMessage} = useIntl();
    const [isFpx, setIsFpx] = useState();

    const isOnlineExist = !!online?.length;
    const firstLineMethods = [...credit, ...wallet];
    const selectedMethodId = selectedPaymentMethod?.payment_method?.payment_id;

    const isOnlineMethod = useCallback((id) => online?.some(method => method?.id === id), [online]);
    const isOnline = useMemo(() => isOnlineMethod(selectedMethodId) || isFpx, [selectedMethodId, isFpx]);

    const handleSetFpx = useCallback(async () => {
        if (selectedMethodId && !isOnlineMethod(selectedMethodId)) {
            await onSaveIpayMethod();
        }

        setIsFpx(true);
    }, [selectedMethodId, isOnlineMethod, onSaveIpayMethod]);

    const handleSetPaymentMethod = useCallback((id) => {
        const isOnline = isOnlineMethod(id);
        onSavePaymentMethodId(id);
        setIsFpx(isOnline);
    }, [onSavePaymentMethodId, isOnlineMethod]);

    return (
        <div className="ipay88-methods-list-component">
            {firstLineMethods.length && (
                <div className="ipay88-methods-list-component-row">
                    {firstLineMethods?.map(method => (
                        <Ipay88MethodItemComponent key={method?.id}
                                                   method={method}
                                                   selectedPaymentMethod={selectedPaymentMethod}
                                                   onSetPaymentMethod={handleSetPaymentMethod}/>
                    ))}
                    {isOnlineExist && (
                        <Ipay88MethodItemComponent method={FPX}
                                                   isActive={isOnline}
                                                   selectedPaymentMethod={selectedPaymentMethod}
                                                   onSetPaymentMethod={handleSetFpx}/>
                        )}
                </div>
            )}
            {isOnline && (
                <div className="ipay88-methods-list-component-row ipay88-methods-list-component-row-group">
                    {online.map(method => (
                        <Ipay88MethodItemComponent key={method?.id}
                                                   method={method}
                                                   selectedPaymentMethod={selectedPaymentMethod}
                                                   onSetPaymentMethod={handleSetPaymentMethod}/>
                    ))}
                </div>
            )}
            {error && (
                <ErrorComponent error={error}/>
            )}

            <div className="ipay88-methods-list-component-note">
                {formatMessage(messages.note)}
            </div>
            {loading && (
                <LoaderComponent type="overlay"/>
            )}
        </div>
    );
}
