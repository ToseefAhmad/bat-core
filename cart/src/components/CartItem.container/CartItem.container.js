import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';
import {noop} from 'lodash';

import {
    useCartIdQuery,
    useRemoveCartItem,
    useUpdateCartItem
} from '@luft/quote';
import {useToast} from '@luft/common';

import messages from '@luft/cart/src/components/CartItem.container/resources/messages';

import {CartItemComponent} from '../CartItem.component';
import {trackAddToCart, trackRemoveFromCart} from '../../../../data-layer';
import {getPreselectedEditableBundleOptionsFromItem as getEditableBundleOptions} from '../../../../product';
import type {CartItemType} from '../../../../types';

type Props = {
    item: CartItemType,
    loading?: boolean,
    error?: Error,
    as?: React.Component,
    onItemUpdate?: Function,
    onItemRemove?: Function
};

export function CartItemContainer(props: Props) {
    const {
        item,
        loading,
        error: itemError,
        as: Component = CartItemComponent,
        onItemUpdate = noop,
        onItemRemove = noop,
        ...other
    } = props;
    const {
        product,
        cart_item_id,
        configurable_variation,
        engraved_options
    } = item;
    const {type, name} = product || {};

    const {formatMessage} = useIntl();
    const addToast = useToast();
    const [updateItem, {loading: updateLoading, error: updateError}] = useUpdateCartItem(type);
    const [removeItem, {loading: removeLoading, error: removeError}] = useRemoveCartItem();
    const q = useCartIdQuery();
    const cartId = q?.data?.cart?.id;

    const handleOnItemUpdate = useCallback(async (productState) => {
        try {
            const resp = await updateItem(cart_item_id, productState);
            onItemUpdate(resp);
            const {qty, variation} = productState;
            trackAddToCart({data: resp.data, product, qty, variation});
            return resp;
        } catch (e) {}
    }, [cart_item_id, updateItem, onItemUpdate, product]);

    const handleOnItemRemove = useCallback(async (showSuccessMessage = true) => {
        try {
            const resp = await removeItem(cartId, cart_item_id);
            if (showSuccessMessage) {
                addToast(formatMessage(messages.remove_success, {name}), 'success');
            }
            trackRemoveFromCart(item);
            onItemRemove(resp);
            return resp;
        } catch (e) {}
    }, [cartId, cart_item_id, item, name, removeItem, onItemRemove, addToast, formatMessage]);

    const handleUpdateItemQty = useCallback((qty) => {
        const editableBundleOptions = getEditableBundleOptions(item?.bundle_info?.selected_options);

        handleOnItemUpdate({qty, variation: configurable_variation, editableBundleOptions});
    }, [handleOnItemUpdate, configurable_variation, item]);

    const isLoading = loading || updateLoading || removeLoading;
    const error = q.error || itemError || updateError || removeError;

    return (
        <Component {...other}
                   item={item}
                   loading={isLoading}
                   error={error}
                   engravingOptions={engraved_options}
                   onItemUpdateQty={handleUpdateItemQty}
                   onItemUpdate={handleOnItemUpdate}
                   onItemRemove={handleOnItemRemove}/>
    );
}
