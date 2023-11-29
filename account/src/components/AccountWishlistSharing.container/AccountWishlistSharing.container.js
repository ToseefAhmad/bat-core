import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';

import {useToast} from '@luft/common';
import { useWishlistQuery } from '@luft/wishlist';

import {AccountWishlistSharingComponent} from '../AccountWishlistSharing.component';
import {useWishlistSharingMutation} from '../../hooks';

import messages from './resources/messages';

type Props = {
    as?: React.Component,
}

export function AccountWishlistSharingContainer(props: Props) {
    const {
        as: Component = AccountWishlistSharingComponent
    } = props;

    const q = useWishlistQuery();
    const {data} = q;
    const wishlistId = data?.viewer?.user?.wishlist?.id;
    const [showModal, setShwoModal] = useState(false);
    const m = useWishlistSharingMutation();
    const {formatMessage} = useIntl();
    const addToast = useToast();

    const [wishlistSharingMutation, {loading, error}] = m;
    const toggleModal = () => setShwoModal(!showModal);
    const handleWishlistSharing = useCallback(async (input) => {
        const inputData = {
            wishlist_id: wishlistId,
            ...input
        };
        const resp = await wishlistSharingMutation(inputData);
        addToast(formatMessage(messages.wishlist_shared), 'success');
        toggleModal();
        return resp;
    }, [wishlistId, wishlistSharingMutation, addToast, formatMessage, toggleModal]);

    return (
        <Component loading={loading}
                   error={error}
                   showModal={showModal}
                   onHandleModal={toggleModal}
                   onWishlistShare={handleWishlistSharing}/>
    );
}
