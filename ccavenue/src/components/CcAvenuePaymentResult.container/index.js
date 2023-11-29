import loadable from '@loadable/component';

export const CcAvenuePaymentResultContainer = loadable(() => import('./CcAvenuePaymentResult.container'), {
    resolveComponent: module => module.CcAvenuePaymentResultContainer
});
