import loadable from '@loadable/component';

export const PushNotificationModalContainer = loadable(() => import('./PushNotificationModal.container'), {
    resolveComponent: module => module.PushNotificationModalContainer
});
