import React, {useRef} from 'react';

import {LoaderBaseComponent} from '@luft/common';

import {useAspectRatio} from '../../hooks';
import type {Sizes} from '../../hooks';

type Props = {
    sizes?: Sizes,
    marginTop: string,
    marginRight: string,
    marginBottom: string,
    marginLeft: string
};

export function PageBuilderSliderShimmerComponent({
    sizes,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft
}: Props) {
    const aspectRatio = useAspectRatio(sizes);
    const blockRef = useRef();

    if (!aspectRatio) return null;

    const width = blockRef.current?.offsetWidth;
    const height = blockRef.current?.offsetHeight;

    const dynamicStyles = {
        paddingTop: `${aspectRatio * 100}%`,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft
    };

    return (
        <div ref={blockRef}
             className="page-builder-slider-shimmer-component"
             style={dynamicStyles}>
            {!!width && !!height && (
                <LoaderBaseComponent width={width}
                                     height={height}/>
            )}
        </div>
    );
}
