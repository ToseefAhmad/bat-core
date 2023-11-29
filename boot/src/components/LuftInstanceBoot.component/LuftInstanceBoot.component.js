// TODO: Luft update v2.2.0
// `LuftPushNotificationProviderComponent`, `LuftPaymentProviderComponent` and `LuftCartProviderComponent` were
// temporary added. They should be moved to different files (the same way as in `luft-app`) in a future
import React from 'react';

import {LuftCacheWarmerProviderComponent, LuftCacheWarmerProps} from '@luft/cache-warmer';
import {LuftApolloProviderComponent, LuftApolloProps} from '@luft/apollo';
import {LuftServiceWorkerProviderComponent, LuftServiceWorkerProps} from '@luft/service-worker';
import {LuftPushNotificationProviderComponent, LuftPushNotificationProps} from '@luft/push-notification';
import {LuftCmsProviderComponent, LuftCmsProps} from '@luft/cms';
import {ProductRenderersProvider, ProductRenderersProviderProps} from '@luft/product';
import {LuftCartProviderComponent, LuftCartProps} from '@luft/cart';
import {
    LuftIntlProviderComponent,
    LuftRouterProviderComponent
} from '@luft/boot';
import {
    LuftGtmProviderComponent,
    LuftGtmProps
} from '@luft/boot/src/components/LuftGtmProvider.component';
import {
    LuftIntlProps,
    LuftRouterProps
} from '@luft/boot/src/components/LuftIntlProvider.component';

import {LuftImageResizeProvider, LuftImageResizeProviderProps} from '../../../../common';
import {LuftPaymentProviderComponent} from '../../../../payment';

import type {LuftPaymentProps} from '../../../../payment';

export type InstanceBootConfig = {
    /**
     * Url for fetching graphql data with apollo.
     * is used by LuftApolloProvider and by LuftStoresProvider
     * if not specified specifically in their config props
     */
    dataUri: string,
    /**
     * if Application should work in ssr mode
     */
    ssr?: boolean,
    /**
     * Router config
     */
    router: LuftRouterProps,
    /**
     * Cache Warmer config
     */
    cacheWarmer?: LuftCacheWarmerProps,
    /**
     * Apollo config
     */
    apollo?: LuftApolloProps,
    /**
     * Intl config
     */
    intl?: LuftIntlProps,
    /**
     * Service Worker config
     */
    serviceWorker?: LuftServiceWorkerProps,
    /**
     * Push Notifications config
     */
    pushNotifications?: LuftPushNotificationProps,
    /**
     * Payments config
     */
    payments?: LuftPaymentProps,
    /**
     * Cms config
     */
    cms?: LuftCmsProps,
    /**
     * Cart config
     */
    cart?: LuftCartProps,
    /**
     * Product config
     */
    product?: ProductRenderersProviderProps,
    /**
     * GTM config
     */
    gtm?: LuftGtmProps,
    /**
     * Image resize config
     */
    imageResize?: LuftImageResizeProviderProps
}

type Props = {
    /**
     * Config for app
     */
    config?: InstanceBootConfig,
    /**
     * Application component
     */
    children?: React.Component,
}

/**
 * @module @luft/boot
 * @scope @luft/boot
 * @exports LuftInstanceBootComponent
 * @function LuftInstanceBootComponent
 * @kind Provider
 *
 * @description
 *
 * An Aggregator Provider, that combines configuration for the following providers:
 *
 * 1. `LuftRouterProviderComponent` -- config.router
 * 1. `LuftCacheWarmerProviderComponent` -- config.cacheWarmer
 * 1. `LuftApolloProviderComponent` -- config.apollo
 * 1. `LuftGtmProviderComponent` -- config.gtm
 * 1. `LuftIntlProviderComponent` -- config.intl
 * 1. `LuftServiceWorkerProviderComponent` -- config.serviceWorker
 * 1. `LuftCmsProviderComponent` -- config.cms
 * 1. `ProductRenderersProvider` -- config.productRenderers
 * 1. `LuftImageResizeContext` -- config.imageResize
 *
 * Please see corresponding providers for configuration details.
 *
 * Main purpose of the provider is to fully boot singe store application instance.
 *
 * @example
 * ```jsx
 * import {LuftInstanceBootComponent} from '@luft/boot';
 *
 * <LuftInstanceBootComponent config={{
 *     dataUri: 'https://yourwebsite.com/graphql',
 *     router: {
 *         basename: '/us/en'
 *     }
 *     apollo:{
 *         shouldPersist: false
 *     }
 * }}>
 *     {children}
 * </LuftInstanceBootComponent>
 * ```
 */
export const LuftInstanceBootComponent = (
    {
        config: {
            ssr = false,
            dataUri,
            fetch,
            url,
            cms = {},
            router = {},
            cacheWarmer = {},
            apollo = {},
            intl = {},
            serviceWorker = {},
            pushNotifications = {},
            payments = {},
            cart = {},
            productRenderers = {},
            gtm = {},
            imageResize = {}
        } = {},
        children
    }: Props) => (
        <LuftRouterProviderComponent ssr={ssr}
                                     url={url}
                                     {...router}>
            <LuftCacheWarmerProviderComponent ssr={ssr}
                                              {...cacheWarmer}>
                <LuftApolloProviderComponent ssr={ssr}
                                             dataUri={dataUri}
                                             fetch={fetch}
                                             {...apollo}>
                    <LuftGtmProviderComponent {...gtm}>
                        <LuftIntlProviderComponent ssr={ssr}
                                                   {...intl}>
                            <LuftServiceWorkerProviderComponent ssr={ssr}
                                                                {...serviceWorker}>
                                <LuftPushNotificationProviderComponent ssr={ssr}
                                                                       {...pushNotifications}>
                                    <LuftPaymentProviderComponent ssr={ssr}
                                                                  {...payments}>
                                        <LuftCmsProviderComponent ssr={ssr}
                                                                  {...cms}>
                                            <LuftCartProviderComponent {...cart}>
                                                <LuftImageResizeProvider {...imageResize}>
                                                    <ProductRenderersProvider renderers={productRenderers}>
                                                        {children}
                                                    </ProductRenderersProvider>
                                                </LuftImageResizeProvider>
                                            </LuftCartProviderComponent>
                                        </LuftCmsProviderComponent>
                                    </LuftPaymentProviderComponent>
                                </LuftPushNotificationProviderComponent>
                            </LuftServiceWorkerProviderComponent>
                        </LuftIntlProviderComponent>
                    </LuftGtmProviderComponent>
                </LuftApolloProviderComponent>
            </LuftCacheWarmerProviderComponent>
        </LuftRouterProviderComponent>
);
