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
     * Text, used below icon for guest users
    */
    guestText?: string,
    /**
     * Text, used below icon for logged in users
    */
    loggedInText?: string,
    /**
     * Variable, used to check if user is logged in or not
    */
    isLoggedIn?: boolean,
    /**
     * Callback, used to navigate to account
    */
    onNavigate?: Function
}

export function AccountNavControlAltComponent(props: Props) {
    const {formatMessage} = useIntl();

    const {
        title = formatMessage(messages.account_title),
        guestText = formatMessage(messages.account_text),
        loggedInText = formatMessage(messages.account_text_logged_in),
        isLoggedIn,
        onNavigate = noop
    } = props;

    return (
        <div className="account-nav-control-alt-component">
            <ButtonComponent className="account-nav-control-alt-component-icon"
                             onClick={onNavigate}
                             inline={true}
                             title={title}
                             aria-label={title}
                             variant="primary-link">
                <span className="account-nav-control-alt-component-text">
                    {isLoggedIn ? loggedInText : guestText}
                </span>
            </ButtonComponent>
        </div>
    );
}
