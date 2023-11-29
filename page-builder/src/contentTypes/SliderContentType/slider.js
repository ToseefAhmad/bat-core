import React, {Children} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import SlickSlider from 'react-slick';
// eslint-disable-next-line import/no-extraneous-dependencies
import {jarallax} from 'jarallax';
import classnames from 'classnames';

import {mergeClasses} from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/pagebuilder/lib/ContentTypes/Slider/slider.css';

import {useAspectRatio} from '../../hooks';
import {getLanguageCodeByPathname} from '../../../../common';
import type {Sizes} from '../../hooks';
import './slider.scss';

type Classes = {
    root: string,
    bannerRoot: string,
    bannerLink: string,
    bannerWrapper: string,
    bannerPosterOverlay: string
};

type Props = {
    minHeight: string,
    autoplay: boolean,
    autoplaySpeed: number,
    fade: boolean,
    infinite: boolean,
    showArrows: boolean,
    showDots: boolean,
    textAlign: string,
    border: string,
    borderColor: string,
    borderWidth: string,
    borderRadius: string,
    marginTop: string,
    marginRight: string,
    marginBottom: string,
    marginLeft: string,
    paddingTop: string,
    paddingRight: string,
    paddingBottom: string,
    paddingLeft: string,
    cssClasses?: string[],
    children: string,
    classes: Classes,
    sizes: Sizes
};

/**
 * Page Builder Slider component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 *
 * @typedef Slider
 * @kind functional component
 *
 * @param {Props} props React component props
 *
 * @returns {React.Element} A React component that displays a Slider which contains slides.
 */

const Slider = (props: Props) => {
    const {
        minHeight,
        autoplay,
        autoplaySpeed,
        fade,
        infinite,
        showArrows,
        showDots,
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
        cssClasses = [],
        children,
        classes,
        sizes
    } = props;

    const aspectRatio = useAspectRatio(sizes);

    const sliderClasses = mergeClasses(defaultClasses, classes);
    const dynamicStyles = {
        minHeight,
        textAlign,
        border,
        borderColor,
        borderWidth,
        borderRadius,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingTop: aspectRatio ? `${aspectRatio * 100}%` : paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
    };
    const isRTL = getLanguageCodeByPathname() === 'ar';
    const jarallaxInstances = {};
    const sliderSettings = {
        rtl: isRTL,
        dots: showDots,
        arrows: showArrows,
        afterChange: () => Object.keys(jarallaxInstances).map(key => jarallax(jarallaxInstances[key].element, 'onScroll')),
        infinite,
        autoplay,
        autoplaySpeed,
        fade
    };

    // Override classes on banner to ensure min height is respected
    Children.map(children, (child, index) => {
        if (child.props && child.props.data) {
            // eslint-disable-next-line no-param-reassign
            child.props.data.classes = {
                root: sliderClasses.bannerRoot,
                link: sliderClasses.bannerLink,
                wrapper: sliderClasses.bannerWrapper,
                posterOverlay: sliderClasses.bannerPosterOverlay
            };
            // eslint-disable-next-line no-param-reassign
            child.props.data.getParallax = (element, options) => {
                jarallaxInstances[index] = {
                    element,
                    options
                };
            };
        }
        return child;
    });

    return (
        <div className={classnames('page-builder-slider-component', sliderClasses.root, cssClasses)}
             style={dynamicStyles}>
            <SlickSlider {...sliderSettings}>
                {children}
            </SlickSlider>
        </div>
    );
};

export default Slider;
