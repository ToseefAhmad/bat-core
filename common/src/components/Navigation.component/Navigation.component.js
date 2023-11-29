import React, {
    useCallback,
    useEffect
} from 'react';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router';
import {useIntl} from 'react-intl';

import {ModalComponent, useResolutions} from '@luft/common';

import messages from '@luft/common/src/components/Navigation.component/resources/messages';

import {useMenu} from '../../../../catalog';
import custom_messages from './resources/messages';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: React.Component,
    /**
     * Text or JSX for Navigation Logo content
     */
    title?: string | React.ReactNode,
    /**
     * Text or JSX for opened Navigation Modal title
     */
    modalTitle: string | React.ReactNode,
    /**
     * JSX for right side Navigation controls
     */
    controls?: React.ReactNode,
    /**
     * A direct URL to the organization logo
     */
    logoUrl?: string,
    /**
     * Navigation Modal Content
     */
    children?: React.ReactNode
};

export function NavigationComponent(props: Props) {
    const {
        as: Component = 'nav',
        title,
        logoUrl,
        modalTitle,
        controls,
        children,
    } = props;
    const {formatMessage} = useIntl();
    const {isXS} = useResolutions();
    const location = useLocation();
    const {isMenuOpen, setIsMenuOpen, onCloseCategories} = useMenu();
    const menuTitle = isMenuOpen ? custom_messages.close : custom_messages.menu;
    const togglerClassName = classnames('navigation-component-toggle', {
        collapsed: !isMenuOpen
    });
    const logoStyle = logoUrl ? {
        backgroundImage: `url(${logoUrl})`
    } : null;

    const handleOnToggleExpanded = useCallback(() => {
        setIsMenuOpen(prevIsOpen => !prevIsOpen);
    }, [setIsMenuOpen]);

    const handleOnHide = useCallback(() => {
        setIsMenuOpen(false);
        onCloseCategories();
    }, [setIsMenuOpen, onCloseCategories]);

    useEffect(() => {
        setIsMenuOpen(false);
        onCloseCategories();
    }, [location, setIsMenuOpen, onCloseCategories]);

    return (
        <Component className="navigation-component">
            <div className="navigation-component-content">
                {isXS && (
                    <button type="button"
                            className={togglerClassName}
                            aria-label={formatMessage(messages.toggle_label)}
                            onClick={handleOnToggleExpanded}>
                        <span className="navbar-toggler-icon"/>
                        <span className="navbar-toggler-text">
                            {formatMessage(menuTitle)}
                        </span>
                    </button>
                )}
                {title && (
                    <Link to="/"
                          role="link"
                          title={formatMessage(messages.toggle_label)}
                          onClick={handleOnHide}>
                        <span className="navigation-component-content-text"
                              style={logoStyle}>
                            {title}
                        </span>
                    </Link>
                )}
            </div>
            {controls && (
                <div className="navigation-component-controls">
                    {controls}
                </div>
            )}
            {children && (
                <ModalComponent className="navigation-modal-component"
                                showOpenButton={false}
                                hideHeader={true}
                                headerVariant="secondary"
                                show={isMenuOpen}
                                animation={true}
                                modalTitle={modalTitle}
                                size="lg"
                                onHide={handleOnHide}
                                backdrop={true}
                                backdropClassName="navigation-modal-component-backdrop">
                    {children}
                </ModalComponent>
            )}
        </Component>
    );
}
