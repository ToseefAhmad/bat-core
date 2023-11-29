import loadable from '@loadable/component';

export const CheckoutComPaymentVerifyContainer = loadable(() => import('./CheckoutComPaymentVerify.container'), {
    resolveComponent: module => module.CheckoutComPaymentVerifyContainer
});
