import loadable from '@loadable/component';

export const CheckoutComRendererContainer = loadable(() => import('./CheckoutComRenderer.container'), {
    resolveComponent: module => module.CheckoutComRendererContainer
});
