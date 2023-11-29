import loadable from '@loadable/component';

export const PaymentMethodItemComponent = loadable(() => import('./PaymentMethodItem.component'), {
    resolveComponent: module => module.PaymentMethodItemComponent
});
