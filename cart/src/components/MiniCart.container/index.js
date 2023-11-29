import loadable from '@loadable/component';

export const MiniCartContainer = loadable(() => import('./MiniCart.container'), {
    resolveComponent: module => module.MiniCartContainer
});
