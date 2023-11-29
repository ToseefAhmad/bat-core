import React from 'react';
import {useIntl} from 'react-intl';

import {ErrorComponent, LoaderComponent} from '@luft/common';
import {AddressBookFormComponent} from '@luft/address';
import {AccountTitleComponent} from '@luft/account';
import type {
    Address, User, EditAddressInput
} from '@luft/types';

import messages from '@luft/account/src/components/AccountAddressBookEdit.component/resources/messages';

type Props = {
    address: Address,
    addressSettings: Object,
    title?: string,
    error?: Error,
    loading?: boolean,
    onEditAddress?: (input: EditAddressInput) => Viewer | void,
    onBack?: () => void,
    /**
    * User information
    */
    account?: User,
    /**
     * Flag, that is responsible for user data autocomplete
     */
    isRecipientAutocompleteEnabled?: boolean
};

export function AccountAddressBookEditComponent(props: Props) {
    const {formatMessage} = useIntl();

    const {
        onEditAddress,
        title = formatMessage(messages.edit_address_title),
        onBack,
        address,
        addressSettings,
        error,
        loading,
        isRecipientAutocompleteEnabled,
        account
    } = props;

    return (
        <div className="account-address-book-edit-component">
            <AccountTitleComponent title={title}
                                   onBack={onBack}/>
            {error && <ErrorComponent error={error}/>}
            {loading && <LoaderComponent type="fixed"/>}
            <AddressBookFormComponent onSubmitAddress={onEditAddress}
                                      onBack={onBack}
                                      address={address}
                                      addressSettings={addressSettings}
                                      account={account}
                                      isRecipientAutocompleteEnabled={isRecipientAutocompleteEnabled}/>
        </div>
    );
}
