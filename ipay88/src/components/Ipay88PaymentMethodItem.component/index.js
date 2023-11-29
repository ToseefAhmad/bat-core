import loadable from '@loadable/component';

export const Ipay88PaymentMethodItemComponent = loadable(() => import('./Ipay88PaymentMethodItem.component'), {
    resolveComponent: module => module.Ipay88PaymentMethodItemComponent
});
