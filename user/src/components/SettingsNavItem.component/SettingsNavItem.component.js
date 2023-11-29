import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import classnames from 'classnames';

import {AccordionComponent} from '@luft/common';
import {PushNotificationSubscriptionContainerLoadable as PushNotificationSubscriptionContainer} from '@luft/push-notification';

import messages from './resources/messages';

type Props = {
    activeCategoryId: string
};

export function SettingsNavItemComponent({activeCategoryId}: Props) {
    const {formatMessage} = useIntl();
    const [activeKey, setActiveKey] = useState();
    const componentClassName = 'settings-nav-item-component';

    const handleClick = (e) => {
        if (!e.target.closest(`.${componentClassName}`)) {
            setActiveKey(null);
        }
    };

    const handleToggle = () => {
        if (activeKey) {
            setActiveKey(null);
        } else {
            setActiveKey('push');
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    });

    useEffect(() => {
        if (activeCategoryId) {
            setActiveKey(null);
        }
    }, [activeCategoryId]);

    return (
        <AccordionComponent className={classnames(componentClassName, activeKey)}
                            activeKey={activeKey}>
            <AccordionComponent.Toggle className="settings-nav-item-component-button"
                                       eventKey="push"
                                       onClick={handleToggle}>
                {formatMessage(messages.settings)}
            </AccordionComponent.Toggle>
            <AccordionComponent.Collapse eventKey="push">
                <PushNotificationSubscriptionContainer/>
            </AccordionComponent.Collapse>
        </AccordionComponent>
    );
}
