import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';

import {
    ButtonComponent,
    ErrorComponent,
    FormGroupComponent,
    LoaderComponent
} from '@luft/common';
import {SocialLoginConnectionsContainer} from '@luft/user';
import {AccountTitleComponent} from '@luft/account';

import messages from '@luft/account/src/components/AccountSecurity.component/resources/messages';

import {useFormInputRules} from '../../../../common';

import custom_messages from './resources/messages';

type Props = {
    /**
     * Callback on save
     */
    onSaveInfoUpdates?: (Object) => void,
    /**
     * Error for represent
     */
    error?: Error,
    /**
     * Is loading status
     */
    loading?: boolean,
    /**
     * Title for represent
     */
    title?: string,
    /**
     * Callback on back
     */
    onBack?: () => void,
    /**
     * Display 'Confirm Password' field
     */
    isConfirmPassword?: boolean,
    /**
     * Minimum password length
     */
    minimumPasswordLength?: number,
    /**
     * Password required character classes count
     */
    passwordRequiredClassesCount?: number,
    /**
     * Callback on successful logout
     */
    onLogout?: () => void
}

export function AccountSecurityComponent(props: Props) {
    const {formatMessage} = useIntl();

    const {
        loading,
        error,
        title = formatMessage(messages.security_title),
        isConfirmPassword = false,
        minimumPasswordLength,
        passwordRequiredClassesCount,
        onSaveInfoUpdates,
        onBack,
        onLogout
    } = props;

    const {register, errors, handleSubmit, formState, watch} = useForm({mode: 'onBlur'});
    const {getPasswordRule} = useFormInputRules();
    const passwordRules = getPasswordRule(minimumPasswordLength, passwordRequiredClassesCount);

    const submitAccountInfo = useCallback(({new_password_confirm, ...input}) => {
        if (onSaveInfoUpdates) onSaveInfoUpdates(input);
    }, [onSaveInfoUpdates]);
    const validateNewPassword = (value) => value === watch('new_password') || formatMessage(messages.new_password_confirm_error);

    return (
        <div className="account-security-component">
            <AccountTitleComponent onBack={onBack}
                                   title={title}/>

            <div className="account-security-component-content">
                {loading && <LoaderComponent type="overlay"/>}
                <form className="account-security-component-form"
                      noValidate
                      onSubmit={handleSubmit(submitAccountInfo)}>
                    {error && <ErrorComponent error={error}/>}
                    <fieldset className="account-security-component-update-fields">
                        <legend>
                            {formatMessage(messages.content_title)}
                        </legend>
                        <FormGroupComponent controlId="password"
                                            name="password"
                                            type="password"
                                            error={!!errors && !!errors.password}
                                            variant="secondary"
                                            label={formatMessage(messages.password)}
                                            ref={register({required: true})}
                                            errors={errors}/>

                        <FormGroupComponent controlId="new_password"
                                            name="new_password"
                                            type="password"
                                            error={!!errors && !!errors.new_password}
                                            variant="secondary"
                                            label={formatMessage(messages.new_password)}
                                            errors={errors}
                                            ref={register({
                                                required: true,
                                                ...passwordRules
                                            })}/>
                        <div className="account-security-component-password-tooltip">
                            {formatMessage(custom_messages.tooltip_password, {
                                minLength: minimumPasswordLength,
                                minClasses: passwordRequiredClassesCount
                            })}
                        </div>
                        {isConfirmPassword && (
                            <FormGroupComponent controlId="new_password_confirm"
                                                name="new_password_confirm"
                                                type="password"
                                                error={!!errors && !!errors.new_password_confirm}
                                                variant="secondary"
                                                label={formatMessage(messages.new_password_confirm)}
                                                ref={register({
                                                    required: true,
                                                    validate: validateNewPassword
                                                })}
                                                errors={errors}/>
                        )}
                    </fieldset>
                    <ButtonComponent type="submit"
                                     title={formatMessage(messages.save_update)}
                                     disabled={!formState.isDirty}
                                     variant="secondary">
                        <span className="security-component-submit-title">
                            {formatMessage(messages.save_update)}
                        </span>
                    </ButtonComponent>
                </form>
                <SocialLoginConnectionsContainer variant="connect"
                                                 onLogout={onLogout}/>
            </div>
        </div>
    );
}
