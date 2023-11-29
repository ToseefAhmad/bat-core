import React from 'react';

import {AccordionComponent, useResolutions} from '@luft/common';

import {CmsMenuItemsComponent} from '../CmsMenuItems.component';
import type {MenuItem} from '../../../../types';

type Props = {
    currentPage: MenuItem
}

export function CmsMenuSetComponent(props: Props) {
    const {
        currentPage,
        ...other
    } = props;
    const {isSMdown} = useResolutions();

    return (
        <AccordionComponent className="cms-menu-set-component">
            {isSMdown ? (
                <>
                    <AccordionComponent.Toggle className="cms-menu-set-component-toggle"
                                               eventKey={currentPage.id}>
                        {currentPage.title}
                    </AccordionComponent.Toggle>
                    <AccordionComponent.Collapse className="cms-menu-set-component-collapse"
                                                 eventKey={currentPage.id}>
                        <CmsMenuItemsComponent {...other}/>
                    </AccordionComponent.Collapse>
                </>
            ) : <CmsMenuItemsComponent {...other}/>}
        </AccordionComponent>
    );
}
