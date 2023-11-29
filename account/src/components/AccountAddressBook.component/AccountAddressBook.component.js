import React from 'react';
import {useIntl} from 'react-intl';

import {useScrollTo} from '@luft/common';
import type {Address} from '@luft/types';

import {AccountAddressBookListComponent, AccountAddressBookAddContainer} from '@luft/account';

import messages from '@luft/account/src/components/AccountAddressBook.component/resources/messages';

type Props = {
    title?: string,
    onBack?: () => void,
    addresses: Address[],
    onSetDefaultShippingAddress?: (address_id: string) => void,
    onSetDefaultBillingAddress?: (address_id: string) => void,
    onDeleteAddress?: (address_id: string) => void,
    onAddAddress?: () => void,
    onEditAddress?: (address_id: string) => void,
    onNavigateAddressBook?: () => void,
    onNavigateAddAddress?: () => void,
    onNavigateEditAddress?: () => void
}

export function AccountAddressBookComponent(props: Props) {
    const {formatMessage} = useIntl();
    const scrollToTop = useScrollTo();

    const handleOnAddAddress = () => scrollToTop();

    const {
        onBack,
        addresses,
        onNavigateAddAddress,
        onNavigateEditAddress,
        ...other
    } = props;

    return (
        <div className="account-address-book-component">
            {addresses && addresses.length ? (
                <AccountAddressBookListComponent {...other}
                                                 addresses={addresses}
                                                 onAddAddress={onNavigateAddAddress}
                                                 onEditAddress={onNavigateEditAddress}
                                                 onBack={onBack}/>
            ) : (
                <AccountAddressBookAddContainer {...other}
                                                title={formatMessage(messages.add_address_title)}
                                                onAddAddress={handleOnAddAddress}
                                                onBack={onBack}/>
            )}
        </div>
    );
}
