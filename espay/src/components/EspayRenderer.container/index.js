import loadable from '@loadable/component';

export const EspayRendererContainer = loadable(() => import('./EspayRenderer.container'), {
    resolveComponent: module => module.EspayRendererContainer
});
