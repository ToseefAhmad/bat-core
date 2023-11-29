import React, {useEffect} from 'react';
import {useIntl} from 'react-intl';
import {useHistory, useLocation} from 'react-router';

import {BlogPostTileComponent} from '../BlogPostTile.component';
import {PaginationComponent} from '../../../../common';
import messages from './resources/messages';

import type {BlogPost} from '../../../../types';

type Props = {
    pageTitle: string,
    postsPerPage: number,
    blogPageRoute: string,
    blogs: BlogPost[],
    currentPage: number,
    blogsTotalCount: number
};

export function BlogPostListComponent(props: Props = {}) {
    const {
        blogs = [],
        pageTitle,
        postsPerPage,
        blogPageRoute,
        currentPage,
        blogsTotalCount
    } = props;

    const history = useHistory();
    const location = useLocation();
    const {formatMessage} = useIntl();

    const handlePaginationClick = (data) => {
        const page = data.selected + 1;

        history.push({...location, search: `?page=${page}`});
    };

    useEffect(() => {
        window?.scrollTo({top: 0});
    }, [location, currentPage]);

    return (
        <div className="blog-post-list-component">
            <h1 className="blog-post-list-component-title">
                {pageTitle}
            </h1>
            {blogs.length > 0 ? (
                <div className="blog-post-list-component-tiles">
                    {blogs.map(blog => (
                        <BlogPostTileComponent blog={blog}
                                               key={blog.post_id}
                                               blogPageRoute={blogPageRoute}/>
                    ))}
                </div>
            ) : (
                <div className="blog-post-list-component-empty">
                    {formatMessage(messages.no_items)}
                </div>
            )}
            {blogsTotalCount > postsPerPage && (
                <PaginationComponent itemsPerPage={postsPerPage}
                                     itemsCount={blogsTotalCount}
                                     disableInitialCallback={true}
                                     forcePage={currentPage - 1}
                                     onPageChange={handlePaginationClick}/>
            )}
        </div>
    );
}
