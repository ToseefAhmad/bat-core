import loadable from '@loadable/component';

export const ProductEngravingContainer = loadable(() => import('./ProductEngraving.container'), {
    resolveComponent: module => module.ProductEngravingContainer
});
