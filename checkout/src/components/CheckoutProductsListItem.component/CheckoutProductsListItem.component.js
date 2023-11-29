import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';

import {useProductRenderer} from '@luft/product';
import {CustomLinkComponent} from '@luft/common';

import type {CartItem} from '@luft/types';

import {getLinkToUpdateProduct, useIsEditableBundle} from '../../../../product';
import messages from './resources/messages';

type Props = {
    /**
     * Cart item
     */
    cartItem: CartItem
};

export function CheckoutProductsListItemComponent({cartItem}: Props) {
    const {formatMessage} = useIntl();
    const showEditBundleButton = useIsEditableBundle(cartItem?.product?.bundled_products);
    const hasEngravingOptions = cartItem.engraved_options?.psn_is_personalisable;
    const ProductPaneComponent = useProductRenderer('ProductPaneComponent');

    const customLink = useMemo(() => {
        if (hasEngravingOptions || showEditBundleButton) {
            return getLinkToUpdateProduct(cartItem);
        }

        return '/cart';
    }, [hasEngravingOptions, showEditBundleButton, cartItem, getLinkToUpdateProduct]);

    return (
        <div className="checkout-products-list-item-component">
            <ProductPaneComponent product={cartItem.product}
                                  qty={cartItem.quantity}
                                  priceLabel={cartItem.price_label}
                                  variation={cartItem.configurable_variation}
                                  engravingOptions={cartItem.engraved_options}
                                  bundleInfo={cartItem.bundle_info}
                                  className="checkout-products-list-item-component-product"
                                  showStock={false}
                                  priceVariant="price-column"/>
            <CustomLinkComponent to={customLink}
                                 className="checkout-products-list-item-component-link"
                                 title={formatMessage(messages.edit_link)}>
                {formatMessage(messages.edit_link)}
            </CustomLinkComponent>
        </div>
    );
}
