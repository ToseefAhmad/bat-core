import React, {useState, useEffect} from 'react';
import {noop} from 'lodash';
import type {ComponentType} from 'react';

import {useCheckoutQuery} from '@luft/quote';

import {CheckoutReferralComponent} from '../CheckoutReferral.component';
import {
    useAddReferralCodeToCart,
    useRemoveCustomerReferralCodeFromCart,
    useAddCustomerNoteToCart,
    useRemoveCustomerNoteFromCart
} from '../../../../quote';
import {getReferralManager} from '../../../../user';

type Props = {
    as?: ComponentType<{}>,
    isReferralProgramEnabled?: boolean,
    onAdd?: Function,
    onRemove?: Function
};

export function CheckoutReferralContainer(props: Props) {
    const {
        as: Component = CheckoutReferralComponent,
        isReferralProgramEnabled,
        onAdd = noop,
        onRemove = noop
    } = props;

    const q = useCheckoutQuery();

    const [
        addReferralCode,
        {loading: addCodeLoading, error: addCodeError}
    ] = useAddReferralCodeToCart();
    const [
        removeReferralCode,
        {loading: removeCodeLoading, error: removeCodeError}
    ] = useRemoveCustomerReferralCodeFromCart();
    const [
        addCustomerNote,
        {loading: addNoteLoading, error: addNoteError}
    ] = useAddCustomerNoteToCart();
    const [
        removeCustomerNote,
        {loading: removeNoteLoading, error: removeNoteError}
    ] = useRemoveCustomerNoteFromCart();

    const cartId = q.data?.cart?.id;
    const cartReferralCode = q.data?.cart?.referral_code?.referral_code;
    const customerNote = q.data?.cart?.customer_note?.[0]?.code;

    const [referralCode, setReferralCode] = useState();
    const {setCode, clearCode} = getReferralManager();

    const handleOnAddReferralCode = async (code) => {
        const resp = await addReferralCode({cart_id: cartId, referral_code: code});
        setReferralCode(code);
        onAdd(code);
        setCode(code);
        return resp;
    };

    const handleOnRemoveReferralCode = async (code) => {
        const resp = await removeReferralCode({cart_id: cartId});
        setReferralCode(null);
        onRemove(code);
        clearCode();
        return resp;
    };

    const handleOnAddCustomerNote = async (code) => {
        const resp = await addCustomerNote({cart_id: cartId, code});
        onAdd(code);
        return resp;
    };

    const handleOnRemoveCustomerNote = async (code) => {
        const resp = await removeCustomerNote({cart_id: cartId, code});
        onRemove(code);
        return resp;
    };

    useEffect(() => {
        const code = isReferralProgramEnabled ? cartReferralCode : customerNote;

        setReferralCode(code);
    }, [cartReferralCode, customerNote, isReferralProgramEnabled]);

    const loading = addCodeLoading || removeCodeLoading || addNoteLoading || removeNoteLoading;
    const error = addCodeError || removeCodeError || addNoteError || removeNoteError;

    return (
        <Component referralCode={referralCode}
                   loading={loading}
                   error={error}
                   onAdd={isReferralProgramEnabled ? handleOnAddReferralCode : handleOnAddCustomerNote}
                   onRemove={isReferralProgramEnabled ? handleOnRemoveReferralCode : handleOnRemoveCustomerNote}/>
    );
}
