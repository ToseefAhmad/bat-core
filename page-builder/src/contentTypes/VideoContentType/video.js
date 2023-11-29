import React, {
    useState,
    useEffect,
    useRef
} from 'react';
import classnames from 'classnames';
import Script from 'react-load-script';
import {useIntl} from 'react-intl';

import {useResolutions} from '@luft/common';

import {useIsVisible} from '../../../../common';
import {useVimeoVideoPreviewUrl} from '../../hooks';
import {
    createVimeoVideoUrl,
    createYouTubeVideoPreviewUrl,
    getVideoIdFromUrl,
    isYouTubeVideo,
    isVimeoVideo
} from '../../utils';

import messages from './resources/messages';
import './video.scss';

type Props = {
    /**
     * An object containing the class names for the Video
     */
    classes: {
        /**
         * CSS classes for the root container element
         */
        root: string,
        /**
         * CSS classes for the inner container element
         */
        inner: string,
        /**
         * CSS classes for the wrapper container element
         */
        wrapper: string,
        /**
         * CSS classes for the container element
         */
        container: string,
        /**
         * CSS classes for the video element
         */
        video: string
    },
    /**
     * URL to render the video from an external provider (YouTube, Vimeo etc)
     */
    url: string,
    /**
     * Video autoplay
     */
    autoplay: boolean,
    /**
     * Video muted
     */
    muted: boolean,
    /**
     * Maximum width of the video
     */
    maxWidth: string,
    /**
     * Alignment of the video within the parent container
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

const getBackgroundImage = (url?: string) => {
    if (!url) return;

    return {backgroundImage: `url(${url})`};
};

/**
 * Page Builder Video component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 *
 * @typedef Video
 * @kind functional component
 *
 * @param {Props} props React component props
 *
 * @returns {React.Element} A React component that displays a Video using an iframe.
 */
const Video = (props: Props) => {
    const {
        url = '',
        autoplay,
        muted,
        maxWidth,
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

    const mainStyles = {
        textAlign,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft
    };
    const innerStyles = {
        maxWidth
    };
    const wrapperStyles = {
        border,
        borderColor,
        borderWidth,
        borderRadius,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
    };

    const {formatMessage} = useIntl();
    const [isClicked, setIsClicked] = useState(false);
    const vimeoVideoPreviewUrl = useVimeoVideoPreviewUrl(url);
    const videoRef = useRef();
    const youtubeVideoRef = useRef();
    const {isSMdown} = useResolutions();
    const isVisible = useIsVisible(videoRef, {isOnlyFirstAppearance: true});

    useEffect(() => {
        if (!window || !url || !isYouTubeVideo(url)) return;

        // This function will be called automatically as soon as YouTube API will be loaded.
        // The function name should be exactly like this
        window.onYouTubeIframeAPIReady = () => {
            const videoId = getVideoIdFromUrl(url);

            // eslint-disable-next-line no-new
            new window.YT.Player(youtubeVideoRef.current, {
                videoId,
                events: {
                    // Autoplay video automatically, when it loads
                    onReady: (e) => e.target.playVideo()
                }
            });
        };
    }, [url]);

    // We want to avoid loading images, which are not visible to the user
    const youtubePreviewStyles = isYouTubeVideo(url) && isVisible && !isClicked
        ? getBackgroundImage(createYouTubeVideoPreviewUrl(url, isSMdown ? 'standard' : 'max'))
        : undefined;
    const vimeoPreviewStyles = isVimeoVideo(url) && isVisible && !isClicked
        ? getBackgroundImage(vimeoVideoPreviewUrl)
        : undefined;

    let Component;

    switch (true) {
        case isYouTubeVideo(url):
            Component = (
                <div className="page-builder-video-component-container">
                    {isClicked ? (
                        <>
                            {/* YouTube video iframe will be inserted instead of this element */}
                            <div ref={youtubeVideoRef}
                                 className="page-builder-video-component-video"/>
                            <Script url="https://www.youtube.com/iframe_api"/>
                        </>
                    ) : (
                        <div className="page-builder-video-component-overlay"
                             style={youtubePreviewStyles}
                             role="button"
                             tabIndex={0}
                             onClick={() => setIsClicked(true)}
                             onKeyPress={() => setIsClicked(true)}>
                            {/* Good old YouTube button */}
                            <button className="page-builder-video-component-youtube-button"
                                    aria-label={formatMessage(messages.play)}
                                    type="button">
                                <svg viewBox="0 0 68 48"
                                     version="1.1"
                                     width="100%"
                                     height="100%">
                                    <path className="page-builder-video-component-youtube-button-bg"
                                          d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                                          fill="#f00"/>
                                    <path d="M 45,24 27,14 27,34"
                                          fill="#fff"/>
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            );
            break;

        case isVimeoVideo(url):
            Component = (
                <div className="page-builder-video-component-container">
                    {isClicked ? (
                        <iframe frameBorder="0"
                                allowFullScreen="1"
                                loading="lazy"
                                title={url}
                                src={createVimeoVideoUrl(url)}
                                className="page-builder-video-component-video"
                                allow="autoplay"/>
                    ) : (
                        <div className="page-builder-video-component-overlay"
                             style={vimeoPreviewStyles}
                             role="button"
                             tabIndex={0}
                             onClick={() => setIsClicked(true)}
                             onKeyPress={() => setIsClicked(true)}>
                            {/* Standard Vimeo button */}
                            {vimeoVideoPreviewUrl && (
                                <button className="page-builder-video-component-vimeo-button"
                                        aria-label={formatMessage(messages.play)}
                                        type="button">
                                    <svg viewBox="0 0 20 20"
                                         preserveAspectRatio="xMidYMid"
                                         focusable="false"
                                         aria-hidden="true"
                                         className="page-builder-video-component-vimeo-button-icon">
                                        <polygon className="page-builder-video-component-vimeo-button-triangle"
                                                 points="1,0 20,10 1,20"/>
                                    </svg>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            );
            break;

        case !!url:
            Component = (
                <div className="page-builder-video-component-container">
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                    <video className="page-builder-video-component-video"
                           src={url}
                           autoPlay={autoplay}
                           muted={muted}
                           frameBorder="0"
                           controls={true}/>
                </div>
            );
            break;

        default:
            Component = null;
    }

    return (
        <div style={mainStyles}
             className={classnames('page-builder-video-component', ...cssClasses)}
             ref={videoRef}>
            <div style={innerStyles}
                 className="page-builder-video-component-inner">
                <div style={wrapperStyles}
                     className="page-builder-video-component-wrapper">
                    {Component}
                </div>
            </div>
        </div>
    );
};

export default Video;
