import {createHandlerBoundToURL} from 'workbox-precaching';
import {NavigationRoute, registerRoute} from 'workbox-routing';

export function registerNavigationRoute() {
    const {PUBLIC_URL} = process.env;
    const publicUrl = PUBLIC_URL ? PUBLIC_URL.replace(/\/$/, '') : '';

    registerRoute(new NavigationRoute(createHandlerBoundToURL(`${publicUrl}/index.html`), {
        denylist: [
            /\/admin.*/,
            /\/graphql$/,
            /\/sitemap\.xml$/,
            /\/blog_sitemap\.xml$/,
            /\/robots\.txt$/
        ],
    }));
}
