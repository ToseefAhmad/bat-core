import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router';
import type {ComponentType} from 'react';

import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent
} from '@luft/common';
import {useCheckoutQuery} from '@luft/quote';
import {useCartDataShippingMethod} from '@luft/shipping';
import {useIsAuthorized} from '@luft/user';

import {EspayRendererComponent} from '../EspayRenderer.component';
import {useSetEspayAndPlaceOrder} from '../../hooks';
import {useSetClientPurchase} from '../../../../checkout';
import {getStoreCodeByPathname} from '../../../../common';
import {trackCheckoutOption} from '../../../../data-layer';

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
    validateKtp?: Function
};

export function EspayRendererContainer(props: Props) {
    const {
        as: Component = EspayRendererComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        viewerKtpId,
        customerKtpId,
        validateKtp,
        ...other
    } = props;

    const history = useHistory();
    const isAuthorized = useIsAuthorized();
    const {data, error, loading, noCache} = useCheckoutQuery();
    const {data: shippingMethod} = useCartDataShippingMethod();
    const setEspayAndPlaceOrderMutation = useSetEspayAndPlaceOrder();
    const [paymentMethod, setPaymentMethod] = useState({});
    const setClientPurchase = useSetClientPurchase();

    const [
        payByEspayAndCreateOrder,
        {loading: payByEspayAndCreateOrderLoading}
    ] = setEspayAndPlaceOrderMutation;

    const cartId = data?.cart?.id;

    useEffect(() => {
        const name = paymentMethod?.product_name;

        if (!name) return;

        trackCheckoutOption({
            option: {
                'TRANSFER VIRTUAL ACCOUNT/PEMBAYARAN INSTAN': name
            },
            step: 2
        });
    }, [paymentMethod]);

    const onProcessOrder = (espay) => history.replace('/espay/process', espay);

    const handleOnSetMethodAndCreateOrder = async () => {
        try {
            const resp = await payByEspayAndCreateOrder(cartId);

            const order = resp?.data?.createOrder?.order;
            const orderId = order?.id;
            const espayData = {orderId, paymentMethod};
            const cart = data?.cart;
            const name = paymentMethod?.product_name;
            const referralCode = cart?.referral_code;

            const purchase = {
                actionField: {
                    id: orderId,
                    affiliation: 'Online Store',
                    revenue: cart?.prices.grand_total.value,
                    shipping: shippingMethod.amount.value,
                    coupon: cart?.coupons && cart.coupons[0]?.label,
                    referral_code: referralCode,
                    payment_method: `TRANSFER VIRTUAL ACCOUNT/PEMBAYARAN INSTAN - ${name}`,
                    taxes: order?.prices?.taxes
                },
                products: cart?.items
            };

            // We want this value to be persistent in storage,
            // because sometimes we need to restore it after a redirect from 3rd party
            setClientPurchase(purchase);
            onProcessOrder(espayData);

            return resp;
        } catch (e) {
            // TODO: temporary fix of white screen after useSetEspayAndPlaceOrder error
            // onProcessOrder({error: e});

            const isLockedOperation = e?.graphQLErrors?.[0]?.extensions?.category === 'graphql-operation-locked';
            const isIndonesia = getStoreCodeByPathname() === 'id';

            if (isLockedOperation && isAuthorized && isIndonesia) {
                history.push('/account', {
                    from: '/checkout',
                    isVerificationLocked: true,
                    verificationError: {...e}
                });
            } else {
                history.push('/checkout', {error: e});
            }
        }
    };

    if (awaitResult && loading) return Loading && <Loading/>;
    if (awaitResult && error) return Error && <Error error={error}/>;
    if (awaitResult && noCache) return NoCache && <NoCache/>;

    return (
        <Component {...other}
                   loading={payByEspayAndCreateOrderLoading}
                   onSave={handleOnSetMethodAndCreateOrder}
                   onSelectMethod={(method) => setPaymentMethod(method)}
                   validateKtp={validateKtp}
                   viewerKtpId={viewerKtpId}
                   customerKtpId={customerKtpId}
                   paymentMethod={paymentMethod}/>
    );
}
