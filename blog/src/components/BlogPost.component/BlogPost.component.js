import React from 'react';

import {ImageComponent} from '@luft/common';
import {CmsContentComponent} from '@luft/cms';

import {BlogWidgetComponent} from '../BlogWidget.component';
import {BlogShareComponent} from '../BlogShare.component';
import {useFormatDate} from '../../../../common';

import type {BlogPost} from '../../../../types';

type Props = {
    blog: BlogPost,
    blogMarketTitle?: string,
    isRelatedPostsEnabled?: boolean,
    blogPageRoute?: string,
    isSocialSharingEnabled?: boolean,
    addThisId: string,
    addThisLang: string
};

export function BlogPostComponent(props: Props = {}) {
    const {
        blog = {},
        blogMarketTitle,
        isRelatedPostsEnabled,
        blogPageRoute,
        isSocialSharingEnabled,
        addThisId,
        addThisLang
    } = props;

    const {
        title,
        publish_time,
        featured_image,
        featured_img_alt,
        filtered_content,
        related_posts = [],
        post_url
    } = blog;
    const image = {url: featured_image, alt: featured_img_alt};
    const convertedDateString = useFormatDate({
        date: publish_time,
        options: {
            month: 'short'
        }
    });

    return (
        <div className="blog-post-component">
            <div className="blog-post-component-image-block">
                <ImageComponent imgClassName="blog-post-component-image"
                                image={image}
                                variant="small"/>
            </div>
            <div className="blog-post-component-wrapper">
                <h1 className="blog-post-component-title">
                    {title}
                </h1>
                <div className="blog-post-component-date">
                    {convertedDateString}
                </div>
                {isSocialSharingEnabled && (
                    <BlogShareComponent id={addThisId}
                                        lang={addThisLang}
                                        title={title}
                                        url={post_url}/>
                )}
                <div className="blog-post-component-content">
                    <CmsContentComponent content={filtered_content}/>
                </div>
                {isSocialSharingEnabled && (
                    <BlogShareComponent id={addThisId}
                                        lang={addThisLang}
                                        title={title}
                                        url={post_url}/>
                )}
            </div>
            <BlogWidgetComponent blogMarketTitle={blogMarketTitle}
                                 isRelatedPostsEnabled={isRelatedPostsEnabled}
                                 blogs={related_posts}
                                 blogPageRoute={blogPageRoute}/>
        </div>
    );
}
