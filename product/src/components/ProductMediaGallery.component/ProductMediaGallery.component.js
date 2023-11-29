import React, {
    useCallback,
    useMemo,
    useState
} from 'react';
import {Magnifier} from 'react-image-magnifiers';
import classnames from 'classnames';

import {
    ImageComponent,
    ImagePlaceholderContainer,
    VideoComponent,
    SliderComponent
} from '@luft/common';
import {useProductContextField, ProductContext} from '@luft/product';
import type {Image, Video} from '@luft/types';

import {ProductMediaGalleryPreviewComponent} from '../ProductMediaGalleryPreview.component';

type Props = {
    /**
     * A list of product gallery images
     *
     * **Default value from ProductContext**
     */
    galleryImages?: Image[] | ProductContext.product.gallery_images,
    /**
     * A list of product gallery videos
     *
     * **Default value from ProductContext**
     */
    galleryVideos?: Video[] | ProductContext.product.gallery_videos,
    /**
     * Flag, that identifies if slider navigation is enabled
     */
    navigation?: boolean,
    /**
     * Flag, that identifies if slider pagination is enabled
     */
    pagination?: boolean
};

/**
 * Presentational component that displays slider of product images and videos.
 */
export function ProductMediaGalleryComponent(
    {
        galleryImages,
        galleryVideos,
        navigation = true,
        pagination = true,
        ...others
    }: Props) {
    const $galleryImages = useProductContextField('product.gallery_images', galleryImages);
    const $galleryVideos = useProductContextField('product.gallery_videos', galleryVideos);

    // The dirty hack to drop old gallery with both swipers so they don't refer to undefined values.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const key = useMemo(() => Date.now(), [$galleryImages, $galleryVideos]);

    return (
        <ProductMediaGalleryInnerComponent key={key}
                                           galleryImages={$galleryImages}
                                           galleryVideos={$galleryVideos}
                                           navigation={navigation}
                                           pagination={pagination}
                                           {...others}/>
    );
}

// inner component, that should be reinitialised once list of items has changed
function ProductMediaGalleryInnerComponent(
    {
        galleryImages,
        galleryVideos,
        navigation,
        pagination,
        ...others
    }: Props) {
    const [isZoom, setIsZoom] = useState(false);
    const [videoPlayingKey, setVideoPlayingKey] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const hasItems = !!galleryImages?.length || !!galleryVideos?.length;
    const isSingleItem = hasItems && ((galleryImages?.length || 0) + (galleryVideos?.length || 0) === 1);
    const hideControls = isSingleItem || isZoom;
    const galleryClassNames = classnames('product-media-gallery-component-carousel', {
        'product-media-gallery-component-carousel-hide-controls': hideControls
    });

    // It needs to be memoized, otherwise there will be a need to click twice on image to zoom it
    const MagnifiedImageComponent = useCallback(({src, alt, onLoad}) => (
        <div className="product-media-gallery-component-magnifier">
            <Magnifier imageSrc={src}
                       imageAlt={alt}
                       style={{maxHeight: '100%'}}
                       touchActivation="doubleTap"
                       onImageLoad={onLoad}
                       onZoomStart={() => setIsZoom(true)}
                       onZoomEnd={() => setIsZoom(false)}
                       fluid/>
        </div>
    ), []);

    const handleSlideChange = (swiper) => {
        const {isBeginning, realIndex} = swiper;

        // Skip duplicate slide and scroll to the original one
        if (isBeginning) {
            swiper.slideToLoop(realIndex);
        }

        setVideoPlayingKey(null);
        setIsZoom(false);
    };

    if (!galleryImages?.length && !galleryVideos?.length) {
        return (
            <div className="product-media-gallery-component">
                <div className="product-media-gallery-component-placeholder">
                    <ImagePlaceholderContainer variant="base"/>
                </div>
            </div>
        );
    }

    if (isSingleItem) {
        return (
            <div className="product-media-gallery-component">
                {galleryImages?.[0] ? (
                    <ImageComponent className="product-media-gallery-component-image"
                                    image={galleryImages[0]}
                                    as={MagnifiedImageComponent}/>
                ) : galleryVideos?.[0] ? (
                    <VideoComponent className="product-media-gallery-component-video"
                                    url={galleryVideos[0].url}
                                    playing={videoPlayingKey === galleryVideos[0].url}
                                    onVideoPlay={() => setVideoPlayingKey(galleryVideos[0].url)}
                                    onPause={() => setVideoPlayingKey(null)}
                                    controls={true}/>
                ) : null}
            </div>
        );
    }

    return (
        <div className="product-media-gallery-component">
            {/* Thumbs Swiper -> store swiper instance */}
            {!isSingleItem && (
                <div className="product-media-gallery-component-preview">
                    <ProductMediaGalleryPreviewComponent onSwiper={setThumbsSwiper}
                                                         galleryImages={galleryImages}
                                                         galleryVideos={galleryVideos}/>
                </div>
            )}
            <div className={galleryClassNames}>
                {/* Main Swiper -> pass thumbs swiper instance */}
                <SliderComponent thumbs={{swiper: thumbsSwiper}}
                                 navigation={navigation}
                                 pagination={pagination}
                                 slidesPerView={1}
                                 simulateTouch={false}
                                 loop={true}
                                 onSlideChange={handleSlideChange}
                                 {...others}>
                    {galleryImages?.map(galleryImage => (
                        <SliderComponent.Slide key={galleryImage.url}>
                            <ImageComponent className="product-media-gallery-component-image"
                                            image={galleryImage}
                                            as={MagnifiedImageComponent}/>
                        </SliderComponent.Slide>
                    ))}
                    {galleryVideos?.map((galleryVideo, key) => (
                        <SliderComponent.Slide key={galleryVideo.url}
                                               className="product-media-gallery-component-item">
                            {({isDuplicate}) => (
                                <VideoComponent className="product-media-gallery-component-video"
                                                url={galleryVideo.url}
                                                playing={videoPlayingKey === key && !isDuplicate}
                                                onVideoPlay={() => setVideoPlayingKey(key)}
                                                onPause={() => setVideoPlayingKey(null)}
                                                controls={true}/>
                            )}
                        </SliderComponent.Slide>
                    ))}
                </SliderComponent>
            </div>
        </div>
    );
}
