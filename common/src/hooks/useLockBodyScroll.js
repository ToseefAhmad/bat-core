import {useEffect} from 'react';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';
import {isUndefined} from 'lodash';

import {useResolutions} from '@luft/common';

const LOCKED_CLASS = 'locked-scroll';

/**
 * @description
 * Prevents body from scrolling when isLocked is true. Automatically enables scrolling on unmounting.
 *
 * @param {boolean=} isLocked - flag, which indicates that body scroll should be locked
 *
 * @example
 * ```jsx
 * import {useLockBodyScroll} from 'bat/common';
 *
 * const isLocked = true;
 *
 * // Lock body scroll in case isLocked is true
 * useLockBodyScroll(isLocked);
 * ```
 */
export function useLockBodyScroll(isLocked?: boolean = true) {
    const {isXS} = useResolutions();

    useEffect(() => {
        if (isUndefined(window)) return;

        const {body} = document;
        const html = document.querySelector('html');

        const clearLocking = () => {
            if (!isXS) enableBodyScroll(body);

            html.classList.remove(LOCKED_CLASS);
        };

        if (isLocked) {
            if (!isXS) disableBodyScroll(body, {reserveScrollBarGap: true});

            html.classList.add(LOCKED_CLASS);
        } else {
            clearLocking();
        }

        return clearLocking;
    }, [isLocked]);
}
