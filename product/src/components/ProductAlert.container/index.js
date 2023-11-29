import loadable from '@loadable/component';

export const ProductAlertContainer = loadable(() => import('./ProductAlert.container'), {
    resolveComponent: module => module.ProductAlertContainer
});
