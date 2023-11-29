import loadable from '@loadable/component';

export const CheckoutComPlaceOrderContainer = loadable(() => import('./CheckoutComPlaceOrder.container'), {
    resolveComponent: module => module.CheckoutComPlaceOrderContainer
});
