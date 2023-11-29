import loadable from '@loadable/component';

export const DotDigitalChatComponent = loadable(() => import('./DotDigitalChat.component'), {
    resolveComponent: module => module.DotDigitalChatComponent
});
