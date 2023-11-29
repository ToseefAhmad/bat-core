import React from 'react';
import {useIntl} from 'react-intl';

import message from './resources/messages';

export function CmsRegisterSuccessComponent() {
    const {formatMessage} = useIntl();

    return (
        <div className="cms-register-success-component">
            <div className="cms-register-success-component-title">
                {formatMessage(message.title)}
            </div>
            <div className="cms-register-success-component-text">
                {formatMessage(message.text)}
            </div>
        </div>
    );
}
