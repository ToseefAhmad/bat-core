import React from 'react';

import {BlogPostTileComponent} from '../BlogPostTile.component';

import type {BlogPost} from '../../../../types';

type Props = {
    relatedPosts: BlogPost[],
    blogPageRoute: string,
    numberOfPosts?: number
};

const RELATED_POSTS_NUMBER = 3;

export function BlogRelatedPostsComponent(props: Props) {
    const {
        relatedPosts,
        blogPageRoute,
        numberOfPosts = RELATED_POSTS_NUMBER
    } = props;

    const latestRelatedPosts = relatedPosts.length > numberOfPosts
        ? relatedPosts.slice(numberOfPosts)
        : relatedPosts;

    return (
        <div className="blog-related-posts-component">
            <div className="blog-related-posts-component-tiles">
                {latestRelatedPosts.map((post) => (
                    <BlogPostTileComponent blog={post}
                                           key={post.post_id}
                                           blogPageRoute={blogPageRoute}/>
                ))}
            </div>
        </div>
    );
}
