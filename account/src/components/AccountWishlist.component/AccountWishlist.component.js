import React from 'react';
import {useIntl} from 'react-intl';

import {AccountTitleComponent} from '@luft/account';
import {WishlistContainer} from '@luft/wishlist';

import {WishlistComponent} from '../../../../wishlist';

import messages from './resources/messages';

type Props = {
    /**
     * Text, which is used as a title
     */
    title?: string,
    /**
     * Callback, which is used to go back
     */
    onBack: () => void
};
export function AccountWishlistComponent(props: Props) {
    const {formatMessage} = useIntl();

    const {
        title = formatMessage(messages.title),
        onBack
    } = props;

    return (
        <div className="account-wishlist-component">
            <AccountTitleComponent title={title}
                                   onBack={onBack}/>
            <WishlistContainer as={WishlistComponent}/>
        </div>
    );
}
