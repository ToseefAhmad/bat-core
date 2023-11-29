import React, {useEffect, useCallback} from 'react';

import {useStoreConfigQuery} from '@luft/common';
import {useCheckoutQuery} from '@luft/quote';

import {getFormattedDate, getStoreCodeByPathname} from '../../../../common';
import {useAddCustomerDobToCart} from '../../../../quote';
import {useExtractDobFromNationalIdLazyQuery} from '../../../../restrict-access';
import {CheckoutDobComponent} from '../CheckoutDob.component';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: React.Component,
    /**
     * User's ktp id
     */
    ktpId?: string
};

export function CheckoutDobContainer(props: Props) {
    const {
        as: Component = CheckoutDobComponent,
        ktpId,
        ...other
    } = props;

    const q = useCheckoutQuery();
    const extractDobQuery = useExtractDobFromNationalIdLazyQuery();
    const {data: storeConfigData} = useStoreConfigQuery();
    const [addDob, {loading, error}] = useAddCustomerDobToCart();
    const storeCode = getStoreCodeByPathname();
    const [
        extractDobFromNationalId,
        {
            data: extractDobData,
            loading: extractDobLoading,
            error: extractDobError
        }
    ] = extractDobQuery;
    const isGuestValidateKtpIdEnabled = storeConfigData?.storeConfig?.guest_validate_ktp_id;
    const extractedDob = extractDobData?.extractDobFromNationalId?.dob;
    const cartId = q?.data?.cart?.id;
    const isIDLocale = storeCode === 'id';

    const handleOnAdd = useCallback(async (date) => {
        await addDob({cart_id: cartId, dob: date});
    }, [cartId]);

    // Extract dob for ID locale if ktpId exists
    useEffect(() => {
        if (!ktpId || !isIDLocale || !isGuestValidateKtpIdEnabled) return;

        extractDobFromNationalId({variables: {national_id: ktpId}});
    }, [ktpId, isIDLocale]);

    // Add dob to Cart if ktpId was changed
    useEffect(() => {
        if (!extractedDob) return;

        // Get formatted date for current store
        const formattedDate = getFormattedDate(extractedDob);
        // Convert date to valid form for backend side
        const dobDate = getFormattedDate(formattedDate, true);

        handleOnAdd(dobDate);
    }, [extractedDob]);

    if (!cartId) return null;

    return (
        <Component {...other}
                   loading={loading || extractDobLoading}
                   error={error || extractDobError}
                   isGuestValidateKtpIdEnabled={isGuestValidateKtpIdEnabled}
                   onAdd={handleOnAdd}/>
    );
}
