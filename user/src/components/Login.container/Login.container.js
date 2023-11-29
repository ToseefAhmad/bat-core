import React, {
    useCallback,
    useEffect,
    useState
} from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';
import {useLocation, useHistory} from 'react-router-dom';
import type {ComponentType} from 'react';

import {useToast, useStoreConfigQuery} from '@luft/common';
import {useLoginMutation} from '@luft/user';

import messages from '@luft/user/src/components/Login.container/resources/messages';

import {LoginComponent} from '../Login.component';
import {trackLogin} from '../../../../data-layer';
import {isPhoneConfirmError} from '../../util';

type Props = {
    as?: ComponentType<{}>,
    onLogin: Function
};

export function LoginContainer(props: Props) {
    const {
        as: Component = LoginComponent,
        onLogin = noop,
        ...other
    } = props;
    const {state} = useLocation();
    const history = useHistory();
    const {error: stateError} = state || {};

    const m = useLoginMutation();
    const {formatMessage} = useIntl();
    const addToast = useToast();

    const {data: storeConfigData} = useStoreConfigQuery();
    const isDisabledRegistration = storeConfigData?.storeConfig?.is_registration_disabled;
    const isEnabledLoginByPhone = storeConfigData?.storeConfig?.login_by_phone_enabled;
    const isEnabledSmsConfirmation = storeConfigData?.storeConfig?.sms_confirmation_enabled;
    const isEnabledPhoneConfirmation = isEnabledLoginByPhone && isEnabledSmsConfirmation;
    const [shownConfirmPhone, setShownConfirmPhone] = useState(false);
    const [delayedLoginInput, setDelayedLoginInput] = useState();

    const [loginMutation, {data, loading, error}] = m;
    const account = data?.login?.user;
    const isConfirmedAccount = data?.login?.confirmed !== false;

    useEffect(() => {
        if (!error) return;

        trackLogin('fail', error.message);
    }, [error]);

    const handleLogin = useCallback(async (loginInput, isWishlist, productName) => {
        // Clear error from `react-router` state, so it won't be displayed on submit
        if (stateError) {
            history.replace('/account/login');
        }

        try {
            setDelayedLoginInput(loginInput);
            const resp = await loginMutation(loginInput);
            const isConfirmed = resp?.data?.login?.confirmed !== false;

            if (!isConfirmed) return resp;

            addToast(formatMessage(messages.logged_in_success), 'success');

            if (isWishlist) {
                addToast(formatMessage(messages.wishlist_success, {name: productName}), 'success');
            }

            onLogin(loginInput);
            trackLogin('success');

            return resp;
        } catch (err) {
            if (!isPhoneConfirmError(err)) return;

            setShownConfirmPhone(true);
        }
    }, [onLogin, stateError, loginMutation, addToast, formatMessage, history]);

    // Trigger login flow after phone confirmation
    const handleDelayedLogin = useCallback(() => {
        if (!delayedLoginInput) return;

        handleLogin(delayedLoginInput);
    }, [delayedLoginInput, handleLogin]);

    const handleCloseConfirmPhone = useCallback(() => {
        setShownConfirmPhone(false);
    }, []);

    return (
        <Component {...other}
                   m={m}
                   account={account}
                   onLogin={handleLogin}
                   loading={loading}
                   error={error}
                   isDisabledRegistration={isDisabledRegistration}
                   isConfirmedAccount={isConfirmedAccount}
                   isEnabledLoginByPhone={isEnabledLoginByPhone}
                   isEnabledPhoneConfirmation={isEnabledPhoneConfirmation}
                   shownConfirmPhone={shownConfirmPhone}
                   phoneNumber={delayedLoginInput?.login}
                   onDelayedLogin={handleDelayedLogin}
                   onCloseConfirmPhone={handleCloseConfirmPhone}/>
    );
}
