import React from 'react';
import type {ComponentType} from 'react';

import {UpdatePasswordComponent} from '../UpdatePassword.component';
import {useViewerQuery} from '../../hooks';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: ComponentType<{}>,
    /**
     * Represent for loading view
     */
    loadingAs?: ComponentType<{}>,
    /**
     * Represent for error view
     */
    errorAs?: ComponentType<{}>,
    /**
     * Await result
     */
    awaitResult?: boolean
};

export function UpdatePasswordContainer({
    as: Component = UpdatePasswordComponent,
    loadingAs: Loading = null,
    errorAs: Error = null,
    awaitResult = true,
    ...other
}: Props) {
    const q = useViewerQuery();

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.error}/>;

    const user = q.data?.viewer?.user;
    const userId = user?.id;
    const resetPasswordToken = user?.password_info?.rp_token;

    return (
        <Component {...other}
                   userId={userId}
                   resetPasswordToken={resetPasswordToken}/>
    );
}
