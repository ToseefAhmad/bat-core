import React from 'react';
import {useLocation} from 'react-router';
import type {ComponentType} from 'react';

import {
    ErrorComponent,
    NoCacheComponent,
    LoaderComponent
} from '@luft/common';

import {useIsAuthorized} from '@luft/user';
import {getCategoryFromTree} from '@luft/catalog/src/utils';

import {MenuSetComponent} from '../MenuSet.component';
import {useMenuItemsByCodeQuery} from '../../hooks';

type Props = {
    as?: ComponentType<{}>,
    loadingAs?: ComponentType<{}>,
    errorAs?: ComponentType<{}>,
    noCacheAs?: ComponentType<{}>,
    awaitResult?: boolean,
    onSelectCategory: Function,
    onOpenCategory: Function
};

export function MenuSetContainer(props: Props) {
    const {
        as: Component = MenuSetComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        ...other
    } = props;

    const isAuthorized = useIsAuthorized();
    const q = useMenuItemsByCodeQuery({menu_set_code: 'main_menu', is_logged_in: isAuthorized});
    const {pathname} = useLocation();

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const categoryTree = q?.tree;
    const currentCategory = getCategoryFromTree(categoryTree, null, pathname);

    return (
        <Component {...other}
                   q={q}
                   categoryTree={categoryTree}
                   currentCategory={currentCategory}/>
    );
}
