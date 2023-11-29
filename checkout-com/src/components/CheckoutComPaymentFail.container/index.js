import loadable from '@loadable/component';

export const CheckoutComPaymentFailContainer = loadable(() => import('./CheckoutComPaymentFail.container'), {
    resolveComponent: module => module.CheckoutComPaymentFailContainer
});
