import React, {
    useEffect,
    useCallback,
    useRef
} from 'react';

import {useIntl} from 'react-intl';
import {useLocation} from 'react-router';

import {
    LoaderComponent,
    useToast,
    useStoreConfigQuery
} from '@luft/common';
import {parseUrlQuery} from '@luft/util';
import {useSocialLoginMutation, useIsAuthorized} from '@luft/user';

import {trackLogin} from '../../../../data-layer';
import messages from './resources/messages';

type Props = {
    /**
     * Presentation component, that will consume data and callbacks from this container component
     */
    as?: React.Component,
    /**
     * Represent for loading view
     */
    loadingAs?: React.Component,
    /**
     * Await result
     */
    awaitResult?: boolean,
    /**
     * Login callback
     */
    onLogin?: (Object) => void
};

export function SocialLoginContainer(props: Props) {
    const {
        as: Component = null,
        loadingAs: Loading = LoaderComponent,
        awaitResult = true,
        onLogin,
        ...other
    } = props;

    const {formatMessage} = useIntl();
    const addToast = useToast();
    const {search} = useLocation() || {};
    const isAuthorized = useIsAuthorized();
    const calledLoginHandler = useRef(false);
    const [loginMutation, {loading}] = useSocialLoginMutation({awaitRefetchQueries: true});
    const {data: storeConfigData} = useStoreConfigQuery();
    const isDisabledRegistration = storeConfigData?.storeConfig?.is_registration_disabled;

    const handleOnLogin = useCallback(async (loginInput) => {
        try {
            const resp = await loginMutation(loginInput);

            const socialName = loginInput?.provider_data?.scope ? 'GOOGLE' : 'FACEBOOK';
            const statusCode = resp?.data?.socialLogin?.user?.status_code;
            const isSocialLogin = statusCode === '1';
            const isSocialRegister = statusCode === '2';

            if (isSocialLogin) {
                addToast(formatMessage(messages.logged_in_success), 'success');
                trackLogin('success');
            }

            if (isSocialRegister) {
                addToast(formatMessage(messages.social_register_in_success, {social_name: socialName}), 'success');
            }

            if (onLogin) {
                onLogin({...resp, isAuthorized, socialName, isDisabledRegistration});
            }
            return resp;
        } catch (e) {
            if (e.message) {
                addToast(e.message, 'error');
            } else {
                addToast(formatMessage(messages.logged_in_error), 'error');
            }

            if (onLogin) {
                onLogin({error: e, isAuthorized});
            }
        }
    }, [
        loginMutation,
        addToast,
        onLogin,
        formatMessage,
        isAuthorized,
        isDisabledRegistration
    ]);

    useEffect(() => {
        if (calledLoginHandler.current) return;
        calledLoginHandler.current = true;
        // Triggers login/register after return to App from Social provider website that pass query params in URL string
        (async () => await handleOnLogin({provider_data: parseUrlQuery(search)}))();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleOnLogin, search]);

    if (awaitResult && loading) return Loading && <Loading type="overlay"/>;

    return Component && (
        <Component {...other}/>
    );
}
