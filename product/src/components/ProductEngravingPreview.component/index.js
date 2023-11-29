import loadable from '@loadable/component';

export const ProductEngravingPreviewComponent = loadable(() => import('./ProductEngravingPreview.component'), {
    resolveComponent: module => module.ProductEngravingPreviewComponent
});
