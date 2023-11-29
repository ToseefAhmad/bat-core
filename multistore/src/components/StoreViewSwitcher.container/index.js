import loadable from '@loadable/component';

export const StoreViewSwitcherContainer = loadable(() => import('./StoreViewSwitcher.container'), {
    resolveComponent: module => module.StoreViewSwitcherContainer
});
