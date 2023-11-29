import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';
import {useLocation} from 'react-router';

import {ErrorComponent} from '@luft/common';
import {
    CartNavigationComponent,
    CartHeaderContainer,
    CartDetailsComponent
} from '@luft/cart';
import {CmsBlockContainer} from '@luft/cms';
import type {Cart} from '@luft/types';

import messages from '@luft/cart/src/components/CartInfo.component/resources/messages';

import custom_messages from './resources/messages';

type Props = {
    /**
     * User Cart, containing all the required information
     * */
    cart?: Cart,
    /**
     * Callback on navigate to checkout
     */
    onNavigateToCheckout?: Function
};

export function CartInfoComponent(props: Props) {
    const {
        cart,
        onNavigateToCheckout,
        ...other
    } = props;

    const {formatMessage} = useIntl();
    const {state = {}, search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const ipay88PaymentFailed = queryParams.get('payment_failed');
    const ipay88PaymentErrorMessage = queryParams.get('error_message');

    const ipay88FailedErrorMessage = useMemo(() => {
        if (ipay88PaymentFailed !== '1') return null;

        return ipay88PaymentErrorMessage || formatMessage(custom_messages.failed_payment_message);
    }, [
        ipay88PaymentErrorMessage,
        ipay88PaymentFailed,
        formatMessage
    ]);

    const {paymentError: paymentErrorMessage} = state;
    const hasProductsInCart = !!cart?.items?.length;
    const isOutOfStock = cart?.items?.some(i => !i?.product?.inventory?.in_stock);
    const limitErrors = cart?.error_info;
    const {has_error: hasLimitError, errors: limitErrorsMessages} = limitErrors || {};
    const paymentError = paymentErrorMessage || ipay88FailedErrorMessage;

    return (
        <div className="cart-info-component">
            <div className="cart-info-component-header-wrapper">
                <CartHeaderContainer/>
            </div>
            <CartNavigationComponent selected="cart"
                                     isCheckoutDisabled={!hasProductsInCart}
                                     onNavigateCheckout={onNavigateToCheckout}/>

            {hasProductsInCart ? (
                <>
                    {isOutOfStock && <ErrorComponent error={{message: formatMessage(messages.out_of_stock_items)}}/>}
                    {paymentError && <ErrorComponent error={{message: paymentError}}/>}
                    {hasLimitError && <ErrorComponent error={{message: limitErrorsMessages?.[0]}}/>}
                    <CartDetailsComponent {...other}
                                          onNavigateToCheckout={onNavigateToCheckout}
                                          cart={cart}/>
                </>
            ) : (
                <CmsBlockContainer cmsBlockId="cart-continue-shopping"/>
            )}
        </div>
    );
}
