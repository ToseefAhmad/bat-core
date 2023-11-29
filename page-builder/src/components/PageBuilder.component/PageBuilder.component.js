// TODO: Remove this file after upgrading @magento/pagebuilder version to v7.3.0 or higher
// Exceptional case of importing styles in core component.
// This is required for Magento page builder styles, which are implemented with modules
// So this component should always contain the styles as a proxy component
import React from 'react';

import {DefaultRendererComponent} from '@luft/cms';
import {useIsPageBuilderContent} from '@luft/page-builder';

import {PageBuilder} from '../PageBuilder';

type Props = {
    /**
     * Content, that should be rendered with PageBuilder
     */
    content: string
}

/**
 * Component displays content from Magento Page Builder
 */
export function PageBuilderComponent({content}: Props) {
    const isPageBuilderContent = useIsPageBuilderContent(content);

    if (!isPageBuilderContent) {
        return (
            <DefaultRendererComponent content={content}/>
        );
    }

    // window check is required because code Magento pagebuilder code can only be executed in Browser
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <div className="page-builder-component">
            <PageBuilder html={content}
                         classes={{root: 'page-builder-component-block'}}/>
        </div>
    );
}
