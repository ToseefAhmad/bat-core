import TagManager from 'react-gtm-module';

import {getProductList} from './getProductList';

const getCurrencyCode = (cartItems) => cartItems[0]?.product?.price?.final?.amount?.currency;

export const trackPurchase = ({actionField, products: cartItems}) => {
    const {id, revenue, taxes, coupon, ...fields} = actionField || {};

    // GA4
    TagManager.dataLayer({
        dataLayer: {
            event: 'purchase',
            ecommerce: {
                items: getProductList({
                    productsData: cartItems,
                    quantity: true,
                    isNeedPosition: true,
                    coupon,
                    isQtyNumber: true,
                    isGA4: true
                }),
                transaction_id: id,
                value: revenue?.toString(),
                currency: getCurrencyCode(cartItems),
                tax: (taxes?.length ? taxes : 0).toString(),
                coupon,
                ...fields
            }
        }
    });

    // GA360
    TagManager.dataLayer({
        dataLayer: {
            event: 'purchaseUA',
            ecommerce: {
                purchase: {
                    actionField,
                    products: getProductList({
                        productsData: cartItems,
                        quantity: true
                    })
                }
            }
        }
    });
};
