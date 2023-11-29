import React, {useState} from 'react';
import {useLocation} from 'react-router';

import {RegisterContainer, useIsAuthorized} from '@luft/user';

import {CmsRegisterComponent} from '../CmsRegister.component';

type Props = {
    /**
     *  Callback used after user registration
     */
    onRegister?: () => void
};

export function CmsRegistrationComponent({onRegister}: Props) {
    const {pathname} = useLocation();
    const isAuthorized = useIsAuthorized();
    const [isRegistered, setIsRegistered] = useState();

    const handleRegister = (data) => {
        setIsRegistered(true);
        if (onRegister) onRegister(data);
    };

    if (isAuthorized && !isRegistered) return null;

    return (
        <RegisterContainer as={CmsRegisterComponent}
                           isRegistered={isRegistered}
                           registrationUrl={pathname}
                           onRegister={handleRegister}/>
    );
}
