import React, {useEffect, useRef} from 'react';
import {useIntl} from 'react-intl';
import {useLocation, useHistory} from 'react-router';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

import {
    BackComponent,
    ButtonComponent,
    ErrorComponent,
    useGoBack,
    useResolutions,
    useToast
} from '@luft/common';
import {
    RegisterNavControlComponent,
    PrefilledEmailComponent,
    ForgotPasswordNavControlComponent,
    LoginFormComponent
} from '@luft/user';
import type {User} from '@luft/types';

import messages from '@luft/user/src/components/Login.component/resources/messages';

import {SocialProvidersContainer} from '../SocialProviders.container';
import {PhoneNumberConfirmationContainer} from '../PhoneNumberConfirmation.container';
import {isPhoneConfirmError} from '../../util';
import custom_messages from './resources/messages';

type Props = {
    /**
     * A function, that is executed after user entered their credentials and sent the form.
     */
    onLogin?: (Object) => Promise<Object>,
    /**
     * A function that takes user to the register page.
     */
    onNavigateRegister?: (React.SyntheticEvent) => void,
    /**
     * A function that takes user to the forgot password page.
     */
    onNavigateForgotPassword?: (React.SyntheticEvent) => void,
    /**
     * A callback function on return to previous screen. A function from `useGoBack` is used by default
     */
    onBack?: (React.SyntheticEvent | void) => void,
    /**
     * A user account data from GraphQL cached mutation. Used to retrieve user's email and to set as initial value
     * to the email field.
     */
    account?: User,
    /**
     * An error from the graphql mutation if the user authorization was not successful.
     */
    error?: Error,
    /**
     * A boolean indicating whether the user login mutation is in flight.
     */
    loading?: boolean,
    /**
     * If provided, user will only have to enter their password (used on checkout). If not provided, email and password
     * fields are displayed and there is no 'continue as a guest' button.
     */
    email?: string,
    /**
     * A function that takes user to the checkout page as guest.
     */
    onContinueAsGuest?: (React.SyntheticEvent) => void,
    /**
     * Referral code string
     */
    referralCode?: string,
    /**
     * Flag, which identifies that user's account is confirmed
     */
    isConfirmedAccount?: boolean,
    /**
     * Flag, which identifies that registration logic should be disabled
     */
    isDisabledRegistration?: boolean,
    /**
     * Customer's phone number
     */
    phoneNumber?: string,
    /**
     * Flag, which identifies that confirmation popup should be displayed
     */
    shownConfirmPhone?: boolean,
    /**
     * A callback function on login
     */
    onDelayedLogin?: Function,
    /**
     * A callback function on closing confirmation popup
     */
    onCloseConfirmPhone?: Function,
    /**
     * Flag, which identifies that login by phone is enabled
     */
    isEnabledLoginByPhone?: boolean
}

export function LoginComponent(props: Props) {
    const {formatMessage} = useIntl();
    const goBack = useGoBack();
    const location = useLocation();
    const history = useHistory();

    const {
        account,
        error: loginError,
        loading,
        email: prefilledEmail,
        onLogin,
        onNavigateRegister,
        onNavigateForgotPassword,
        onContinueAsGuest,
        onBack = goBack,
        referralCode = '',
        isConfirmedAccount = true,
        isDisabledRegistration = false,
        isEnabledLoginByPhone = false,
        phoneNumber,
        shownConfirmPhone,
        onDelayedLogin,
        onCloseConfirmPhone
    } = props;

    const addToast = useToast();
    const {isSMdown} = useResolutions();
    const toastRef = useRef(null);

    const {
        from,
        isExpired,
        error: stateError,
        showAccountConfirmNotification,
        backUrl: backAfterAccountConfirmUrl
    } = location.state || {};

    const error = loginError || stateError;
    const errorMessage = isPhoneConfirmError(error) ? null : error;
    const fromCheckout = from === '/checkout';
    const {showDisabledRegistrationToast, ...updatedState} = location.state || {};

    useEffect(() => {
        if (!showAccountConfirmNotification) return;

        toastRef.current = addToast(
            formatMessage(custom_messages.account_confirmation, {
                link: text => (
                    <Link key={text}
                          to={{
                              pathname: '/account/confirm',
                              state: {backUrl: backAfterAccountConfirmUrl}
                          }}
                          title={formatMessage(custom_messages.link_title)}
                          onClick={() => toast.dismiss(toastRef.current)}>
                        {text}
                    </Link>
                )
            }),
            'success',
            { autoClose: false }
        );
    }, [showAccountConfirmNotification]);

    useEffect(() => {
        if (!showDisabledRegistrationToast) return;

        addToast(formatMessage(custom_messages.disable_register_notification), 'success');
        history.replace({...location, state: updatedState});
    }, []);

    return (
        <div className="login-component">
            {isSMdown ? (
                <BackComponent title={formatMessage(messages.login)}
                               onBack={onBack}
                               variant="header"/>
            ) : (
                <h3 className="login-component-title">
                    {formatMessage(messages.login)}
                </h3>
            )}

            {errorMessage && <ErrorComponent error={errorMessage}/>}
            {isExpired && <ErrorComponent error={{message: formatMessage(messages.is_expired)}}/>}

            {!isConfirmedAccount && (
                <ErrorComponent error={{
                    message: formatMessage(custom_messages.not_confirmed_account, {
                        link: text => (
                            <Link key={text}
                                  className="login-component-error-link"
                                  title={formatMessage(custom_messages.link_title)}
                                  to={{
                                      pathname: '/account/confirm',
                                      state: {backUrl: backAfterAccountConfirmUrl}
                                  }}>
                                {text}
                            </Link>
                        )
                    })
                }}/>
            )}

            {prefilledEmail && (
                <PrefilledEmailComponent onBack={onBack}
                                         email={prefilledEmail}/>
            )}

            <LoginFormComponent fieldValue={prefilledEmail || (account && account.email)}
                                isPrefilledField={!!prefilledEmail}
                                loading={loading}
                                isEnabledLoginByPhone={isEnabledLoginByPhone}
                                onLogin={onLogin}/>

            <ForgotPasswordNavControlComponent onNavigate={onNavigateForgotPassword}/>

            {!prefilledEmail && !isDisabledRegistration && (
                <RegisterNavControlComponent onNavigate={() => onNavigateRegister(from)}/>
            )}

            {prefilledEmail && (
                <div className="login-component-continue-as-guest">
                    <div className="login-component-continue-as-guest-delimiter">
                        {formatMessage(messages.or)}
                    </div>

                    <ButtonComponent className="login-component-continue-button"
                                     variant="secondary"
                                     onClick={onContinueAsGuest}
                                     title={formatMessage(messages.continue_as_guest)}>
                        {formatMessage(messages.continue_as_guest)}
                    </ButtonComponent>
                </div>
            )}
            <SocialProvidersContainer referralCode={referralCode}
                                      pageType={fromCheckout ? 'CHECKOUT' : null}/>
            <PhoneNumberConfirmationContainer showModal={shownConfirmPhone}
                                              onClose={onCloseConfirmPhone}
                                              phoneNumber={phoneNumber}
                                              onProcessRequest={onDelayedLogin}/>
        </div>
    );
}
