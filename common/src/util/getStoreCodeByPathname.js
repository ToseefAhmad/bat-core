export type StoreCode = 'id' | 'pk' | 'uae' | 'ph' | 'my' | 'sa';

/**
 * @description
 * Get website store code using current pathname
 *
 * @returns store code
 *
 * @example
 * ```js
 * const storeCode = getStoreCodeByPathname();
 * ```
 */
export const getStoreCodeByPathname = (): StoreCode => {
    switch (true) {
        case window?.location.pathname.startsWith('/id/'):
            return 'id';

        case window?.location.pathname.startsWith('/ph/'):
            return 'ph';

        case window?.location.pathname.startsWith('/pk/'):
            return 'pk';

        case window?.location.pathname.startsWith('/ae/'):
            return 'uae';

        case window?.location.pathname.startsWith('/my/'):
            return 'my';

        case window?.location.pathname.startsWith('/sa/'):
            return 'sa';

        default:
            return 'id';
    }
};
