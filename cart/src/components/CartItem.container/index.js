import loadable from '@loadable/component';

export const CartItemContainer = loadable(() => import('./CartItem.container'), {
    resolveComponent: module => module.CartItemContainer
});
