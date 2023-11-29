import React from 'react';
import {useIntl} from 'react-intl';
import {useHistory} from 'react-router-dom';

import {ButtonComponent} from '@luft/common';

import {useRelativeUrl} from '../../../../common';
import {BlogRelatedPostsComponent} from '../BlogRelatedPosts.component';
import messages from './resources/messages';

import type {BlogPost} from '../../../../types';

type Props = {
    blogs: BlogPost[],
    blogMarketTitle?: string,
    isRelatedPostsEnabled?: boolean,
    blogPageRoute?: string,
    numberOfPosts?: number
};

const RELATED_POSTS_NUMBER = 3;

export function BlogWidgetComponent(props: Props) {
    const {
        blogs = [],
        blogMarketTitle,
        isRelatedPostsEnabled,
        blogPageRoute,
        numberOfPosts = RELATED_POSTS_NUMBER
    } = props;

    const {formatMessage} = useIntl();
    const history = useHistory();
    const redirectUrl = useRelativeUrl(blogPageRoute);

    const relatedPosts = blogs.length > numberOfPosts
        ? blogs.slice(0, numberOfPosts)
        : blogs;

    const handleRedirectBlog = () => {
        history.push(redirectUrl);
    };

    return (
        <div className="blog-widget-component">
            <div className="blog-widget-component-action-block">
                <h3 className="blog-widget-component-action-block-title">
                    {formatMessage(messages.block_title, {
                        blogMarketTitle,
                        bold: (...chunks) => (
                            <span key={chunks}
                                  className="blog-widget-component-action-block-subtitle">
                                {chunks}
                            </span>
                        )
                    })}
                </h3>
                <ButtonComponent variant="link"
                                 title={formatMessage(messages.view_all)}
                                 inline={false}
                                 onClick={handleRedirectBlog}
                                 className="blog-widget-component-action-block-action">
                    {formatMessage(messages.view_all)}
                </ButtonComponent>
            </div>
            {(isRelatedPostsEnabled && !!relatedPosts.length) && (
                <BlogRelatedPostsComponent relatedPosts={relatedPosts}
                                           numberOfPosts={numberOfPosts}
                                           blogPageRoute={blogPageRoute}/>
            )}
        </div>
    );
}
