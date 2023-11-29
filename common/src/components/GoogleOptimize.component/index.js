import loadable from '@loadable/component';

export const GoogleOptimizeComponent = loadable(() => import('./GoogleOptimize.component'), {
    resolveComponent: module => module.GoogleOptimizeComponent
});
