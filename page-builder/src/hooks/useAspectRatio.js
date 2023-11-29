import {useMemo} from 'react';

import {useResolutions} from '@luft/common';

export type Sizes = {
    desktop: {
        width: number,
        height: number
    },
    mobile: {
        width: number,
        height: number
    }
};

type AspectRatios = {
    desktop: number,
    mobile: number
};

export const useAspectRatio = (sizes?: Sizes = {}) => {
    const {isSMdown: isMobile} = useResolutions();

    const aspectRatios: AspectRatios = useMemo(() => Object.entries(sizes).reduce((memo, [screen, size]) => {
        const {width, height} = size;

        return {
            ...memo,
            [screen]: height / width
        };
    }, {}), [sizes]);

    const currentScreen = isMobile ? 'mobile' : 'desktop';

    return aspectRatios[currentScreen];
};
