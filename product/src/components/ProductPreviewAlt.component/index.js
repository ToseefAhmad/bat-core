import loadable from '@loadable/component';

export const ProductPreviewAltComponent = loadable(() => import('./ProductPreviewAlt.component'), {
    resolveComponent: module => module.ProductPreviewAltComponent
});
