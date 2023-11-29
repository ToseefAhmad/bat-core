import React from 'react';
import {setContentTypeConfig} from '@magento/pagebuilder/lib/config';
import sliderContentTypeConfigAggregator from '@magento/pagebuilder/lib/ContentTypes/Slider/configAggregator';

import {PageBuilderSliderShimmerComponent} from '../../components';
import type {Sizes} from '../../hooks';

export const initSliderContentTypeConfig = (sizes: Sizes) => {
    // sideEffects = true, due to this self-registration
    setContentTypeConfig('slider', {
        configAggregator: sliderContentTypeConfigAggregator,
        component: React.lazy(() => import('./slider').then(({ default: Slider }) => ({
            default: props => (
                <Slider {...props}
                        sizes={sizes}/>
            )
        }))),
        componentShimmer: props => (
            <PageBuilderSliderShimmerComponent {...props}
                                               sizes={sizes}/>
        )
    });
};
