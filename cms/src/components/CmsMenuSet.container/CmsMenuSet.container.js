import React from 'react';
import type {ComponentType} from 'react';

import {
    ErrorComponent,
    NoCacheComponent,
    LoaderComponent
} from '@luft/common';

import {CmsMenuSetComponent} from '../CmsMenuSet.component';
import {useMenuItemsByCodeQuery} from '../../../../catalog';
import {getActiveItemByPath} from '../../util';

type Props = {
    as?: ComponentType<{}>,
    loadingAs?: ComponentType<{}>,
    errorAs?: ComponentType<{}>,
    noCacheAs?: ComponentType<{}>,
    awaitResult?: boolean,
    menuSetCode?: string,
    entityUrl: string
};

export function CmsMenuSetContainer(props: Props) {
    const {
        as: Component = CmsMenuSetComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        menuSetCode = 'cms_menu',
        entityUrl,
        ...other
    } = props;

    const q = useMenuItemsByCodeQuery({menu_set_code: menuSetCode});

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const menuTree = q?.tree;
    const currentPage = getActiveItemByPath(menuTree, entityUrl);

    if (!currentPage) return null;

    return (
        <Component {...other}
                   menuTree={menuTree}
                   currentPage={currentPage}/>
    );
}
