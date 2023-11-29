import React, {useCallback} from 'react';
import {useLocation} from 'react-router';
import {useIntl} from 'react-intl';

import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent,
    useToast
} from '@luft/common';
import {
    useSetNewPasswordMutation,
    useIsAuthorized
} from '@luft/user';
import messages from '@luft/user/src/components/ResetPassword.container/resources/messages';
import VIEWER_QUERY from '@luft/user/src/graphql/queries/Viewer.query.graphql';

import {ResetPasswordComponent} from '../ResetPassword.component';
import {useIsPasswordResetTokenValid} from '../../hooks';

type Props = {
    /**
     * Presentation component, that will consume data and callbacks from this container component
     */
    as?: React.Component,
    /**
     * Prop, that identifies component, used for presentation of loading state
     */
    loadingAs?: React.Component,
    /**
     * Prop, that identifies component, used for presentation of error state
     */
    errorAs?: React.Component,
    /**
     * Prop, that identifies component, used for presentation when offline and not enough cached data
     */
    noCacheAs?: React.Component,
    /**
     * Flag, used to identify handling of loading, error and no-cache state by container
     */
    awaitResult?: boolean,
    /**
     * Callback, fired when user reset password
     */
    onResetPassword?: (resp: Object) => void,
    /**
     * Callback that takes user to the forgot password page
     */
    onNavigateForgotPassword?: (React.SyntheticEvent) => void,
    /**
     * Callback used when user clicks back control
     */
    onBack?: (React.SyntheticEvent) => void
}

export function ResetPasswordContainer(props: Props) {
    const {search} = useLocation();
    const {
        as: Component = ResetPasswordComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        onResetPassword,
        onNavigateForgotPassword,
        onBack,
        ...other
    } = props;
    const queryParams = new URLSearchParams(search);
    const token = queryParams.get('token');
    const customerId = queryParams.get('id');
    const isAuthorized = useIsAuthorized();

    const m = useSetNewPasswordMutation({
        refetchQueries: () => {
            if (isAuthorized) return [{query: VIEWER_QUERY}];

            return null;
        },
        awaitRefetchQueries: true
    });
    const {formatMessage} = useIntl();
    const addToast = useToast();

    const [resetPasswordMutation, {loading, error}] = m;
    const q = useIsPasswordResetTokenValid({variables: {token, customerId}});

    const handleResetPassword = useCallback(async (resetPasswordInput) => {
        const resp = await resetPasswordMutation({...resetPasswordInput, customer_id: customerId});
        addToast(formatMessage(messages.new_password_success), 'success');
        if (onResetPassword) onResetPassword(resp);
        return resp;
    }, [resetPasswordMutation, addToast, onResetPassword, formatMessage, customerId]);

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const isTokenValid = q?.data?.isPasswordResetTokenValid;

    return (
        <Component {...other}
                   m={m}
                   resetToken={token}
                   isTokenValid={isTokenValid}
                   onResetPassword={handleResetPassword}
                   onNavigateForgotPassword={onNavigateForgotPassword}
                   onBack={onBack}
                   loading={loading}
                   error={error}/>
    );
}
