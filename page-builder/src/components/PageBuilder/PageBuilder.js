// TODO: Remove this file after upgrading @magento/pagebuilder version to v7.3.0 or higher
import React, {useMemo} from 'react';
import parseStorageHtml from '@magento/pagebuilder/lib/parseStorageHtml';

import {ContentTypeFactory} from '../ContentTypeFactory';

type Props = {
    html: string,
    classes: { root: string }
};

export function PageBuilder({html, classes}: Props) {
    const data = useMemo(() => parseStorageHtml(html), [html]);

    return data.children.map((child, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i}
             className={classes.root}>
            <ContentTypeFactory data={child}/>
        </div>
    ));
}
