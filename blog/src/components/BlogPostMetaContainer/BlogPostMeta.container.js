import React from 'react';
import type {ComponentType} from 'react';

import {MetaComponent, LoaderComponent} from '@luft/common';
import {hasData} from '@luft/apollo';

import {useBlogPostQuery, useBlogCanonicalUrlOnPage} from '../../hooks';

type Props = {
    loadingAs?: ComponentType<{}>,
    awaitResult?: boolean,
    blogId: string
};

export function BlogPostMetaContainer(props: Props) {
    const {
        loadingAs: Loading = LoaderComponent,
        awaitResult = true,
        blogId,
        ...other
    } = props;

    const q = useBlogPostQuery(blogId);
    const shouldUseCanonicalUrl = useBlogCanonicalUrlOnPage('post');

    if (!hasData(q)) {
        return null;
    }

    if (awaitResult && q.loading) return Loading && <Loading/>;

    const {blogPost} = q.data;
    const meta = {
        meta_title: blogPost?.meta_title,
        meta_keywords: blogPost?.meta_keywords,
        meta_description: blogPost?.meta_description,
        meta_robots: blogPost?.meta_robots
    };
    const og = {
        type: blogPost?.og_type,
        title: blogPost?.og_title,
        image: blogPost?.og_image,
        description: blogPost?.og_description,
        url: shouldUseCanonicalUrl && blogPost?.canonical_url
    };

    return (
        <MetaComponent {...other}
                       meta={meta}
                       og={og}/>
    );
}
