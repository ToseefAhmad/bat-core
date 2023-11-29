import React, {useState} from 'react';
import {useHistory} from 'react-router';
import type {ComponentType} from 'react';

import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent
} from '@luft/common';
import type {PaymentMethod} from '@luft/types';
import {
    CreateOrderComponent,
    useCheckoutQuery,
    useCreateOrder
} from '@luft/quote';
import {useIsAuthorized} from '@luft/user';

import {useAddCustomerKtpToCart} from '../../hooks';

type Props = {
    /**
     * View for representing
     */
    as?: ComponentType<{}>,
    /**
     * Represent for loading view
     */
    loadingAs?: ComponentType<{}>,
    /**
     * Represent for error view
     */
    errorAs?: ComponentType<{}>,
    /**
     * Represent for no cache view
     */
    noCacheAs?: ComponentType<{}>,
    /**
     * Await result
     */
    awaitResult?: boolean,
    /**
     * Flag, that identifies if create order is disabled
     * */
    disabled?: boolean,
    /**
     * Callback used when user clicks create order control
     * */
    onCreateOrder?: Function,
    /**
     * Current payment method
     */
    paymentMethod?: PaymentMethod,
    /**
     * Ktp Id for registered user
     */
    viewerKtpId?: string,
    /**
     * Ktp Id for unregistered user
     */
    customerKtpId?: string,
    /**
     * Callback function to validate ktp id field
     */
    validateKtp?: Function,
    /**
     * Flag uses to redirect to account
     */
    redirectToEdit?: boolean,
    /**
     * Flag uses for validation Ktp Id before create order
     */
    validateKtpIdBeforeCreateOrder?: boolean
};

export function CreateOrderContainer(props: Props) {
    const {
        as: Component = CreateOrderComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        onCreateOrder,
        paymentMethod = {},
        viewerKtpId,
        customerKtpId,
        validateKtp,
        disabled,
        redirectToEdit,
        validateKtpIdBeforeCreateOrder,
        ...other
    } = props;

    const history = useHistory();
    const isAuthorized = useIsAuthorized();

    const {data, error, loading, noCache} = useCheckoutQuery();
    const [createOrder, {loading: createOrderLoading}] = useCreateOrder();
    const [addKtpId, {loading: addCustomerKtpLoading}] = useAddCustomerKtpToCart();

    const cartId = data?.cart?.id;
    const paymentMethods = data?.cart?.payment_methods || [];
    const currentPaymentMethod = paymentMethods.find(({code}) => paymentMethod.code === code);
    const [isDisabled, setIsDisabled] = useState(false);

    const handleOnCreateOrder = async () => {
        if (validateKtpIdBeforeCreateOrder && !viewerKtpId && !customerKtpId) {
            validateKtp();
            return;
        }
        setIsDisabled(true);
        try {
            if (viewerKtpId) {
                await addKtpId({cart_id: cartId, ktp_id: viewerKtpId});
            }
            const resp = await createOrder(cartId);
            if (onCreateOrder) onCreateOrder(resp);
            return resp;
        } catch (e) {
            const isLockedOperation = e?.graphQLErrors?.[0]?.extensions?.category === 'graphql-operation-locked';

            if (isLockedOperation && isAuthorized && redirectToEdit) {
                history.push('/account', {
                    from: '/checkout',
                    isVerificationLocked: true,
                    verificationError: {...e}
                });
            } else {
                if (onCreateOrder) onCreateOrder({error: e});
                setIsDisabled(false);
            }
        }
    };

    if (awaitResult && loading) return Loading && <Loading/>;
    if (awaitResult && error) return Error && <Error error={error}/>;
    if (awaitResult && noCache) return NoCache && <NoCache/>;

    return (
        <Component {...other}
                   disabled={disabled || isDisabled}
                   error={error}
                   loading={createOrderLoading || addCustomerKtpLoading}
                   onCreateOrder={handleOnCreateOrder}
                   validateKtp={validateKtp}
                   viewerKtpId={viewerKtpId}
                   customerKtpId={customerKtpId}
                   currentPaymentMethod={currentPaymentMethod}/>
    );
}
