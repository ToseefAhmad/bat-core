import loadable from '@loadable/component';

export const ChechoutComPaymentMethodItemComponent = loadable(() => import('./ChechoutComPaymentMethodItem.component'), {
    resolveComponent: module => module.ChechoutComPaymentMethodItemComponent
});
