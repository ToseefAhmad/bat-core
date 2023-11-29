import React from 'react';
import {useIntl} from 'react-intl';

import {
    ButtonComponent,
    ErrorComponent,
    LoaderComponent
} from '@luft/common';

import messages from './resources/messages';

type Props = {
    /**
     * A boolean indicating whether the updating data is in progress
     */
    loading?: boolean,
    /**
     * Error adding wishlist items to cart
     */
    error?: Error,
    /**
     * Callback to add all items to cart
     */
    onAddToCart: () => void
};

export function AccountWishlistToCartComponent({loading, error, onAddToCart}: Props) {
    const {formatMessage} = useIntl();

    return (
        <div className="account-wishlist-to-cart-component">
            <ButtonComponent className="account-wishlist-to-cart-component-action"
                             disabled={loading}
                             onClick={onAddToCart}>
                <span className="account-wishlist-to-cart-component-label">
                    {formatMessage(messages.button_title)}
                </span>
                {loading && (
                    <LoaderComponent size="sm"
                                     type="attached"/>
                )}
            </ButtonComponent>
            {error && <ErrorComponent error={error}/>}
        </div>
    );
}
