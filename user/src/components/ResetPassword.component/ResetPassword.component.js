import React from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';

import {
    ButtonComponent,
    ErrorComponent,
    LoaderComponent,
    FormGroupComponent
} from '@luft/common';
import {ResetPasswordExpiredComponent, useIsAuthorized} from '@luft/user';
import {CmsBlockContainer} from '@luft/cms';
import messages from '@luft/user/src/components/ResetPassword.component/resources/messages';

import {useIsPasswordOutdated} from '../../hooks';

type Props = {
    resetToken?: string,
    isTokenValid?: boolean,
    error?: Error,
    loading?: boolean,
    isConfirmPassword?: boolean,
    onResetPassword?: Function,
    onNavigateForgotPassword?: Function
};

export function ResetPasswordComponent(props: Props) {
    const {formatMessage} = useIntl();
    const {register, errors, handleSubmit, watch} = useForm({mode: 'onBlur'});
    const isPasswordOutdated = useIsPasswordOutdated();
    const isAuthorized = useIsAuthorized();

    const {
        resetToken,
        isTokenValid,
        onResetPassword = noop,
        onNavigateForgotPassword = noop,
        error,
        loading,
        isConfirmPassword = false
    } = props;

    const handleValidatePassword = (value) => value === watch('new_password') || formatMessage(messages.confirm_password_error);

    return (
        <div className="reset-password-component">
            {!isTokenValid ? (
                <ResetPasswordExpiredComponent onNavigateForgotPassword={onNavigateForgotPassword}/>
            ) : (
                <div className="reset-password-component-wrapper">
                    <h3 className="reset-password-component-wrapper-title">
                        {formatMessage(messages.reset_password)}
                    </h3>

                    {error && <ErrorComponent error={error}/>}

                    {isAuthorized && isPasswordOutdated && (
                        <div className="reset-password-component-notification">
                            <CmsBlockContainer cmsBlockId="reset-password-notification"/>
                        </div>
                    )}

                    <form noValidate
                          className="reset-password-component-form"
                          onSubmit={handleSubmit(({confirmPassword, ...input}, e) => onResetPassword({
                              ...input,
                              reset_token: resetToken
                          }, e))}>
                        <fieldset>
                            <FormGroupComponent className="reset-password-component-form-group"
                                                controlId="password"
                                                name="new_password"
                                                type="password"
                                                errors={errors}
                                                label={formatMessage(messages.new_password)}
                                                ref={register({required: true})}/>
                            {isConfirmPassword && (
                                <FormGroupComponent controlId="confirmPassword"
                                                    name="confirmPassword"
                                                    type="password"
                                                    errors={errors}
                                                    label={formatMessage(messages.confirm_password)}
                                                    ref={register({
                                                        required: true,
                                                        validate: handleValidatePassword
                                                    })}/>
                            )}
                        </fieldset>
                        <ButtonComponent className="reset-password-component-submit"
                                         type="submit"
                                         title={formatMessage(messages.reset_password)}>
                            <span className="reset-password-component-submit-title">
                                {formatMessage(messages.reset_password)}
                            </span>
                            {loading && (
                                <LoaderComponent size="sm"
                                                 variant="light"
                                                 type="attached"/>
                            )}
                        </ButtonComponent>
                    </form>
                </div>
            )}
        </div>
    );
}
