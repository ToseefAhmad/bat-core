import React, {useMemo} from 'react';
import {Link} from 'react-router-dom';
import {useIntl} from 'react-intl';
import {Helmet} from 'react-helmet';

import {useCurrentStore} from '@luft/multistore';
import type {Category} from '@luft/types';

import messages from './resources/messages';

type Props = {
    /**
     * List of categories which will be displayed in breadcrumbs
     */
    categories?: Category[],
    /**
     * Current product name
     */
    productName?: string
};

const getListItem = (item) => ({
    '@type': 'ListItem',
    name: item.name,
    item: item.url
});

/**
 * The component displays product breadcrumbs
 */
export function ProductBreadcrumbsComponent(
    {
        categories = [],
        productName
    }: Props) {
    const {formatMessage} = useIntl();
    const currentStore = useCurrentStore();
    const baseUrl = currentStore?.base_url;

    const breadcrumbList = useMemo(() => {
        const homeItem = getListItem({
            name: formatMessage(messages.home),
            url: baseUrl
        });
        const categoriesItems = categories.map(category => getListItem({...category, url: category.canonical_url}));
        const productItem = getListItem({
            name: productName
        });

        const items = [homeItem, ...categoriesItems, productItem].map((item, key) => ({...item, position: key + 1}));

        return JSON.stringify(items);
    }, [categories, productName, baseUrl, formatMessage]);

    return (
        <div className="product-breadcrumbs-component">
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
            <Link className="product-breadcrumbs-component-item"
                  title={formatMessage(messages.home)}
                  to="/">
                {formatMessage(messages.home)}
            </Link>
            {categories.map(category => (
                <Link className="product-breadcrumbs-component-item"
                      key={category.id}
                      title={category.name}
                      to={category.url}>
                    {category.name}
                </Link>
            ))}
            <span className="product-breadcrumbs-component-title">
                {productName}
            </span>
        </div>
    );
}
