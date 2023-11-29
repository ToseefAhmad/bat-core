import React from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';

import {BillingAddressContainer, BillingAddressAddComponent} from '@luft/billing';
import {CheckoutStepPreviewComponent} from '@luft/checkout';
import {AddressPreviewComponent} from '@luft/common';
import type {Address, PaymentMethod} from '@luft/types';

import messages from './resources/messages';

type Props = {
    /**
     * Is step exposed
     */
    exposed?: boolean,
    /**
     * Is add step
     */
    isAddStep?: boolean,
    /**
     * User billing address for representing
     */
    billingAddress: Address,
    /**
     * User payment method
     */
    paymentMethod: PaymentMethod,
    /**
     * User email for representation
     */
    email: string,
    /**
     * Is visible invalid message
     */
    showValidation?: boolean,
    /**
     * Flag, used to identify if there is authorized user
     */
    isAuthorized?: boolean,
    /**
     * User addresses from address book
     */
    addresses?: Address[],
    /**
     * Callback on click
     */
    onNavigateAddress?: Function,
    /**
     * Callback when user save billing address
     */
    onSaveAddress?: Function,
    /**
     * Callback when user set billing as shipping
     */
    onBillingAsShipping?: Function,
    /**
     * Mark as active view
     */
    active?: boolean,
    /**
     * Callback hen use follow to add new billing address to address book
     */
    onNavigateAdd?: Function,
    /**
     * Callback on change address from Address Book
     */
    onChangeAddress?: Function,
    /**
     * Callback when user add billing address to address book
     */
    onAddBillingAddress?: Function
};

export function CheckoutBillingAddressStepComponent(props: Props) {
    const {
        exposed = false,
        isAddStep = false,
        billingAddress,
        paymentMethod,
        email,
        showValidation = false,
        isAuthorized,
        addresses,
        onNavigateAddress = noop,
        onSaveAddress,
        onBillingAsShipping,
        active,
        onNavigateAdd,
        onChangeAddress,
        onAddBillingAddress
    } = props;

    const {formatMessage} = useIntl();

    if (exposed) {
        return isAddStep ? (
            <BillingAddressAddComponent onSaveAddress={onAddBillingAddress}/>
        ) : (
            <BillingAddressContainer onNavigateAdd={onNavigateAdd}
                                     onSaveAddress={onSaveAddress}
                                     onChangeAddress={onChangeAddress}
                                     onBillingAsShipping={onBillingAsShipping}/>
        );
    }

    if (!isAuthorized || !addresses?.length) {
        return (
            <CheckoutStepPreviewComponent className="checkout-billing-address-step-component-preview"
                                          placeholder={formatMessage(messages.placeholder)}
                                          invalid={showValidation && !billingAddress}
                                          hidden={!paymentMethod}
                                          active={typeof active === 'undefined' ? !billingAddress : active}
                                          onClick={onNavigateAddress}>

                {!!billingAddress && (
                    <AddressPreviewComponent address={billingAddress}
                                             email={email}/>
                )}
            </CheckoutStepPreviewComponent>
        );
    }

    return (
        <BillingAddressContainer onNavigateAdd={onNavigateAdd}
                                 onSaveAddress={onSaveAddress}
                                 onChangeAddress={onChangeAddress}
                                 onBillingAsShipping={onBillingAsShipping}/>
    );
}
