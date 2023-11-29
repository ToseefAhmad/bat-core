import React, {useCallback} from 'react';

import {useCheckoutQuery} from '@luft/quote';

import {CheckoutKtpIdComponent} from '../CheckoutKtpId.component';
import {useAddCustomerKtpToCart} from '../../../../quote';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: React.Component
};

export function CheckoutKtpIdContainer(props: Props) {
    const {
        as: Component = CheckoutKtpIdComponent,
        ...other
    } = props;

    const q = useCheckoutQuery();
    const [addKtpId, {loading, error}] = useAddCustomerKtpToCart();

    const cartId = q?.data?.cart?.id;

    const handleOnAdd = useCallback(async (code) => {
        await addKtpId({cart_id: cartId, ktp_id: code.ktp_id});
    }, [cartId]);

    if (!cartId) return null;

    return (
        <Component {...other}
                   loading={loading}
                   error={error}
                   onAdd={handleOnAdd}/>
    );
}
