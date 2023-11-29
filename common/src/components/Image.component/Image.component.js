// TODO: Luft update v2.2.0
import React, {
    useState,
    useRef
} from 'react';
import classnames from 'classnames';

import {ImagePlaceholderContainer, LoaderBaseComponent} from '@luft/common';
import type {Image as ImageType} from '@luft/types';

import {useResizedImage} from '../../hooks';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: React.Component,
    /**
     * Image Graphql type object
     */
    image?: ImageType,
    /**
     * the ratio of the image ( useful for placeholder and loading states)
     */
    ratio?: number,
    /**
     * time in ms until loader is being displayed to avoid blinking effect
     */
    loaderDelay?: number,
    /**
     * Image type, used to display proper placeholder
     */
    variant?: 'base' | 'small' | 'thumbnail' | 'swatch',
    /**
     * custom className for the image tag
     */
    imgClassName?: string,
    /**
     * custom className
     */
    className?: string
};

const QUALITY_FACTOR = 1.6;

/**
 * Image component, that handles loading and error states.
 */
export function ImageComponent(
    {
        as: Component = 'img',
        image = {},
        loaderDelay,
        ratio,
        className,
        imgClassName,
        variant,
        ...other
    }: Props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const blockRef = useRef(null);
    const {imageUrl, width, height} = useResizedImage(image, blockRef, QUALITY_FACTOR);

    return (
        <div className={classnames('image-component', className)}
             style={(ratio && {paddingTop: `${ratio * 100}%`}) || {}}>
            {image?.url && !isError ? (
                <>
                    <div className="image-component-block">
                        <div ref={blockRef}
                             className="image-component-image-block">
                            <Component loading="lazy"
                                       width={width}
                                       height={height}
                                       {...other}
                                       className={imgClassName}
                                       src={imageUrl}
                                       alt={image?.alt}
                                       onError={() => setIsError(true)}
                                       onLoad={() => setIsLoaded(true)}/>
                        </div>
                    </div>
                    {!isLoaded && (
                        <LoaderBaseComponent delay={loaderDelay}
                                             width={width}
                                             height={height}/>
                    )}
                </>
            ) : (
                <div className="image-component-no-image">
                    <ImagePlaceholderContainer variant={variant}/>
                </div>
            )}
        </div>
    );
}
