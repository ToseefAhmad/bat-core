import React from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';

import {useToast} from '@luft/common';
import {LogoutComponent, useLogoutMutation} from '@luft/user';

import messages from '@luft/user/src/components/Logout.container/resources/messages';

import {trackLogout} from '../../../../data-layer';

type Props = {
    as?: React.Component,
    onLogout?: Function,
}

export function LogoutContainer(props: Props) {
    const {
        as: Component = LogoutComponent,
        onLogout = noop,
        ...other
    } = props;

    const m = useLogoutMutation();
    const {formatMessage} = useIntl();
    const addToast = useToast();

    const [logoutMutation, {loading, error}] = m;

    const handleLogout = async () => {
        const resp = await logoutMutation();
        trackLogout();
        addToast(formatMessage(messages.signed_out_success), 'success');
        onLogout();
        return resp;
    };

    return (
        <Component {...other}
                   m={m}
                   onLogout={handleLogout}
                   loading={loading}
                   error={error}/>
    );
}
