import loadable from '@loadable/component';

export const SimpleAddToCartContainerLoadable = loadable(() => import('./SimpleAddToCart.container'), {
    resolveComponent: module => module.SimpleAddToCartContainer
});

export {SimpleAddToCartContainer} from './SimpleAddToCart.container';
