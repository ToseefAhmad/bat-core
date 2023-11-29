import loadable from '@loadable/component';

export const FreeGiftContainer = loadable(() => import('./FreeGift.container'), {
    resolveComponent: module => module.FreeGiftContainer
});
