import React, {
    useCallback,
    useMemo,
    useState
} from 'react';
import {useIntl} from 'react-intl';
import {useHistory} from 'react-router';

import {
    ButtonComponent,
    ConfirmationModalComponent,
    ErrorComponent,
    LoaderComponent,
    useStoreConfigQuery
} from '@luft/common';
import {
    ProductProvider,
    useProductRenderer,
    getPreselectedEditableBundleOptionsFromItem
} from '@luft/product';
import {getProductNoOptions} from '@luft/wishlist';

import messages from '@luft/wishlist/src/components/WishlistItem.component/resources/messages';

import type {
    Wishlist,
    WishlistItem,
    Cart,
    RemoveItemFromWishlistInput
} from '@luft/types';

import {useIsEditableBundle} from '../../../../product';
import {getLinkToUpdateProduct, getBundleProductInStock} from '../../utils';

import custom_messages from './resources/messages';

import type {WishlistCartUserInputError} from '../../../../types';

type Props = {
    /**
     * Wishlist item
     */
    item: WishlistItem,
    /**
     *  Is loading status
     */
    loading?: boolean,
    /**
     * Error occurred
     */
    error?: Error,
    /**
     * List of add to cart errors
     */
    addToCartErrors?: [WishlistCartUserInputError],
    /**
     * Callback used to update item in wishlist
     */
    onItemUpdate?: (Product, ProductContextState) => Wishlist | void,
    /**
     * Callback used to remove item from wishlist
     */
    onItemRemove?: (input: RemoveItemFromWishlistInput) => Wishlist | void,
    /**
     * Callback used to add item from wishlist to cart
     */
    onItemAddToCart?: () => Cart | void,
    /**
     * Callback used to update quantity of wislist item
     */
    onItemUpdateQty?: (quantity: number) => void
}

/**
 * Wishlist item renderer
 */
export function WishlistItemComponent(
    {
        item,
        loading,
        error,
        addToCartErrors,
        onItemUpdate,
        onItemRemove,
        onItemAddToCart,
        onItemUpdateQty
    }: Props) {
    const {
        product,
        configurable_variation: variation,
        engraved_options: engravingOptions,
        gift_card: giftCard,
        product_set: productSet,
        bundle_info: bundleInfo,
        quantity: qty
    } = item || {};

    const {data} = useStoreConfigQuery();
    const history = useHistory();
    const groupSet = useMemo(() => productSet?.map(p => ({
        product: p,
        qty: p.wishlist_qty_group
    })), [productSet]);
    const initialState = useMemo(() => ({
        variation,
        giftCard,
        groupSet,
        bundleInfo,
        editableBundleOptions: getPreselectedEditableBundleOptionsFromItem(bundleInfo?.selected_options),
        qty
    }), [variation, giftCard, groupSet, bundleInfo, qty]);
    // fulfill base product with variation props
    const initialProduct = useMemo(() => (
        {...product, ...variation?.product}
    ), [product, variation?.product]);
    const {formatMessage} = useIntl();
    const [isEdit, setIsEdit] = useState(false);
    const [isConfirmRemove, setIsConfirmRemove] = useState(false);

    const ProductPaneComponent = useProductRenderer('ProductPaneComponent');
    const noOptions = getProductNoOptions(item || {}) || !getBundleProductInStock(item);

    const isConfigurableProduct = product.type === 'CONFIGURABLE';
    const isEngravingProduct = product?.psn_is_personalisable && data?.storeConfig?.is_enabled_device_psn;
    const showEditBundleButton = useIsEditableBundle(item?.product?.bundled_products);
    const updateLink = getLinkToUpdateProduct(item);

    const inStock = useMemo(() => {
        if (!variation) {
            return product?.inventory?.in_stock;
        }

        return variation?.product?.inventory?.in_stock;
    }, [product, variation]);

    const showEditButton = useMemo(() => (
        isEngravingProduct || showEditBundleButton || noOptions || variation
    ), [isEngravingProduct, showEditBundleButton, variation, noOptions]);

    const errorAddToCart = useMemo(() => (
        addToCartErrors?.find((err) => err?.wishlistItemId === item.id)
    ), [item, addToCartErrors]);

    const itemError = useMemo(() => error || errorAddToCart, [error, errorAddToCart]);

    const handleOnItemUpdate = useCallback((newProduct, productState) => {
        setIsEdit(false);
        if (onItemUpdate) onItemUpdate(newProduct, productState);
    }, [onItemUpdate]);

    const handleOnItemRemove = useCallback(() => {
        setIsConfirmRemove(false);
        setIsEdit(false);
        if (onItemRemove) onItemRemove({item_id: item.id});
    }, [onItemRemove, item.id]);

    const handleOnCancel = useCallback(() => {
        setIsConfirmRemove(false);
        setIsEdit(false);
    }, []);

    const handleEdit = useCallback(() => {
        if (isConfigurableProduct) {
            setIsEdit(true);
        } else {
            history.push(updateLink);
        }
    }, [history, updateLink, isConfigurableProduct]);

    return !!item && (
        <div className="wishlist-item-component">
            {loading && <LoaderComponent type="overlay"/>}
            {itemError && <ErrorComponent error={itemError}/>}
            <ProductProvider originalProduct={product}
                             product={initialProduct}
                             initialState={initialState}>
                <div className="wishlist-item-component-content">
                    <div className="wishlist-item-component-remove-block">
                        <ButtonComponent title={formatMessage(messages.wishlist_item_remove_title)}
                                         className="wishlist-item-component-remove-button"
                                         onClick={() => setIsConfirmRemove(true)}/>
                    </div>
                    <ProductPaneComponent product={product}
                                          variation={variation}
                                          engravingOptions={engravingOptions}
                                          giftCard={giftCard}
                                          groupSet={groupSet}
                                          bundleInfo={inStock && bundleInfo}
                                          showVariationMenu={isEdit}
                                          qty={qty}
                                          showQty={false}
                                          showQtyEdit={true}
                                          showSku={false}
                                          ignoreStock={true}
                                          onItemUpdate={handleOnItemUpdate}
                                          onItemUpdateQty={onItemUpdateQty} />
                    {showEditButton && (
                        <ButtonComponent title={formatMessage(custom_messages.wishlist_item_edit)}
                                         className="wishlist-item-component-edit-button"
                                         onClick={handleEdit}/>
                    )}
                </div>
                <div className="wishlist-item-component-action">
                    {noOptions ? (
                        <ButtonComponent className="wishlist-item-component-select-options-action"
                                         variant="primary"
                                         type="button"
                                         onClick={handleEdit}
                                         title={formatMessage(messages.wishlist_select_options)}>
                            {formatMessage(messages.wishlist_select_options)}
                        </ButtonComponent>
                    ) : (
                        <ButtonComponent variant="primary"
                                         title={formatMessage(custom_messages.add_to_basket)}
                                         disabled={!inStock}
                                         onClick={onItemAddToCart}>
                            {formatMessage(custom_messages.add_to_basket)}
                        </ButtonComponent>
                    )}
                </div>
            </ProductProvider>
            <ConfirmationModalComponent isOpen={isConfirmRemove}
                                        onConfirm={handleOnItemRemove}
                                        onCancel={handleOnCancel}
                                        modalTitle={formatMessage(messages.wishlist_item_remove_title)}
                                        confirmButtonTitle={formatMessage(messages.wishlist_item_remove_confirm_title)}>
                {formatMessage(messages.wishlist_item_remove_message)}
            </ConfirmationModalComponent>
        </div>
    );
}
