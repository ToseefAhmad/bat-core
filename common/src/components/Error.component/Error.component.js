import React from 'react';
import classnames from 'classnames';
import {useIntl} from 'react-intl';

import {AlertComponent} from '@luft/common';
import {useIsOnline} from '@luft/util';

import messages from './resources/messages';

type Props = {
    error: Object,
    className?: string
};

export function ErrorComponent({error, className}: Props) {
    const {online} = useIsOnline();
    const {formatMessage} = useIntl();

    return (
        <AlertComponent className={classnames('error-component', className)}
                        variant="danger">
            {error && online && error.message}
            {error && !online && formatMessage(messages.lost_internet)}
        </AlertComponent>
    );
}
