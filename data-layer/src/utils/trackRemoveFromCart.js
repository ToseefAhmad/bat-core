import TagManager from 'react-gtm-module';

import {getProductList} from './getProductList';
import {getVariationDataFromCartItem} from './getVariationDataFromCartItem';
import type {CartItem} from '../../../types';

export const trackRemoveFromCart = (cartItem: CartItem, qty = null) => {
    // GA4
    TagManager.dataLayer({
        dataLayer: {
            event: 'remove_from_cart',
            ecommerce: {
                items: getProductList({
                    productsData: cartItem,
                    quantity: qty || true,
                    isNeedPosition: true,
                    variantData: getVariationDataFromCartItem(cartItem),
                    isGA4: true
                })
            }
        }
    });

    // GA360
    TagManager.dataLayer({
        dataLayer: {
            event: 'removeFromCart',
            ecommerce: {
                remove: {
                    products: getProductList({
                        productsData: cartItem.product,
                        quantity: cartItem.quantity,
                        attributes: cartItem.configurable_variation?.product?.product_attributes
                    })
                }
            }
        }
    });
};
