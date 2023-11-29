import React, {
    useCallback,
    useState,
    useMemo
} from 'react';
import {useHistory} from 'react-router';
import {useIntl} from 'react-intl';
import {isUndefined} from 'lodash';

import {
    LoaderComponent,
    ErrorComponent,
    ButtonComponent
} from '@luft/common';
import {MoveToWishlistComponent, AddToWishlistContainer} from '@luft/wishlist';
import {useIsAuthorized} from '@luft/user';
import {useProductRenderer} from '@luft/product';
import type {CartItem, Product} from '@luft/types';

import {
    getLinkToUpdateProduct,
    getPreselectedEditableBundleOptionsFromItem as getEditableBundleOptions,
    useIsEditableBundle
} from '../../../../product';
import type {EngravedOptionsInfo} from '../../../../types';

import messages from './resources/messages';

type Props = {
    /**
     * Cart item
     * */
    item: CartItem,
    /**
     * Loading state, usually identifies fetch data processing
     */
    loading?: boolean,
    /**
     * Rendering move to wishlist action on condition
     */
    showMoveToWishlistAction: boolean,
    /**
     * Error, that should be displayed on top of component, usually identifies fetch data failure
     */
    error?: Error,
    /**
     * Engraving information
     */
    engravingOptions?: EngravedOptionsInfo,
    /**
     * Callback on edit item
     */
    onItemUpdate?: (Product, ProductContextState) => void,
    /**
     * Callback on delete item
     */
    onItemRemove?: (showSuccessMessage?: boolean) => void,
    /**
     * Callback, which is fired after updating the product's quantity
     */
    onItemUpdateQty?: (qty: number) => void
};

/**
 * Cart item component
 * */
export function CartItemComponent(
    {
        item,
        loading,
        showMoveToWishlistAction = true,
        error,
        engravingOptions,
        onItemUpdate,
        onItemUpdateQty,
        onItemRemove
    }: Props): React.Component {
    const {formatMessage} = useIntl();
    const history = useHistory();
    const [isOpenedVariationMenu, setIsOpenedVariationMenu] = useState(false);
    const ProductPaneComponent = useProductRenderer('ProductPaneComponent');
    const isLoggedIn = useIsAuthorized();

    const hasVariationAttributes = !!item?.product?.variation_attributes;
    const showEditButton = hasVariationAttributes && !isOpenedVariationMenu;
    const hasEngravingOptions = item?.engraved_options?.psn_is_personalisable;
    const showEditBundleButton = useIsEditableBundle(item?.product?.bundled_products);
    const bundleSelectedOptions = item.bundle_info?.selected_options;
    const updateLink = getLinkToUpdateProduct(item);

    const editableBundleOptions = useMemo(() => {
        if (!bundleSelectedOptions) return null;

        return getEditableBundleOptions(bundleSelectedOptions);
    }, [bundleSelectedOptions]);

    const handleOnItemUpdate = useCallback(async (product, productState) => {
        if (!isUndefined(onItemUpdate)) {
            await onItemUpdate(productState);
            setIsOpenedVariationMenu(false);
        }
    }, [onItemUpdate]);

    const handleOnAddToWishlistCallback = useCallback(() => {
        if (!isUndefined(onItemRemove)) {
            onItemRemove(false);
        }
    }, [onItemRemove]);

    return !!item && (
        <div className="cart-item-component">
            {loading && <LoaderComponent type="overlay"/>}
            {error && <ErrorComponent error={error}/>}
            <div className="cart-item-component-content">
                <div className="cart-item-component-remove-block">
                    <ButtonComponent title={formatMessage(messages.remove)}
                                     className="cart-item-component-remove-button"
                                     onClick={onItemRemove}/>
                </div>
                <ProductPaneComponent product={item.product}
                                      variation={item.configurable_variation}
                                      engravingOptions={engravingOptions}
                                      giftCard={item.gift_card}
                                      bundleInfo={item.bundle_info}
                                      qty={item.quantity}
                                      priceLabel={item.price_label}
                                      showSku={false}
                                      showQty={false}
                                      showQtyEdit={true}
                                      showVariationMenu={isOpenedVariationMenu}
                                      onItemUpdateQty={onItemUpdateQty}
                                      onItemUpdate={handleOnItemUpdate}/>
                {showEditButton && (
                    <ButtonComponent title={formatMessage(messages.edit)}
                                     className="cart-item-component-edit-button"
                                     onClick={() => setIsOpenedVariationMenu(true)}/>
                )}
                {(hasEngravingOptions || showEditBundleButton) && (
                    <ButtonComponent title={formatMessage(messages.edit)}
                                     className="cart-item-component-edit-button"
                                     onClick={() => history.push(updateLink)}/>
                )}

            </div>
            {(isLoggedIn && showMoveToWishlistAction) && (
                <AddToWishlistContainer as={MoveToWishlistComponent}
                                        product={item.product}
                                        qty={item.quantity}
                                        editableBundleOptions={editableBundleOptions}
                                        engravedOptions={item?.engraved_options}
                                        variation={item?.configurable_variation}
                                        isAuthorized={isLoggedIn}
                                        successMessage={messages.move_wishlist_success}
                                        onAddToWishlist={handleOnAddToWishlistCallback}/>
            )}
        </div>
    );
}
