import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';
import {useHistory} from 'react-router';

import {useToast} from '@luft/common';
import {useUpdateCartItem} from '@luft/quote';
import {useProductContextField, useProductState} from '@luft/product';
import {useUpdateWishlistItems} from '@luft/wishlist';
import messages from '@luft/cart/src/components/CartItem.container/resources/messages';

import {ProductEngravingSummaryComponent} from '../ProductEngravingSummary.component';
import {getEngravingOptions} from '../../utils';

type Props = {
    /**
     * Presentation component, that will consume data and callbacks from this container component
     */
    as?: React.Component,
    /**
     * Cart item identifier (used to update engraved product)
     */
    cartItemId?: string,
    /**
     * Wishlist item identifier (used to update engraved product)
     */
    wishlistItemId?: string
}

export function ProductEngravingSummaryContainer(
    {
        as: Component = ProductEngravingSummaryComponent,
        cartItemId,
        wishlistItemId,
        ...other
    }: Props) {
    const addToast = useToast();
    const {formatMessage} = useIntl();
    const history = useHistory();
    const type = useProductContextField('product.type');
    const name = useProductContextField('product.name');
    const [qty] = useProductState('qty');
    const [selectedEngravingOptions] = useProductState('selectedEngravingOptions');

    const [updateCartItem, {loading: updateLoading, error: updateError}] = useUpdateCartItem(type);
    const [
        updateWishlistItem,
        {loading: updateWishlistLoading, error: updateWishlistError}
    ] = useUpdateWishlistItems(type);

    const updateType = (!!cartItemId && 'cart') || (!!wishlistItemId && 'wishlist');

    const handleOnCartItemUpdate = useCallback(async () => {
        const engravingOptions = getEngravingOptions(selectedEngravingOptions);

        try {
            await updateCartItem(cartItemId, {qty, engraved_options: engravingOptions?.[0]});
            addToast(formatMessage(messages.update_success, {name}), 'success');
            history.replace('/cart');
        } catch (e) {}
    }, [
        cartItemId,
        qty,
        name,
        selectedEngravingOptions
    ]);

    const handleOnWishlistItemUpdate = useCallback(async () => {
        const engravingOptions = getEngravingOptions(selectedEngravingOptions);

        try {
            await updateWishlistItem(wishlistItemId, {qty, engraved_options: engravingOptions?.[0]});
            addToast(formatMessage(messages.update_success, {name}), 'success');
            history.replace('/account/wishlist');
        } catch (e) {}
    }, [
        selectedEngravingOptions,
        updateWishlistItem,
        wishlistItemId,
        qty,
        addToast,
        formatMessage,
        name,
        history
    ]);

    const handleUpdate = wishlistItemId ? handleOnWishlistItemUpdate : handleOnCartItemUpdate;

    return (
        <Component {...other}
                   updateType={updateType}
                   updateLoading={updateLoading || updateWishlistLoading}
                   updateError={updateError || updateWishlistError}
                   onItemUpdate={handleUpdate}/>
    );
}
