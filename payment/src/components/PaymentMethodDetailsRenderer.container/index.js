import loadable from '@loadable/component';

export const PaymentMethodDetailsRendererContainer = loadable(() => import('./PaymentMethodDetailsRenderer.container'), {
    resolveComponent: module => module.PaymentMethodDetailsRendererContainer
});
