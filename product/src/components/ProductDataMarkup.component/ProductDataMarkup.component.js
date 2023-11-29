import React from 'react';
import {Helmet} from 'react-helmet';

import {useProductContextField} from '@luft/product';

import {getProductPrice} from '../../utils';

type Props = {
    /**
     * Brand name
     */
    brandName: string
};

export function ProductDataMarkupComponent({brandName}: Props) {
    const product = useProductContextField('product');
    const {
        name,
        sku,
        short_description,
        gallery_images,
        reviews,
        price
    } = product;
    const galleryImagesURL = JSON.stringify(gallery_images?.map(image => image.url) || []);
    const productPrice = getProductPrice(price);

    return (
        <Helmet>
            <script type="application/ld+json">
                {`
                    {
                        "@context": "http://schema.org",
                        "@type": "Product",
                        "name": "${name}",
                        "image": ${galleryImagesURL},
                        "description": "${short_description}",
                        "sku": "${sku}",
                        "brand": {
                            "@type": "Thing",
                            "name": "${brandName}"
                        },
                         "review": {
                             "@type": "Review",
                             "reviewRating": {
                                "@type": "Rating",
                                "bestRating": "5"
                            }
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "${reviews?.summary?.value ?? ''}",
                            "reviewCount": "${reviews?.total ?? ''}"
                        },
                        "offers": {
                            "@type": "Offer",
                            "priceCurrency": "${productPrice?.currency ?? ''}",
                            "price": "${productPrice?.value ?? ''}",
                            "itemCondition": "https://schema.org/UsedCondition",
                            "availability": "https://schema.org/InStock"
                        }
                    }
                `}
            </script>
        </Helmet>
    );
}
