// TODO: Remove this file after upgrading @magento/pagebuilder version to v7.3.0 or higher
import React, {CSSProperties} from 'react';
import classnames from 'classnames';

import {PageBuilder} from '../../components';

type Props = {
    content: string,
    /**
     * React CSS Properties Object
     */
    style?: CSSProperties,
    /**
     * custom className
     */
    className?: string
};

/**
 * Product list content type
 */
export function BlockContentType(
    {
        content,
        style,
        className
    }: Props) {
    return (
        <div className={classnames('block-content-type', className)}
             style={style}>
            <PageBuilder html={content}
                         classes={{root: 'page-builder-component-block'}}/>
        </div>
    );
}
