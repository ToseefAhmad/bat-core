import loadable from '@loadable/component';

export const ProductPreviewComponent = loadable(() => import('./ProductPreview.component'), {
    resolveComponent: module => module.ProductPreviewComponent
});
