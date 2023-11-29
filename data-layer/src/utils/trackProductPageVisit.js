import TagManager from 'react-gtm-module';

import {getProductList} from './getProductList';

export const trackProductPageVisit = (product) => {
    // GA4
    TagManager.dataLayer({
        dataLayer: {
            event: 'view_item',
            ecommerce: {
                items: getProductList({
                    productsData: product,
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
            event: 'productDetail',
            ecommerce: {
                detail: {
                    products: getProductList({productsData: product})
                }
            }
        }
    });
};
