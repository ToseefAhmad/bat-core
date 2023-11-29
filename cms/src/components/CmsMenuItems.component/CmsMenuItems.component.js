import React from 'react';
import {last} from 'lodash';
import {NavLink} from 'react-router-dom';

import {CmsMenu} from '../../../../types';

type Props = {
    menuTree: CmsMenu
};

const getShortUrl = (url) => last(url.split('/'));

export function CmsMenuItemsComponent(props: Props) {
    const {
        menuTree
    } = props;
    const sortedMenuItems = [...menuTree.children].sort((a, b) => a.position - b.position);

    return (
        <div className="cms-menu-items-component">
            {sortedMenuItems.map(item => (
                <div key={item.id}
                     className="cms-menu-items-component-item">
                    <NavLink className="cms-menu-items-component-link"
                             title={item.title}
                             to={getShortUrl(item.url)}>
                        {item.title}
                    </NavLink>
                </div>
            ))}
        </div>
    );
}
