import TagManager from 'react-gtm-module';

import {getProductList} from './getProductList';

export const trackProductClick = (product) => {
    // GA4
    TagManager.dataLayer({
        dataLayer: {
            event: 'select_item',
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
            event: 'productClick',
            ecommerce: {
                click: {
                    products: getProductList({productsData: product})
                }
            }
        }
    });
};
