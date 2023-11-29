import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import type {ComponentType} from 'react';

import {useCheckoutOrderQuery} from '@luft/quote';
import {parseUrlQuery} from '@luft/util';
import {
    ErrorComponent,
    LoaderComponent,
    useStoreConfigQuery
} from '@luft/common';

import {CheckoutSuccessComponent} from '../CheckoutSuccess.component';
import {useClientPurchaseQuery} from '../../hooks';

type Props = {
    as?: ComponentType<{}>,
    redirectPath?: string,
    onRedirect?: Function,
    continueShoppingPath?: string,
    onContinueShopping?: Function,
    registerRedirectPath?: string,
    onRegister?: Function,
    awaitResult?: boolean
};

export function CheckoutSuccessContainer(props: Props) {
    const history = useHistory();
    const {state = {}, search} = useLocation();

    const {
        as: Component = CheckoutSuccessComponent,
        redirectPath = '/cart',
        onRedirect = () => history.replace(redirectPath),
        awaitResult = true
    } = props;

    const {referralCode} = state;
    const {token} = parseUrlQuery(search) || {};

    // if no token, it will be skipped
    const {data, loading, error} = useCheckoutOrderQuery(token);
    const orderData = token ? data?.checkoutOrder : state.payload?.data?.createOrder;

    const {data: storeConfigData} = useStoreConfigQuery();
    const isDisabledRegistration = storeConfigData?.storeConfig?.is_registration_disabled;

    const {data: purchaseData} = useClientPurchaseQuery();
    const purchase = purchaseData?.purchase;

    if (!loading && !orderData && !error) {
        onRedirect();

        return null;
    }

    if (awaitResult && loading) return <LoaderComponent type="overlay"/>;
    if (awaitResult && error) return <ErrorComponent error={error}/>;

    return (
        <Component {...props}
                   loading={loading}
                   error={error}
                   orderData={orderData}
                   purchase={purchase}
                   orderReferralCode={referralCode}
                   isDisabledRegistration={isDisabledRegistration}/>
    );
}
