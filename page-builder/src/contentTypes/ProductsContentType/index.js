import {setContentTypeConfig} from '@magento/pagebuilder/lib/config';

import productsContentTypeConfigAggregator from '@luft/page-builder/src/contentTypes/ProductsContentType/configAggregator';

import {ProductsContentType} from './ProductsContentType';

export const initProductsContentTypeConfig = () => {
    // sideEffects = true, due to this self-registration
    setContentTypeConfig('products', {
        configAggregator: productsContentTypeConfigAggregator,
        component: ProductsContentType
    });
};
