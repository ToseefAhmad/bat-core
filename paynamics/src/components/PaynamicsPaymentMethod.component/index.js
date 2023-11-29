import loadable from '@loadable/component';

export const PaynamicsPaymentMethodComponent = loadable(() => import('./PaynamicsPaymentMethod.component'), {
    resolveComponent: module => module.PaynamicsPaymentMethodComponent
});
