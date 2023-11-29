import React, {useCallback} from 'react';

import {LoaderComponent} from '@luft/common';
import {useSavePaymentMethod} from '@luft/payment';

import type {PaymentMethod} from '@luft/types';

import {Ipay88MethodsListComponent} from '../Ipay88MethodsList.component';
import {useIpay88ConfigQuery, useSavePaymentIdOnCartMutation} from '../../hooks';
import {IPAY88_CODE} from '../../utils';

type Props = {
    as?: React.Component,
    selectedPaymentMethod?: PaymentMethod
};

export function Ipay88MethodsListContainer({
    as: Component = Ipay88MethodsListComponent,
    selectedPaymentMethod
}: Props) {
    const {data: ipay88Data, loading} = useIpay88ConfigQuery();
    const [savePaymentId, {loading: loadingPaymentId, error: errorPaymentId}] = useSavePaymentIdOnCartMutation();
    const [savePaymentMethod, {loading: loadingSaveMethod, error: errorSaveMethod}] = useSavePaymentMethod();

    const handleSaveIpayMethod = useCallback(() => savePaymentMethod(IPAY88_CODE), [savePaymentMethod]);

    const {online, credit, wallet} = ipay88Data?.storeConfig?.ipay88_payment_config || {};

    if (loading) {
        return <LoaderComponent type="block"/>;
    }

    return (
        <Component online={online}
                   credit={credit}
                   wallet={wallet}
                   loading={loadingPaymentId || loadingSaveMethod}
                   error={errorPaymentId || errorSaveMethod}
                   selectedPaymentMethod={selectedPaymentMethod}
                   onSavePaymentMethodId={savePaymentId}
                   onSaveIpayMethod={handleSaveIpayMethod}/>
    );
}
