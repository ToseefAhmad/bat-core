import TagManager from 'react-gtm-module';

import {getProductList} from './getProductList';
import type {Product} from '../../../types';

const getCurrencyCode = (products: Product[]) => products[0]?.price?.final?.amount?.currency;

export const trackCategoryPageVisit = (products: Product[]) => {
    const currencyCode = getCurrencyCode(products);

    // GA4
    TagManager.dataLayer({
        dataLayer: {
            event: 'view_item_list',
            currencyCode,
            ecommerce: {
                items: getProductList({
                    productsData: products,
                    quantity: 1,
                    isNeedPosition: true,
                    isGA4: true
                })
            }
        }
    });

    // GA360
    TagManager.dataLayer({
        dataLayer: {
            event: 'productImpression',
            currencyCode,
            ecommerce: {
                impressions: {
                    products: getProductList({
                        productsData: products,
                        quantity: null,
                        isNeedPosition: true
                    })
                }
            }
        }
    });
};
