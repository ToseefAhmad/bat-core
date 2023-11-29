import React, {useMemo} from 'react';
import {useLocation} from 'react-router-dom';

import {useCategoryTreeQuery} from '@luft/catalog';
import {useProductContextField} from '@luft/product';

import {ProductBreadcrumbsComponent} from '../ProductBreadcrumbs.component';

type Props = {
    as?: React.Component
}

export function ProductBreadcrumbsContainer(props: Props) {
    const {
        as: Component = ProductBreadcrumbsComponent,
        ...other
    } = props;

    const {pathname} = useLocation();
    const q = useCategoryTreeQuery();
    const $name = useProductContextField('product.name');
    const menuCategories = q.data?.menu_categories;

    const categories = useMemo(() => {
        if (!menuCategories) return [];

        const path = pathname.split('/');
        const urlCategoriesArr = path.slice(1, -1);

        // return list of categories whose URL presented in the product pathname
        const categoryList = urlCategoriesArr.map(item => menuCategories.find(category => category.url.includes(item)));
        return categoryList.filter(Boolean);
    }, [menuCategories, pathname]);

    return (
        <Component {...other}
                   categories={categories}
                   productName={$name}/>
    );
}
