import loadable from '@loadable/component';

export const MiniCartTransitionComponent = loadable(() => import('./MiniCartTransition.component'), {
    resolveComponent: module => module.MiniCartTransitionComponent
});
