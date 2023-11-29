import React, {useCallback, useMemo} from 'react';
import classnames from 'classnames';
import {useIntl} from 'react-intl';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import {useResolutions} from '@luft/common';
import {useCurrentStore} from '@luft/multistore';
import type {Category} from '@luft/types';
import messages from '@luft/catalog/src/components/CategoryBreadcrumbs.component/resources/messages';

type Props = {
    /**
     * Current selected category
     */
    selectedCategory?: Category,
    /**
     * Flag, that identifies if current selected category should be shown
     */
    selectedLevel?: boolean,
    /**
     * Callback used to navigate to the category
     */
    onCategoryNavigate: (category: Category, event: Event) => void
}

const getListItem = (item) => ({
    '@type': 'ListItem',
    name: item.name,
    item: item.url
});

/**
 * Category breadcrumbs, used to show path from root category to current selected category
 */
export function CategoryBreadcrumbsComponent({
    selectedCategory,
    selectedLevel = true,
    onCategoryNavigate
}: Props) {
    const {formatMessage} = useIntl();
    const {isXS} = useResolutions();
    const {parent} = selectedCategory || {};
    const currentStore = useCurrentStore();
    const baseUrl = currentStore?.base_url;

    const handleCategoryNavigate = useCallback(e => {
        if (onCategoryNavigate) onCategoryNavigate(parent, e);
    }, [parent, onCategoryNavigate]);

    const breadcrumbList = useMemo(() => {
        const homeItem = getListItem({
            name: formatMessage(messages.home),
            url: baseUrl
        });
        let currentCategory = selectedCategory;
        const categories = [];
        while (currentCategory.parent) {
            categories.unshift(currentCategory);
            currentCategory = currentCategory.parent;
        }
        const categoriesItems = categories.map(category => getListItem({...category, url: category.canonical_url}));
        const items = [homeItem, ...categoriesItems].map((item, key) => ({...item, position: key + 1}));

        return JSON.stringify(items);
    }, [selectedCategory, baseUrl, formatMessage]);

    const isRootCategory = !parent || !parent.parent; // if parent category doesn't have parent, then it's root
    const url = isRootCategory ? '/' : parent.url;
    const title = isRootCategory ? formatMessage(messages.home) : parent.name;
    const classNames = classnames('category-breadcrumbs-item', {
        'category-breadcrumbs-item-back': !isRootCategory
    });
    const rootClassNames = classnames('category-breadcrumbs-component', {
        'category-breadcrumbs-component-root': isRootCategory
    });

    const hasParent = !!parent && !!parent.parent;

    if (!selectedCategory) {
        return null;
    }

    return (
        <div className={rootClassNames}>
            {selectedLevel && (
                <Helmet>
                    <script type="application/ld+json">
                        {`
                            {
                                "@context": "https://schema.org",
                                "@type": "BreadcrumbList",
                                "itemListElement": ${breadcrumbList}
                            }
                        `}
                    </script>
                </Helmet>
            )}

            {(isXS) ? (
                <Link className="category-breadcrumbs"
                      href={url}
                      title={title}
                      to={url}
                      onClick={handleCategoryNavigate}>
                    <div className={classNames}>
                        <span className="category-breadcrumbs-item-title">
                            {title}
                        </span>
                    </div>
                </Link>
            ) : (
                <>
                    {hasParent && <CategoryBreadcrumbsComponent selectedCategory={parent}
                                                                selectedLevel={false}/>}
                    <Link className="category-breadcrumbs"
                          href={url}
                          title={title}
                          to={url}
                          onClick={handleCategoryNavigate}>
                        <div className="category-breadcrumbs-item">
                            <span className="category-breadcrumbs-item-title">
                                {title}
                            </span>
                        </div>
                    </Link>
                    {selectedLevel && (
                        <span className="category-breadcrumbs-item-title">
                            {selectedCategory.name}
                        </span>
                    )}
                </>
            )}
        </div>
    );
}
