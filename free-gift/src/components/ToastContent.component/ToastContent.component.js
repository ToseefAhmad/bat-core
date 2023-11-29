import React from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';

import messages from '@luft/common/src/components/ToastContent.component/resources/messages';

type Props = {
    title?: string,
    message: string,
    type?: 'info' | 'error' | 'success' | 'default' | 'dark',
    onOpen?: (React.SyntheticEvent) => void
}

export function ToastContentComponent(props: Props) {
    const {
        title = null,
        message,
        type = 'success',
        onOpen
    } = props;

    const {formatMessage} = useIntl();

    return (
        <div className={`toast-content-component toast-content-component-${type}`}>
            <div className="toast-content-component-title">
                {title || formatMessage(messages[type])}
            </div>
            <div className="toast-content-component-message">
                <span className="toast-content-component-action"
                      role="button"
                      tabIndex="0"
                      onClick={onOpen}
                      onKeyPress={noop}>
                    {message}
                </span>
            </div>
        </div>
    );
}
