import React from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';

import {ShippingAddressAddComponent} from '@luft/shipping';
import {CheckoutStepPreviewComponent} from '@luft/checkout';
import {AddressPreviewComponent} from '@luft/common';
import type {Address} from '@luft/types';

import {ShippingAddressContainer} from '../../../../shipping';

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
     * User Shipping address for representing
     */
    shippingAddress: Address,
    /**
     * User email
     */
    email?: string,
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
     * Callback on saving address
     */
    onSaveAddress?: Function,
    /**
     * Callback when user add  shipping address to address book
     */
    onAddShippingAddress?: Function,
    /**
     * Callback on change address from Address Book
     */
    onChangeAddress?: Function,
    /**
     * Callback on click
     */
    onNavigateShippingAddress?: Function,
    /**
     * Callback when user navigate to add new address
     */
    onNavigateAdd?: Function
};

export function CheckoutShippingAddressStepComponent(props: Props) {
    const {
        exposed = false,
        isAddStep = false,
        shippingAddress,
        email,
        showValidation = false,
        isAuthorized,
        addresses,
        onSaveAddress,
        onAddShippingAddress,
        onChangeAddress,
        onNavigateShippingAddress = noop,
        onNavigateAdd
    } = props;

    const {formatMessage} = useIntl();

    if (exposed) {
        return isAddStep ? (
            <ShippingAddressAddComponent onSaveAddress={onAddShippingAddress}/>
        ) : (
            <ShippingAddressContainer onNavigateAdd={onNavigateAdd}
                                      onSaveAddress={onSaveAddress}
                                      onChangeAddress={onChangeAddress}/>
        );
    }

    if (!isAuthorized || !addresses?.length) {
        return (
            <CheckoutStepPreviewComponent className="checkout-shipping-address-step-component-preview"
                                          placeholder={formatMessage(messages.placeholder)}
                                          invalid={showValidation && !shippingAddress}
                                          disabled={!email}
                                          hidden={!email}
                                          active={email && !shippingAddress}
                                          onClick={onNavigateShippingAddress}>
                {!!shippingAddress && <AddressPreviewComponent address={shippingAddress}/>}
            </CheckoutStepPreviewComponent>
        );
    }

    return (
        <ShippingAddressContainer onNavigateAdd={onNavigateAdd}
                                  onSaveAddress={onSaveAddress}
                                  onChangeAddress={onChangeAddress}
                                  onNavigateShippingAddress={onNavigateShippingAddress}/>
    );
}
