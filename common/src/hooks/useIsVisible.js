import {useState, useEffect} from 'react';
import {last} from 'lodash';
import type {RefObject} from 'react';

type Options = {
    /**
     * Flag, which tells IntersectionObserver to stop observing the node,
     * if it was visible at least once
     */
    isOnlyFirstAppearance?: boolean
};

/**
 * @description
 * Analyze if node is visible on the screen
 *
 * @param {RefObject} nodeRef - ref object of the node, which should be observed
 * @returns {boolean} flag, which indicates that object is visible or not visible
 *
 * @example
 * ```js
 * const nodeRef = useRef();
 * const isVisible = useIsVisible(nodeRef);
 * ```
 */
export const useIsVisible = (nodeRef: RefObject, options?: Options = {}) => {
    const {isOnlyFirstAppearance = false} = options;

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = nodeRef.current;

        if (!window || !IntersectionObserver || !element) return;

        const observer = new IntersectionObserver((entries) => {
            const entry = last(entries);

            if (isOnlyFirstAppearance && entry.isIntersecting) observer.unobserve(element);

            setIsVisible(entry.isIntersecting);
        });

        observer.observe(element);

        return () => observer.unobserve(element);
    }, [nodeRef, isOnlyFirstAppearance]);

    return isVisible;
};
