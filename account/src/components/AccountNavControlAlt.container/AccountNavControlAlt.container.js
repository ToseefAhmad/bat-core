import React from 'react';
import type {ComponentType} from 'react';

import {useIsAuthorized} from '@luft/user';

import {AccountNavControlAltComponent} from '../AccountNavControlAlt.component';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
    */
    as?: ComponentType<{}>
}

export function AccountNavControlAltContainer(props: Props) {
    const {
        as: Component = AccountNavControlAltComponent,
        ...other
    } = props;

    const isLoggedIn = useIsAuthorized();

    return (
        <Component {...other}
                   isLoggedIn={isLoggedIn}/>
    );
}
