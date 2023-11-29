import React, {
    useState,
    useEffect,
    useCallback
} from 'react';
import {useIntl} from 'react-intl';

import {
    RadioComponent,
    AddressPreviewComponent,
    ButtonComponent,
    LoaderComponent,
    ErrorComponent
} from '@luft/common';
import type {Address} from '@luft/types';

import messages from './resources/messages';

type Props = {
    /**
     * Flag, that either Address Book List loading is in progress or saving of new Address
     */
    loading?: boolean,
    /**
     * Error, that should be displayed on top of component.
     * Usually identifies selection failure
     * (forwarded to ErrorComponent)
     */
    error?: Error,
    /**
     * List of user addresses from address book
     */
    addresses: Address[],
    /**
     * Selected address from address book
     */
    selectedAddress: Address,
    /**
     * Address type, used to detect on checkout page
     */
    step?: 'shipping' | 'billing',
    /**
     * Callback used to navigate to Add new address page
     */
    onNavigateAdd?: (addressId: string) => void,
    /**
     * Callback used on change Address Book List entity success for logged in user
     */
    onChangeAddress?: (addressId: string) => void
}

const ADDRESSES_LIST_LENGTH = 3;

export function AddressBookListComponent(props: Props) {
    const {
        loading,
        error,
        addresses,
        selectedAddress,
        step,
        onNavigateAdd,
        onChangeAddress
    } = props;

    const [currentAddress, setCurrentAddress] = useState();
    const [showMoreAddresses, setShowMoreAddresses] = useState(true);
    const [sortedAddressesList, setSortedAddressesList] = useState(addresses);
    const {formatMessage} = useIntl();

    const sortAddressList = (currentAddresses, selectedAddressId) => {
        if (!selectedAddressId) return;

        const addressesList = [...currentAddresses];
        const selectedElement = addressesList.find((el) => el.address_id === selectedAddressId);
        const selectedIndex = addressesList.indexOf(selectedElement);

        if (selectedIndex >= 0) {
            addressesList.splice(selectedIndex, 1);
            setSortedAddressesList([selectedElement, ...addressesList]);
        } else {
            setSortedAddressesList(addressesList);
        }
    };

    const handleOnChangeAddress = useCallback((addressId) => {
        setCurrentAddress(addressId);
        if (onChangeAddress) {
            onChangeAddress(addressId);
        }
        sortAddressList(sortedAddressesList, addressId);
    }, [sortedAddressesList, onChangeAddress]);

    const handleNavigateAdd = useCallback(() => {
        if (onNavigateAdd) {
            onNavigateAdd();
        }
    }, [onNavigateAdd]);

    useEffect(() => {
        if (selectedAddress?.address_id) {
            sortAddressList(addresses, selectedAddress.address_id);
        } else {
            setSortedAddressesList(addresses);
        }
    }, [selectedAddress, addresses]);

    return (
        <div className="address-book-list-component">
            <div className="address-book-list-component-items">
                {loading && <LoaderComponent type="overlay"/>}
                {error && <ErrorComponent error={error}/>}
                {sortedAddressesList.map((address, index) => {
                    if (showMoreAddresses && index > (ADDRESSES_LIST_LENGTH - 1)) return null;

                    const isSelected = selectedAddress?.address_id === address.address_id;
                    const isChecked = currentAddress ? currentAddress === address.address_id : isSelected;

                    return (
                        <div key={address.address_id}
                             className="address-book-list-component-item">
                            <RadioComponent id={`${step}_${address.address_id}`}
                                            name={`${step}_address`}
                                            value={address.address_id}
                                            label={<AddressPreviewComponent address={address}
                                                                            className="address-book-list-component-preview"/>}
                                            checked={isChecked}
                                            onChange={() => handleOnChangeAddress(address.address_id)}/>
                        </div>
                    );
                })}
            </div>
            <div className="address-book-list-component-actions">
                {addresses.length > ADDRESSES_LIST_LENGTH && showMoreAddresses && (
                    <ButtonComponent className="address-book-list-component-actions-link"
                                     variant="link"
                                     type="button"
                                     onClick={() => setShowMoreAddresses(false)}
                                     title={formatMessage(messages.show_more)}>
                        {formatMessage(messages.show_more)}
                    </ButtonComponent>
                )}
                {addresses.length > ADDRESSES_LIST_LENGTH && !showMoreAddresses && (
                    <ButtonComponent className="address-book-list-component-actions-link"
                                     variant="link"
                                     type="button"
                                     onClick={() => setShowMoreAddresses(true)}
                                     title={formatMessage(messages.show_less)}>
                        {formatMessage(messages.show_less)}
                    </ButtonComponent>
                )}
                <ButtonComponent className="address-book-list-component-actions-btn"
                                 variant="secondary"
                                 type="button"
                                 onClick={handleNavigateAdd}
                                 title={formatMessage(messages.add_new_address)}>
                    {formatMessage(messages.add_new_address)}
                </ButtonComponent>
            </div>
        </div>
    );
}
