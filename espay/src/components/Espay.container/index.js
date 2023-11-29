import loadable from '@loadable/component';

export const EspayContainer = loadable(() => import('./Espay.container'), {
    resolveComponent: module => module.EspayContainer
});
