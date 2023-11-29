export type LanguageCode = 'ar' | 'en';

/**
 * @description
 * Get website language code using current pathname
 *
 * @returns language code
 *
 * @example
 * ```js
 * const langCode = getLanguageCodeByPathname();
 * ```
 */

const getHref = () => window?.location.href;

export const getLanguageCodeByPathname = (path = getHref()): LanguageCode => {
    if (!path) return 'en';

    const {pathname} = new URL(path);

    switch (true) {
        case pathname.startsWith('/sa/ar'):
            return 'ar';

        default:
            return 'en';
    }
};
