import React from 'react';
import {useIntl} from 'react-intl';

import {ButtonComponent} from '@luft/common';

import {useLockBodyScroll} from '../../../../common';
import messages from './resources/messages';

type Props = {
    /**
     * Callback, which hides SAV popup
     */
    onRemovePopup: (React.SyntheticEvent) => void
};

export function RestrictAccessComponent({onRemovePopup}: Props) {
    const {formatMessage} = useIntl();

    useLockBodyScroll();

    return (
        <div className="restrict-access-component">
            <div className="restrict-access-component-body">
                <p className="restrict-access-component-title">
                    {formatMessage(messages.title)}
                </p>

                <p className="restrict-access-component-text">
                    {formatMessage(messages.text)}
                </p>

                <div className="restrict-access-component-actions">
                    <ButtonComponent variant="primary"
                                     className="restrict-access-component-agree"
                                     title={formatMessage(messages.agree)}
                                     onClick={onRemovePopup}>
                        {formatMessage(messages.agree)}
                    </ButtonComponent>

                    <a href="https://google.com"
                       className="button-component button-component-tertiary button-component-block restrict-access-component-disagree"
                       title={formatMessage(messages.disagree)}>
                        {formatMessage(messages.disagree)}
                    </a>
                </div>

                <p className="restrict-access-component-notice">
                    {formatMessage(messages.notice)}
                </p>
            </div>
        </div>
    );
}
