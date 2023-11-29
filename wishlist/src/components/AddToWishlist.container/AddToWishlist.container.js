import React, {
    useCallback,
    useMemo,
    useState
} from 'react';
import {useIntl} from 'react-intl';
import {useHistory, useLocation} from 'react-router';

import {useToast} from '@luft/common';
import {isUnauthorized} from '@luft/user';
import type {
    BundleOptionInput,
    Product,
    Variation
} from '@luft/types';
import {
    AddToWishlistComponent,
    useAddWishlistItems
} from '@luft/wishlist';

import messages from '@luft/wishlist/src/components/AddToWishlist.container/resources/messages';

import {getFormattedInputToAdd} from '../../utils';

import {EngravedOptionsInfo} from '../../../../types';

type Props = {
    /**
     * View for representing
     */
    as?: React.Component,
    /**
     * Product which will be added to wishlist
     */
    product: Product,
    /**
     * Selected quantity of product
     */
    qty: number,
    /**
     * Product selected engraving options
     */
    engravedOptions?: EngravedOptionsInfo,
    /**
     * Product variation, used for 'CONFIGURABLE' products
     */
    variation?: Variation,
    /**
     * An array with 'EDITABLE_BUNDLE' selected options
     */
    editableBundleOptions?: BundleOptionInput[],
    /**
     * Gift card options, used for 'GIFTCARD' products
     */
    giftCard?: Object,
    /**
     * Group set, used for 'GROUPED' products
     */
    groupSet?: { product: Product, qty: number }[],
    /**
     * Apollo Client `useMutation` hook options
     */
    addMutationOptions?: Object,
    /**
     * Product identifier, used for moving product from cart to wishlist
     */
    quoteItemId?: string | number,
    /**
     * Flag, used to identify if there is authorized user
     */
    isAuthorized: boolean,
    /**
     * A path to proceed to login
     */
    navigateLoginPath?: string,
    /**
     * Success toast message on adding or moving item to the Wishlist
     */
    successMessage?: Object,
    /**
     * Callback used when add to wishlist finished successfully
     */
    onAddToWishlist?: () => void,
    /**
     * Callback used when add to wishlist finished successfully for unauthorized user
     */
    onUnauthorizedAddToWishlist?: () => void,
    /**
     * Callback when user navigated to login
     */
    onNavigateLogin?: () => void
};

/**
 * @module @luft/wishlist
 * @scope @luft/wishlist
 * @exports AddToWishlistContainer
 * @function AddToWishlistContainer
 * @kind Container
 *
 * @description
 * Container component, used to add product to wishlist
 */

/**
 * @typedef {React.Component} AddToWishlistPresentationComponent
 * @kind Component
 *
 * @description
 * Presentation component, that consumes data from AddToWishlistContainer
 *
 * @summary
 * List of props, passed to presentation component by container
 *
 * @param {React.Component|AddToWishlistPresentationComponent} as=AddToWishlistComponent - Presentation
 * component, that will consume callbacks from this container component
 * @param {boolean} loading - Loading state of mutation
 * @param {Error} error - Error occurred while adding item
 * @param {Function} onAddToWishlist - Callback on add item to wishlist
 */
export function AddToWishlistContainer(
    {
        as: Component = AddToWishlistComponent,
        product = {},
        qty,
        variation,
        engravedOptions = {},
        editableBundleOptions,
        giftCard,
        groupSet = [],
        quoteItemId = null,
        addMutationOptions = {},
        isAuthorized,
        successMessage = messages.wishlist_success,
        onAddToWishlist,
        onUnauthorizedAddToWishlist,
        ...other
    }: Props) {
    const {
        type,
        id,
        name
    } = product;

    const history = useHistory();

    const {__typename, ...productEngravedOptions} = engravedOptions;
    const isEngraving = productEngravedOptions?.psn_is_personalisable;

    const wishlistInput = useMemo(() => (
        {
            variation,
            editableBundleOptions,
            quoteItemId,
            giftCard,
            groupSet,
            ...(isEngraving && {engraved_options: productEngravedOptions})
        }
    ), [
        editableBundleOptions,
        giftCard,
        groupSet,
        quoteItemId,
        variation,
        productEngravedOptions,
        isEngraving
    ]);

    const [error, setError] = useState();
    const [addItem, {loading}] = useAddWishlistItems(type, addMutationOptions);
    const {formatMessage} = useIntl();
    const addToast = useToast();
    const {pathname, search} = useLocation();
    const currentLocation = pathname + search;

    const handleAddToWishlist = useCallback(async () => {
        if (isAuthorized) {
            try {
                const resp = await addItem(id, qty, wishlistInput);
                setError(null);
                addToast(formatMessage(successMessage, {name}), 'success');
                if (onAddToWishlist) onAddToWishlist(resp);
                return resp;
            } catch (e) {
                const {networkError, graphQLErrors = []} = e;
                if (isUnauthorized(networkError) || graphQLErrors.find(isUnauthorized)) {
                    if (onUnauthorizedAddToWishlist) onUnauthorizedAddToWishlist();
                    if (onAddToWishlist) onAddToWishlist();
                }
                setError(e);
                return e;
            }
        } else {
            if (onUnauthorizedAddToWishlist) onUnauthorizedAddToWishlist();
            if (onAddToWishlist) onAddToWishlist();
            const productData = {...product, ...(isEngraving && {engraved_options: productEngravedOptions})};

            history.push('/account/login', {
                input: {
                    [`wishlist_items_${type.toLowerCase()}`]: getFormattedInputToAdd(type, id, 1, productData),
                    product_name: name
                },
                from: currentLocation
            });
        }
    }, [
        addItem,
        addToast,
        productEngravedOptions,
        formatMessage,
        history,
        id,
        isAuthorized,
        isEngraving,
        name,
        onAddToWishlist,
        onUnauthorizedAddToWishlist,
        product,
        qty,
        type,
        wishlistInput,
        successMessage,
        currentLocation
    ]);

    return (
        <Component {...other}
                   loading={loading}
                   error={error}
                   onAddToWishlist={handleAddToWishlist}/>
    );
}
