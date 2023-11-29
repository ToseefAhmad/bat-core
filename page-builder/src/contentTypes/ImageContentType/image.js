import React, {useContext} from 'react';
import {Link, resourceUrl} from '@magento/venia-drivers';
import {mergeClasses} from '@magento/venia-ui/lib/classify';
import resolveLinkProps from '@magento/pagebuilder/lib/resolveLinkProps';
import defaultClasses from '@magento/pagebuilder/lib/ContentTypes/Image/image.css';
import {castArray} from 'lodash';

import {LuftMediaQueryContext} from '@luft/common/src/contexts/LuftMediaQuery.context';
import {useResolutions} from '@luft/common';

const IMAGE_QUALITY = 85;

const hasImages = (images) => castArray(images).every(Boolean);
const isWebpImage = (url) => /\.webp/.test(url);

type Props = {
    /**
     * Flag, which indicates that node has two picture tags
     */
    hasDoublePicture: boolean,
    /**
     * An object containing the class names for the Image
     */
    classes: {
        /**
         * CSS classes for the img element
         */
        img: string
    },
    /**
     * URL src of the desktop image (or images in case of fallback)
     */
    desktopImage: string | [string, string],
    /**
     * URL src of the mobile image (or images in case of fallback)
     */
    mobileImage: string | [string, string],
    /**
     * Alternate text
     */
    altText: string,
    /**
     * Title of the image
     */
    title: string,
    /**
     * URL to redirect to
     */
    link: string,
    /**
     * Type of link
     */
    linkType: 'default' | 'category' | 'product' | 'page',
    /**
     * Flag to indicate if link should be opened in a new tab
     */
    openInNewTab: boolean,
    /**
     * Caption for the image
     */
    caption: string,
    /**
     * Alignment of the divider within the parent container
     */
    textAlign: string,
    /**
     * CSS border property
     */
    border: string,
    /**
     * CSS border color property
     */
    borderColor: string,
    /**
     * CSS border width property
     */
    borderWidth: string,
    /**
     * CSS border radius property
     */
    borderRadius: string,
    /**
     * CSS margin top property
     */
    marginTop: string,
    /**
     * CSS margin right property
     */
    marginRight: string,
    /**
     * CSS margin bottom property
     */
    marginBottom: string,
    /**
     * CSS margin left property
     */
    marginLeft: string,
    /**
     * CSS padding top property
     */
    paddingTop: string,
    /**
     * CSS padding right property
     */
    paddingRight: string,
    /**
     * CSS padding bottom property
     */
    paddingBottom: string,
    /**
     * CSS padding left property
     */
    paddingLeft: string,
    /**
     * List of CSS classes to be applied to the component
     */
    cssClasses: string[]
};

/**
 * Page Builder Image component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 *
 * @typedef Image
 * @kind functional component
 *
 * @param {Props} props React component props
 *
 * @returns {React.Element} A React component that displays an Image.
 */
const Image = (props: Props) => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const {
        hasDoublePicture,
        desktopImage,
        mobileImage,
        altText,
        title,
        link,
        openInNewTab,
        caption,
        textAlign,
        border,
        borderColor,
        borderWidth,
        borderRadius,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        cssClasses = []
    } = props;

    const {isXS} = useResolutions();
    // TODO: luft 2.0
    const {DEFAULT} = useContext(LuftMediaQueryContext);

    // Don't render anything if there is no image to be rendered
    if (!hasImages(desktopImage) && !hasImages(mobileImage)) {
        return null;
    }

    const figureStyles = {
        textAlign,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
    };
    const imageStyles = {
        border,
        borderColor,
        borderWidth,
        borderRadius
    };

    const images = hasDoublePicture
        ? isXS ? mobileImage : desktopImage
        : [mobileImage, desktopImage];
    const [desiredImage, fallbackImage] = images;

    const PictureFragment = (
        <>
            <picture>
                {!!desiredImage && (
                    <source media={!hasDoublePicture ? `(max-width: ${DEFAULT - 1}px)` : undefined}
                            type={isWebpImage(desiredImage) ? 'image/webp' : undefined}
                            srcSet={resourceUrl(desiredImage, {
                                type: 'image-wysiwyg',
                                quality: IMAGE_QUALITY
                            })}/>
                )}

                <img className={classes.img}
                     src={resourceUrl(fallbackImage, {
                         type: 'image-wysiwyg',
                         quality: IMAGE_QUALITY
                     })}
                     title={title}
                     alt={altText}
                     style={imageStyles}
                     loading="lazy"/>
            </picture>

            {!!caption && (
                <figcaption>
                    {caption}
                </figcaption>
            )}
        </>
    );

    if (typeof link === 'string') {
        const linkProps = resolveLinkProps(link);
        const LinkComponent = linkProps.to ? Link : 'a';

        return (
            <figure style={figureStyles}
                    className={cssClasses.join(' ')}>
                <LinkComponent {...linkProps}
                               {...(openInNewTab ? {target: '_blank'} : '')}>
                    {PictureFragment}
                </LinkComponent>
            </figure>
        );
    }

    return (
        <figure style={figureStyles}
                className={cssClasses.join(' ')}>
            {PictureFragment}
        </figure>
    );
};

export default Image;
