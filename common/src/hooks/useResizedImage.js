// TODO: Luft update v2.2.0
import {
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';
import {debounce} from 'lodash';

import {LuftImageResizeContext} from '../contexts';

const getDimensions = (ref) => {
    if (!ref.current) return {width: undefined, height: undefined};

    return {
        width: Math.ceil(ref.current.offsetWidth),
        height: Math.ceil(ref.current.offsetHeight)
    };
};

const isImage = (url) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);

/**
 * @module @luft/common
 * @scope @luft/common
 * @exports useResizedImage
 * @function useResizedImage
 * @kind Hook
 *
 * @description
 * Returns the current width, height and URL of the image with query parameters
 * ([IMAGE_URL]?width=[WIDTH]&height=[HEIGHT]) if image resize is enabled.
 *
 * @param {ImageType} image - Image GraphQL type object
 * @param {React.RefObject} ref - Element ref
 * @param {number} qualityFactor - Quality factor, used to get the image of a different size than element has
 * @returns {{imageUrl: string, width: number, height: number}}
 *
 * @example
 * ```js
 * import {useResizedImage} from '@luft/common';
 * ```
 *
 * @example
 * ```jsx
 * const image = {
 *     id: "img-id",
 *     alt: "Img Alt",
 *     name: "Img Name",
 *     url: imgUrl
 * }
 * const ref = useRef(null);
 * const {imageUrl, width, height} = useResizedImage(image, ref);
 * ```
 */
export function useResizedImage(image, ref, qualityFactor = 1) {
    const [{width, height}, setDimensions] = useState({width: undefined, height: undefined});
    const {enabled} = useContext(LuftImageResizeContext);

    useEffect(() => {
        if (!enabled || typeof window === 'undefined') return;
        const debouncedHandleResize = debounce(() => setDimensions(getDimensions(ref)), 1000);

        if (ref.current) {
            setDimensions(getDimensions(ref));
        }

        window.addEventListener('resize', debouncedHandleResize);

        return () => window.removeEventListener('resize', debouncedHandleResize);
    }, [ref, enabled]);

    const imageUrl = useMemo(() => {
        if (!image?.url) return undefined;

        const imageWidth = Math.round(width * qualityFactor);
        const imageHeight = Math.round(height * qualityFactor);

        if (enabled && imageWidth && imageHeight && isImage(image.url)) {
            return new URL(`${image.url}?width=${imageWidth}&height=${imageHeight}`);
        }
        return image.url;
    }, [height, image?.url, enabled, width, qualityFactor]);

    return {imageUrl, width, height};
}
