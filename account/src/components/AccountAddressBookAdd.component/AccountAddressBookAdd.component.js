import React from 'react';
import {useIntl} from 'react-intl';

import {ErrorComponent, LoaderComponent} from '@luft/common';
import {AddressBookFormComponent} from '@luft/address';
import {AccountTitleComponent} from '@luft/account';
import type {Address, User} from '@luft/types';

import messages from '@luft/account/src/components/AccountAddressBookAdd.component/resources/messages';

type Props = {
    onAddAddress?: () => void,
    title?: string,
    addresses: Address[],
    onBack?: () => void,
    error?: Error,
    loading?: Boolean,
    addressSettings?: Object,
    /**
     * User information
     */
    account?: User,
    /**
     * Flag, that is responsible for user data autocomplete
     */
    isRecipientAutocompleteEnabled?: boolean
};

export function AccountAddressBookAddComponent(props: Props) {
    const {formatMessage} = useIntl();

    const {
        onAddAddress,
        title = formatMessage(messages.add_address_title),
        addresses,
        onBack,
        error,
        loading,
        addressSettings,
        isRecipientAutocompleteEnabled,
        account
    } = props;
    const altBack = !!addresses && addresses.length > 0 && formatMessage(messages.back);

    // Pre-populate address fields if it's enabled in admin
    const address = isRecipientAutocompleteEnabled ? {
        firstname: account?.first_name,
        lastname: account?.last_name,
        telephone: account?.phone_number
    } : {};

    return (
        <div className="account-address-book-add-component">
            <AccountTitleComponent title={title}
                                   onBack={onBack}
                                   altBack={altBack}/>
            {error && <ErrorComponent error={error}/>}
            {loading && <LoaderComponent type="fixed"
                                         className="account-address-book-add-component-loader"/>}
            <AddressBookFormComponent addressSettings={addressSettings}
                                      onSubmitAddress={onAddAddress}
                                      onBack={onBack}
                                      account={account}
                                      address={address}
                                      isRecipientAutocompleteEnabled={isRecipientAutocompleteEnabled}/>
        </div>
    );
}
