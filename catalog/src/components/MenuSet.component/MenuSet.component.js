import React, {useEffect} from 'react';
import type {ComponentType} from 'react';
import {useIntl} from 'react-intl';
import {noop} from 'lodash';
import classnames from 'classnames';
import {NavLink} from 'react-router-dom';

import {AccordionComponent, useResolutions} from '@luft/common';
import {CmsContentComponent} from '@luft/cms';
import type {Category} from '@luft/types';

import {isCategoryInPath} from './util';
import {useMenu} from '../../hooks';

import messages from './resources/messages';

// it intents to highlight only deepest visible category, that is active right now.
// TODO: reduce complexity of this logic
const getCategoryClassNames = (currentCategory, category, activeCategoryId, className) => {
    const menuCategoryActive = isCategoryInPath(category, currentCategory) && activeCategoryId !== category.id;

    return classnames('menu-set-component-category', className, {
        'menu-set-component-category-active': menuCategoryActive
    });
};

const getLeafCategoryClasses = (currentCategory, category) => {
    const menuCategoryActive = currentCategory && category.id === currentCategory.id;

    return classnames('menu-set-component-category', {
        'menu-set-component-category-active': menuCategoryActive,
        'menu-set-component-cms': category.type === 'CMS_BLOCK'
    });
};

const getCategoryIconClassNames = (category) => classnames('menu-set-component-icon', {
    'menu-set-component-cms-content': category.type === 'CMS_BLOCK'
});

const getCategoryTitleClassNames = (category) => classnames('menu-set-component-title', {
    'no-display': category.type === 'CMS_BLOCK'
});

const getNavItemClass = (category) => classnames('menu-set-component-nav', category.frontend_class, {
    'cms-content': category.type === 'CMS_BLOCK'
});

type Props = {
    categoryTree: Category,
    currentCategory: Category,
    onOpenCategory: Function,
    onSelectCategory: Function,
    isShowAllControlVisible?: boolean,
    activeCategoryId?: string,
    segmentAfterPrimaryInformation?: ComponentType<{activeCategoryId: string}>
}

export function MenuSetComponent(props: Props) {
    const {formatMessage} = useIntl();

    const {
        categoryTree,
        currentCategory,
        onOpenCategory = noop,
        onSelectCategory = noop,
        isShowAllControlVisible = true,
        segmentAfterPrimaryInformation: AfterPrimaryInformation,
        ...other
    } = props;

    const {isXS} = useResolutions();
    const {activeCategoryId, setActiveCategoryId, onCloseCategories} = useMenu();

    const handleToggleCategory = (category) => {
        const newId = category.id !== activeCategoryId ? category.id : undefined;
        setActiveCategoryId(newId);
        onOpenCategory(newId && category);
    };

    const handleShowAll = (category) => {
        onSelectCategory(category);
        onCloseCategories();
    };

    const handleClick = () => {
        if (!activeCategoryId) return;
        onCloseCategories();
    };

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    });

    if (!categoryTree?.children?.length) {
        return null;
    }

    const sortedMenuItems = [...categoryTree.children].sort((a, b) => a.position - b.position);

    return (
        <AccordionComponent className="menu-set-component"
                            activeKey={activeCategoryId}>
            {sortedMenuItems.map(category => (
                <div key={category.id}
                     className={getNavItemClass(category)}
                     style={{order: category.position}}>
                    {!category.children || !category.children.length ? (
                        <>
                            {!(category.type === 'CMS_BLOCK' && isXS) && (
                                <>
                                    {!category.url ? (
                                        <span className={getLeafCategoryClasses(currentCategory, category)}
                                              role="button"
                                              tabIndex="0"
                                              onClick={() => onSelectCategory(category)}
                                              onKeyPress={noop}>
                                            <span className={getCategoryIconClassNames(category)}>
                                                <CmsContentComponent content={category.content}/>
                                            </span>
                                            <span className={getCategoryTitleClassNames(category)}>
                                                {category.title}
                                            </span>
                                        </span>
                                    ) : (
                                        <NavLink className={getLeafCategoryClasses(currentCategory, category)}
                                                 title={category.title}
                                                 to={category.url}
                                                 onClick={() => onSelectCategory(category)}>
                                            <span className={getCategoryIconClassNames(category)}>
                                                <CmsContentComponent content={category.content}/>
                                            </span>
                                            <span className={getCategoryTitleClassNames(category)}>
                                                {category.title}
                                            </span>
                                        </NavLink>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <AccordionComponent.Toggle className={getCategoryClassNames(currentCategory, category, activeCategoryId, 'menu-set-component-toggle')}
                                                       eventKey={category.id}
                                                       onClick={() => handleToggleCategory(category)}>
                                <span className="menu-set-component-icon">
                                    <CmsContentComponent content={category.content}/>
                                </span>
                                {category.title}
                            </AccordionComponent.Toggle>
                            <AccordionComponent.Collapse className="menu-set-component-collapse"
                                                         eventKey={category.id}>
                                <div className="menu-set-component-collapse-content">
                                    <div className="menu-set-component-wrapper">
                                        <MenuSetComponent categoryTree={category}
                                                          currentCategory={currentCategory}
                                                          onOpenCategory={onOpenCategory}
                                                          onSelectCategory={onSelectCategory}
                                                          {...other}/>
                                    </div>
                                    {/* if more than 2 child categories, display show all control */}
                                    {isShowAllControlVisible && category.children.length > 1 && (
                                        <NavLink className="menu-set-component-all"
                                                 to={category.url}
                                                 title={category.title}
                                                 onClick={() => handleShowAll(category)}>
                                            {formatMessage(messages.show_all)}
                                            <span className="menu-set-component-all-icon"/>
                                        </NavLink>

                                    )}
                                </div>
                            </AccordionComponent.Collapse>
                        </>
                    )}
                </div>
            ))}
            {!!AfterPrimaryInformation && (
                <AfterPrimaryInformation activeCategoryId={activeCategoryId}/>
            )}
        </AccordionComponent>
    );
}
