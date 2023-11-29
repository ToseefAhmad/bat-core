import TagManager from 'react-gtm-module';
import {find} from 'lodash';

import {getProductList} from './getProductList';
import {getVariationDataFromCartItem} from './getVariationDataFromCartItem';
import type {
    Product,
    Variation,
    CartItem,
    CartPrices
} from '../../../types';

type Options = {
    data: {
        [key: string]: {
            items: CartItem[],
            prices: CartPrices
        }
    },
    product: Product,
    qty: number,
    variation?: Variation
};

const getCartItemByProductIdAndVariationId = (items, productId, variationId) => items.find(
    (item) => item?.product?.id === productId && item?.configurable_variation?.product?.id === variationId
);

export const trackAddToCart = ({data, product, qty, variation}: Options) => {
    const {items, prices} = find(data) || {};

    const cartItem = getCartItemByProductIdAndVariationId(items, product?.id, variation?.product?.id);

    // GA4
    TagManager.dataLayer({
        dataLayer: {
            event: 'add_to_cart',
            ecommerce: {
                items: getProductList({
                    productsData: product,
                    quantity: qty,
                    isNeedPosition: true,
                    variantData: variation && getVariationDataFromCartItem(cartItem),
                    isGA4: true
                })
            }
        }
    });

    // GA360
    TagManager.dataLayer({
        dataLayer: {
            event: 'addToCart',
            ecommerce: {
                currencyCode: prices?.subtotal?.currency,
                add: {
                    products: getProductList({
                        productsData: product,
                        quantity: qty,
                        attributes: cartItem?.configurable_variation?.product?.product_attributes
                    })
                }
            }
        }
    });
};
