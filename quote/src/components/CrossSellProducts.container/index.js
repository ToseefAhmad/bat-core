import loadable from '@loadable/component';

export const CrossSellProductsContainer = loadable(() => import('./CrossSellProducts.container'), {
    resolveComponent: module => module.CrossSellProductsContainer
});
