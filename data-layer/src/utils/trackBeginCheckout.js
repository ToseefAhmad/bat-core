import TagManager from 'react-gtm-module';

import {getProductList} from './getProductList';

const getCurrencyCode = (products) => products[0]?.product?.price?.final?.amount?.currency;

export const trackBeginCheckout = (products, step) => {
    // GA4
    TagManager.dataLayer({
        dataLayer: {
            event: 'begin_checkout',
            ecommerce: {
                items: getProductList({
                    productsData: products,
                    quantity: true,
                    isNeedPosition: true,
                    isGA4: true
                })
            }
        }
    });

    // GA360
    TagManager.dataLayer({
        dataLayer: {
            event: 'checkout',
            ecommerce: {
                currencyCode: getCurrencyCode(products),
                checkout: {
                    actionField: {step},
                    products: getProductList({
                        productsData: products,
                        quantity: true
                    })
                }
            }
        }
    });
};
