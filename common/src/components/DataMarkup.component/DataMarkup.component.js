import React from 'react';
import {Helmet} from 'react-helmet';

type Props = {
    /**
     * Brand name
     */
    brandName: string,
    /**
     * The organization's social media URLs
     */
    mediaLinks: Object,
    /**
     * A direct URL to the organization logo
     */
    logoUrl: string,
    /**
     * The home page URL including locale
     */
    url: string,
    /**
     * A short description in the language of the store view
     */
    description: string
};

export function DataMarkupComponent(props: Props) {
    const {
        brandName,
        mediaLinks,
        logoUrl,
        url,
        description
    } = props;

    return (
        <Helmet>
            <script type="application/ld+json">
                {`
                    {
                        "@context": "http://schema.org",
                        "@type": "Organization",
                        "description": "${description}",
                        "logo": "${logoUrl}",
                        "url": "${url}",
                        "sameAs": "${Object.values(mediaLinks).filter(Boolean)}",
                        "brand": {
                            "@type": "Thing",
                            "name": "${brandName}"
                        }
                    }
                `}
            </script>
        </Helmet>
    );
}
