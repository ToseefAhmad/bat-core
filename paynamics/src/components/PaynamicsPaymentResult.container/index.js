import loadable from '@loadable/component';

export const PaynamicsPaymentResultContainer = loadable(() => import('./PaynamicsPaymentResult.container'), {
    resolveComponent: module => module.PaynamicsPaymentResultContainer
});
