import React from 'react';

import {DataMarkupComponent} from '../DataMarkup.component';
import {useCmsPageQuery} from '../../../../cms';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: React.Component,
    /**
     * Page identifier, used to get data from cms
     */
    pageId: string | number
};

export function DataMarkupContainer(props: Props) {
    const {
        as: Component = DataMarkupComponent,
        pageId,
        ...other
    } = props;

    // TODO: an additional request is calling, should be rework
    const q = useCmsPageQuery(pageId);

    return (
        <Component {...other}
                   url={q.data?.cmsPage?.canonical_url}
                   description={q.data?.cmsPage?.meta_description}/>
    );
}
