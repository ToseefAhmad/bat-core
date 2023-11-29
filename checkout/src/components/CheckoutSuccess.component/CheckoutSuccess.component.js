import React, {useEffect} from 'react';
import {useIntl} from 'react-intl';
import {useHistory, useLocation} from 'react-router-dom';

import {ButtonComponent} from '@luft/common';
import {CmsBlockContainer} from '@luft/cms';
import {
    SocialProvidersContainer,
    RegisterContainer,
    RegisterFormComponent,
    useIsAuthorized
} from '@luft/user';
import messages from '@luft/checkout/src/components/CheckoutSuccess.component/resources/messages';

import {useSetClientPurchase} from '../../hooks';
import {trackPurchase} from '../../../../data-layer';
import type {ClientPurchase} from '../../../../types';

type Props = {
    orderData: Object,
    purchase: ClientPurchase,
    continueShoppingPath?: string,
    onContinueShopping?: Function,
    registerRedirectPath?: string,
    onRegister?: Function,
    orderReferralCode?: string,
    isDisabledRegistration?: boolean
};

export function CheckoutSuccessComponent(props: Props) {
    const history = useHistory();
    const {pathname} = useLocation();
    const setClientPurchase = useSetClientPurchase();

    const {
        orderData = {},
        purchase,
        continueShoppingPath = '/',
        registerRedirectPath = '/',
        onContinueShopping = () => {
            history.replace(pathname, {});
            history.push(continueShoppingPath);
        },
        onRegister = () => {
            history.replace(pathname, {});
            history.push(registerRedirectPath, {});
        },
        orderReferralCode,
        isDisabledRegistration
    } = props;
    const {order} = orderData;
    const {id, email} = order || {};
    const first_name = order?.shipments?.[0]?.shipping_address?.firstname;
    const last_name = order?.shipments?.[0]?.shipping_address?.lastname;
    const order_ids = [id];
    const referralCode = orderReferralCode || purchase?.actionField?.referral_code;

    const {formatMessage} = useIntl();
    const isAuthorized = useIsAuthorized();

    const handleOnContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping(e);
    };

    useEffect(() => {
        if (!purchase) return;

        trackPurchase(purchase);
        setClientPurchase(null);
    }, [purchase, setClientPurchase]);

    return (
        <div className="checkout-success-component">
            <CmsBlockContainer cmsBlockId="checkout-success-top"
                               group="checkout-success-page"/>
            <div className="checkout-success-component-block">
                <div className="checkout-success-component-body">
                    <h1 className="checkout-success-component-block-title">
                        {formatMessage(messages.checkout_success_title)}
                    </h1>
                    {id && (
                        <p className="checkout-success-component-order">
                            {formatMessage(messages.order_number, {id})}
                        </p>
                    )}
                    {email && (
                        <p className="checkout-success-component-confirmation">
                            {formatMessage(messages.confirmation_text, {email})}
                        </p>
                    )}
                    <ButtonComponent className="checkout-success-component-continue"
                                     as="a"
                                     href={continueShoppingPath}
                                     title={formatMessage(messages.continue_shopping)}
                                     onClick={(e) => handleOnContinueShopping(e)}>
                        {formatMessage(messages.continue_shopping)}
                    </ButtonComponent>
                </div>
            </div>
            {!isAuthorized && !isDisabledRegistration && (
                <div className="checkout-success-component-block">
                    <div className="checkout-success-component-body">
                        <div className="checkout-success-component-block-title">
                            {formatMessage(messages.register_title)}
                        </div>
                        <p className="checkout-success-component-text">
                            {formatMessage(messages.register_text)}
                        </p>
                        <RegisterContainer as={RegisterFormComponent}
                                           onRegister={onRegister}
                                           referralCode={referralCode}
                                           registerInput={{first_name, last_name, email, order_ids}}
                                           isEmailPredefined={true}/>
                        <SocialProvidersContainer orderIds={order_ids}/>
                    </div>
                </div>
            )}
            <CmsBlockContainer cmsBlockId="checkout-success-bottom"
                               group="checkout-success-page"/>
        </div>
    );
}
