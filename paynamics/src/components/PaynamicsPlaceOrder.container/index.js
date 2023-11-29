import loadable from '@loadable/component';

export const PaynamicsPlaceOrderContainer = loadable(() => import('./PaynamicsPlaceOrder.container'), {
    resolveComponent: module => module.PaynamicsPlaceOrderContainer
});
