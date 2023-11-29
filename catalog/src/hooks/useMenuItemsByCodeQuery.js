import {useQuery, hasData} from '@luft/apollo';
import {deserializeTree} from '@luft/catalog/src/utils';

import MENU_ITEMS_BY_CODE_QUERY from '../graphql/queries/MenuItemsByCode.query.graphql';

export const useMenuItemsByCodeQuery = (options = {}, query = MENU_ITEMS_BY_CODE_QUERY) => {
    const {menu_set_code, is_logged_in, ...other} = options;

    const q = useQuery(query, {
        ...other,
        variables: {menu_set_code, is_logged_in}
    });

    const menuItems = q.data?.menuItemsByCode || [];
    const rootSubcategories = menuItems.filter(item => item.parent === '0');

    const root = {
        id: 'root',
        type: 'CATEGORY',
        children: rootSubcategories
    };

    return {
        ...q,
        tree: hasData(q) && deserializeTree([root, ...menuItems])
    };
};
