import loadable from '@loadable/component';

export const CreateOrderContainer = loadable(() => import('./CreateOrder.container'), {
    resolveComponent: module => module.CreateOrderContainer
});
