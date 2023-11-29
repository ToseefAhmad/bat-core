import React, {useState} from 'react';
import classnames from 'classnames';

import {isDevelopment} from '@luft/util';
import {ButtonComponent} from '@luft/common';
import type {StoreSwitcherEntity} from '@luft/types';

import {getLanguageCodeByPathname} from '../../../../common';

type Props = {
    storeViews?: StoreSwitcherEntity[],
    languages: { [code: string]: string }
};

export function StoreViewSwitcherComponent(props: Props) {
    const {
        storeViews = [],
        languages
    } = props;
    const hasWindow = typeof window !== 'undefined';

    const [open, setOpen] = useState(false);

    const onChangeLocation = (e, baseUrl) => {
        e.preventDefault();

        if (!hasWindow) return;

        if (isDevelopment()) {
            const newUrl = new URL(baseUrl).pathname.replace(/\/$/, '');
            window.location = newUrl || '/';
        } else {
            // adds a trailing slash to the url
            window.location = baseUrl.replace(/\/?$/, '/');
        }
    };

    if (storeViews.length === 1 || !languages) {
        return null;
    }

    const getLanguage = (storeView) => {
        const languageCode = getLanguageCodeByPathname(storeView.base_url);
        return languages[languageCode];
    };

    const notCurrentStoreViews = storeViews.filter(s => !s.is_current);
    const isSingle = notCurrentStoreViews.length === 1;
    const firstStoreView = notCurrentStoreViews[0];

    const classNames = classnames('store-view-switcher-component-section', {
        'store-view-switcher-component-section-active': open
    });

    return (
        <div className="store-view-switcher-component">
            {isSingle ? (
                <a key={firstStoreView.base_url}
                   href={firstStoreView.base_url}
                   className="store-view-switcher-component-icon"
                   onClick={(e) => onChangeLocation(e, firstStoreView.base_url)}>
                    {getLanguage(firstStoreView)}
                </a>
            ) : (
                <>
                    <ButtonComponent className="store-view-switcher-component-toggle store-view-switcher-component-icon"
                                     onClick={() => setOpen(prev => !prev)}
                                     aria-controls="store-view-switcher-list"
                                     aria-expanded={open}/>
                    <div className={classNames}
                         id="store-view-switcher-list">
                        {notCurrentStoreViews.map(storeView => (
                            <div key={storeView.base_url}
                                 className="store-view-switcher-component-section-item">
                                <a href={storeView.base_url}
                                   className="store-view-switcher-component-section-link"
                                   onClick={(e) => onChangeLocation(e, storeView.base_url)}>
                                    {getLanguage(storeView)}
                                </a>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
