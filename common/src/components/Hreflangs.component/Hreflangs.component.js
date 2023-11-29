import React from 'react';
import {Helmet} from 'react-helmet';

import type {Hreflang} from '../../../../types';

type Props = {
    hreflangs: Hreflang[]
}

export function HreflangsComponent({hreflangs = []}: Props) {
    if (!hreflangs?.length) return null;

    return (
        <Helmet>
            {hreflangs.map(hreflang => (
                <link key={hreflang.language}
                      rel="alternate"
                      hrefLang={hreflang.language}
                      href={hreflang.url}/>
            ))}
        </Helmet>
    );
}
