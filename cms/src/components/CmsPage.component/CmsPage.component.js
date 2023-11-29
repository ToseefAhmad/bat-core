/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import classnames from 'classnames';

import {CmsMetaContainer, CmsContentComponent} from '@luft/cms';
import type {CmsPage} from '@luft/types';

import {FaqDataMarkupComponent} from '../FaqDataMarkup.component';
import {HreflangsComponent, DataMarkupContainer} from '../../../../common';
import {BlogPostListContainer, BlogWidgetComponent} from '../../../../blog';

import type {Hreflang} from '../../../../types';

type Props = {
    cmsPage: CmsPage,
    pageId: string,
    brandName?: string,
    isBlogWidgetEnabled?: boolean,
    numberOfPosts?: number,
    mediaLinks?: Object,
    logoUrl?: string,
    hreflangs: Hreflang[]
};

export function CmsPageComponent({
    cmsPage,
    pageId,
    brandName,
    isBlogWidgetEnabled,
    numberOfPosts,
    mediaLinks,
    logoUrl,
    hreflangs
}: Props) {
    const isFaqPage = !!useRouteMatch('/faqs');
    const isHomePage = useRouteMatch('/')?.isExact;
    const isBlogWidgetShown = isHomePage && isBlogWidgetEnabled;

    if (!cmsPage) {
        return null;
    }

    const handleToggleAccordion = (e) => {
        const accordion = e.target.closest('.cms-accordion');

        if (!accordion) return;
        if (e.target.className !== 'cms-accordion-action') return;

        accordion.classList.toggle('active');
    };

    const className = classnames('cms-page-component', {
        'cms-page-component-homepage': isHomePage
    });

    return (
        <div className={className}
             onClick={handleToggleAccordion}>
            {isFaqPage && <FaqDataMarkupComponent content={cmsPage.content}/>}
            {isHomePage && (
                <>
                    <HreflangsComponent hreflangs={hreflangs}/>
                    <DataMarkupContainer brandName={brandName}
                                         mediaLinks={mediaLinks}
                                         logoUrl={logoUrl}
                                         pageId={pageId}/>
                </>
            )}
            <CmsMetaContainer pageId={pageId}/>
            <CmsContentComponent content={cmsPage.content}/>
            {isBlogWidgetShown && <BlogPostListContainer as={BlogWidgetComponent}
                                                         isBlogWidget={true}
                                                         isRelatedPostsEnabled={isBlogWidgetEnabled}
                                                         blogMarketTitle={brandName}
                                                         numberOfPosts={numberOfPosts}/>}
        </div>
    );
}
