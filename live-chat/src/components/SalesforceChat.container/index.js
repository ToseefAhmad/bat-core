import loadable from '@loadable/component';

export const SalesforceChatContainer = loadable(() => import('./SalesforceChat.container'), {
    resolveComponent: module => module.SalesforceChatContainer
});
