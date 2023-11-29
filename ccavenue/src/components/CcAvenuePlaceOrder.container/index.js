import loadable from '@loadable/component';

export const CcAvenuePlaceOrderContainer = loadable(() => import('./CcAvenuePlaceOrder.container'), {
    resolveComponent: module => module.CcAvenuePlaceOrderContainer
});
