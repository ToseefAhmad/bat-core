// TODO: Remove this file after upgrading @magento/pagebuilder version to v7.3.0 or higher
// File content is taken from @magento/pagebuilder v7.3.0 (it's slightly modified).
// https://github.com/magento/pwa-studio/blob/develop/packages/pagebuilder/lib/factory.js
import React, {Suspense} from 'react';
import {getContentTypeConfig} from '@magento/pagebuilder/lib/config';

type ContentTypeData = {
    isHidden: boolean,
    contentType: string,
    cssClasses?: string[],
    children: ContentTypeData[]
};

type Props = {
    data: ContentTypeData
};

/**
 * Render a content type
 *
 * @param Component
 * @param data
 * @returns {*}
 */
const renderContentType = (Component: React.Component, data: ContentTypeData) => (
    <Component {...data}>
        {data.children.map((childTreeItem, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <ContentTypeFactory key={i}
                                data={childTreeItem}/>
        ))}
    </Component>
);

/**
 * Create an instance of a content type component based on configuration
 *
 * @param data
 * @returns {*}
 * @constructor
 */
export const ContentTypeFactory = ({ data }: Props) => {
    const {isHidden, ...other} = data;
    const {component, componentShimmer} = getContentTypeConfig(other.contentType) ?? {};

    if (isHidden || !component) return null;

    const ComponentShimmer = componentShimmer ? renderContentType(componentShimmer, other) : null;
    const Component = renderContentType(component, other);

    return (
        <Suspense fallback={ComponentShimmer}>
            {Component}
        </Suspense>
    );
};
