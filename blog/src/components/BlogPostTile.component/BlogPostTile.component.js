import React from 'react';
import {useIntl} from 'react-intl';
import {Link} from 'react-router-dom';

import {ImageComponent, ButtonComponent} from '@luft/common';
import {CmsContentComponent} from '@luft/cms';

import {useRelativeUrl, useFormatDate} from '../../../../common';
import messages from './resources/messages';

import type {BlogPost} from '../../../../types';

type Props = {
    blog: BlogPost
};

export function BlogPostTileComponent(props: Props) {
    const {
        blog
    } = props;

    const {
        title,
        publish_time,
        featured_image,
        featured_img_alt,
        short_content,
        post_url
    } = blog;

    const {formatMessage} = useIntl();

    const image = {url: featured_image, alt: featured_img_alt};
    const convertedDateString = useFormatDate({
        date: publish_time,
        options: {
            month: 'short'
        }
    });
    const redirectUrl = useRelativeUrl(post_url);

    return (
        <div className="blog-post-tile-component">
            <Link className="blog-post-tile-component-link-wrapper"
                  role="link"
                  title={title}
                  to={redirectUrl}>
                <div className="blog-post-tile-component-image">
                    <ImageComponent className="blog-post-tile-component-image"
                                    image={image || {}}
                                    variant="small"/>
                </div>
                <div className="blog-post-tile-component-date">
                    {convertedDateString}
                </div>
                <div className="blog-post-tile-component-title">
                    {title}
                </div>
                <div className="blog-post-tile-component-content">
                    <CmsContentComponent content={short_content}/>
                </div>
                <ButtonComponent variant="link"
                                 title={formatMessage(messages.read_more)}
                                 className="blog-post-tile-component-action">
                    {formatMessage(messages.read_more)}
                </ButtonComponent>
            </Link>
        </div>
    );
}
