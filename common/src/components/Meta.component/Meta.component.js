import React from 'react';
import {Helmet} from 'react-helmet';

type Props = {
    meta: {
        meta_title: string,
        meta_keywords: string,
        meta_description: string,
        meta_robots: string
    },
    og?: {
        type: string,
        title: string,
        image: string,
        description: string,
        url: string
    }
}

export function MetaComponent({meta = {}, og = {}}: Props) {
    const {
        meta_title,
        meta_keywords,
        meta_description,
        meta_robots
    } = meta;
    const {type, title, image, description, url} = og;

    return (
        <Helmet>
            {meta_title && (
                <title>
                    {meta_title}
                </title>
            )}
            {meta_keywords && <meta name="keywords"
                                    content={meta_keywords}/>}
            {meta_description && <meta name="description"
                                       content={meta_description}/>}
            {type && <meta property="og:type"
                           content={type}/>}
            {(title || meta_title) && <meta property="og:title"
                                            content={title || meta_title}/>}
            {image && <meta property="og:image"
                            content={image}/>}
            {(description || meta_description) && <meta property="og:description"
                                                        content={description || meta_description}/>}
            {url && <meta property="og:url"
                          content={url}/>}
            {url && <link rel="canonical"
                          href={url}/>}
            {meta_robots && <meta name="robots"
                                  content={meta_robots}/>}
        </Helmet>
    );
}
