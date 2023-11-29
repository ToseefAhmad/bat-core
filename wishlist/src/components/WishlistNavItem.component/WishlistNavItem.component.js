import React from 'react';
import {useIntl} from 'react-intl';

import {ButtonComponent} from '@luft/common';

import messages from './resources/messages';

type Props = {
    onNavigate: () => void
};

export function WishlistNavItemComponent({onNavigate}: Props) {
    const {formatMessage} = useIntl();

    return (
        <div className="wishlist-nav-item-component">
            <ButtonComponent className="wishlist-nav-item-component-icon"
                             onClick={onNavigate}
                             inline={true}
                             title={formatMessage(messages.wishlist_title)}
                             aria-label={formatMessage(messages.wishlist_title)}
                             variant="primary-link">
                <span className="wishlist-nav-item-component-icon-text">
                    {formatMessage(messages.wishlist_title)}
                </span>
            </ButtonComponent>
        </div>
    );
}
