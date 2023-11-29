import React, {useMemo} from 'react';

import {ImageComponent, SliderComponent} from '@luft/common';
import {ProductContext, useProductContextField} from '@luft/product';
import type {Image, Video} from '@luft/types';

function mapToPreviewItems(galleryImages: Image[], galleryVideos: Video[]) {
    return [...(galleryImages || []), ...(galleryVideos || []).map((videoItem) => (
        {
            id: videoItem.preview_url,
            name: videoItem.title,
            alt: videoItem.title,
            url: videoItem.preview_url
        }))];
}

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
     * A callback that receives Swiper instance
     */
    onSelect?: (id: string) => void,
    /**
     * A callback that receives Swiper instance
     */
    onSwiper?: () => void
};

/**
 * Presentational component that displays slider with previews of product images and videos
 */
export function ProductMediaGalleryPreviewComponent(
    {
        galleryImages = [],
        galleryVideos = [],
        onSelect,
        onSwiper,
    }: Props) {
    const $galleryImages = useProductContextField('product.gallery_images', galleryImages);
    const $galleryVideos = useProductContextField('product.gallery_videos', galleryVideos);
    const previews = useMemo(() => mapToPreviewItems($galleryImages, $galleryVideos), [$galleryImages, $galleryVideos]);

    return !!previews?.length && (
        <div className="product-media-gallery-preview-component">
            <SliderComponent onSwiper={onSwiper}
                             navigation
                             slidesPerView="auto"
                             direction="horizontal"
                             loop={false}>
                {previews.map((preview, index) => (
                    <SliderComponent.Slide key={preview.url}
                                           role="button"
                                           tabIndex={0}
                                           onClick={() => onSelect && onSelect(index)}
                                           onKeyDown={() => onSelect && onSelect(index)}>
                        <ImageComponent className="product-media-gallery-preview-component-image"
                                        image={preview}
                                        ratio={1}/>
                    </SliderComponent.Slide>
                ))}
            </SliderComponent>
        </div>
    );
}
