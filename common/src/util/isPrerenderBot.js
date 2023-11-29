/**
 * @description
 * Detect if a Prerender.io bot visited a page
 *
 * @link https://docs.prerender.io/article/7-faq#user-agent
 */
export const isPrerenderBot = /prerender/i.test(window?.navigator?.userAgent);
