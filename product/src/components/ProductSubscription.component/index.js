import loadable from '@loadable/component';

export const ProductSubscriptionComponent = loadable(() => import('./ProductSubscription.component'), {
    resolveComponent: module => module.ProductSubscriptionComponent
});
