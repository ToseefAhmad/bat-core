import loadable from '@loadable/component';

export const Ipay88MethodsListContainer = loadable(() => import('./Ipay88MethodsList.container'), {
    resolveComponent: module => module.Ipay88MethodsListContainer
});
