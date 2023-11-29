import loadable from '@loadable/component';

export const ConfigurableAddToCartContainerLoadable = loadable(() => import('./ConfigurableAddToCart.container'), {
    resolveComponent: module => module.ConfigurableAddToCartContainer
});

export {ConfigurableAddToCartContainer} from './ConfigurableAddToCart.container';
