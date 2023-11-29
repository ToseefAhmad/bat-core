import React from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';

import {ButtonComponent} from '@luft/common';

import messages from './resources/messages';

type Props = {
    /**
     * Text, used as title
     */
    title?: string,
    /**
     * Callback, used to navigate to store locator
     */
    onNavigateStore?: Function
}

export function StoreLocatorNavControlComponent(props: Props) {
    const {formatMessage} = useIntl();

    const {
        title = formatMessage(messages.store_title),
        onNavigateStore = noop
    } = props;

    return (
        <div className="store-locator-nav-control-component">
            <ButtonComponent className="store-locator-nav-control-component-icon"
                             onClick={onNavigateStore}
                             inline={true}
                             title={title}
                             aria-label={title}
                             variant="primary-link">
                <span className="store-locator-nav-control-component-text">
                    {title}
                </span>
            </ButtonComponent>
        </div>
    );
}
