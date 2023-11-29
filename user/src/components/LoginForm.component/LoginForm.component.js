import React, {useCallback, useMemo} from 'react';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';
import {useLocation} from 'react-router';
import {isUndefined} from 'lodash';
import classnames from 'classnames';
import {FetchResult} from '@apollo/client';

import {
    ButtonComponent,
    FormGroupComponent,
    LoaderComponent,
    useValidationPatterns
} from '@luft/common';

import messages from '@luft/user/src/components/LoginForm.component/resources/messages';

import {useFormInputRules} from '../../../../common';

import custom_messages from './resources/messages';

type Props = {
    /**
     * An initial value that is set to login field.
     */
    fieldValue?: string,
    /**
     * If true, user will only have to enter their password and 'Continue as guest' button appear
     * (used on checkout). If not provided, email or phone and password fields are displayed.
     */
    isPrefilledField?: boolean,
    /**
     * A function, that is executed after user entered their credentials and sent the form.
     */
    onLogin?: (Object) => Promise<FetchResult>,
    /**
     * A boolean indicating whether the user login mutation is in flight. A small loader is displayed on login button
     * then.
     */
    loading?: boolean,
    /**
     * Flag, which identifies that login by phone is enabled
     */
    isEnabledLoginByPhone?: boolean
}

export function LoginFormComponent(
    {
        fieldValue,
        isPrefilledField = false,
        onLogin,
        loading,
        isEnabledLoginByPhone = false
    }: Props) {
    const {formatMessage} = useIntl();
    const {
        register,
        errors,
        handleSubmit,
        setValue
    } = useForm({mode: 'onBlur'});
    const location = useLocation();
    const {email: emailPattern} = useValidationPatterns();
    const {getMaxLengthRule, getEmailRule, getLoginFieldRule} = useFormInputRules();
    const fieldLabel = formatMessage(isEnabledLoginByPhone ? custom_messages.login_field_label : messages.email);

    const fieldType = useMemo(() => {
        if (isPrefilledField) return 'hidden';

        return isEnabledLoginByPhone ? 'text' : 'email';
    }, [fieldValue, isPrefilledField, isEnabledLoginByPhone]);

    const fieldRegisterConfig = useMemo(() => {
        if (isEnabledLoginByPhone) {
            return {
                required: true,
                validate: getLoginFieldRule
            };
        }

        return {
            required: true,
            pattern: emailPattern,
            validate: getEmailRule,
            ...getMaxLengthRule('email', {apply: 'my'})
        };
    }, [isEnabledLoginByPhone]);

    const classNames: string = classnames({'login-form-component-email-hidden': isPrefilledField});

    const handleOnLogin = useCallback(async (input) => {
        try {
            const {
                wishlist_items_simple = null,
                wishlist_items_configurable = null,
                wishlist_items_giftcard = null,
                wishlist_items_grouped = null,
                wishlist_items_editable_bundle = null,
                wishlist_items_downloadable = null,
                product_name = null
            } = location.state?.input || {};

            const isWishlist = wishlist_items_simple
                || wishlist_items_configurable
                || wishlist_items_giftcard
                || wishlist_items_grouped
                || wishlist_items_editable_bundle
                || wishlist_items_downloadable;

            if (!isUndefined(onLogin)) {
                await onLogin({
                    ...input,
                    wishlist_items_simple: wishlist_items_simple || wishlist_items_downloadable,
                    wishlist_items_configurable,
                    wishlist_items_giftcard,
                    wishlist_items_grouped,
                    wishlist_items_editable_bundle
                }, isWishlist, product_name);
            }
        } catch (e) {
            setValue('password', null);
        }
    }, [onLogin, setValue, location.state?.input]);

    return (
        <form noValidate
              className="login-form-component"
              onSubmit={handleSubmit(handleOnLogin)}>
            {isPrefilledField ? (
                <>
                    <h2>
                        {formatMessage(messages.welcome_back_Label)}
                    </h2>

                    <div className="login-form-component-enter-email-text">
                        {formatMessage(messages.continue_info_massage)}
                    </div>
                </>
            ) : (
                <div className="login-form-component-note">
                    {isEnabledLoginByPhone
                        ? formatMessage(custom_messages.register_info_massage)
                        : formatMessage(messages.register_info_massage)
                    }
                </div>
            )}

            <fieldset>
                <FormGroupComponent controlId="login"
                                    className={classNames}
                                    name="login"
                                    type={fieldType}
                                    defaultValue={fieldValue}
                                    errors={errors}
                                    label={fieldLabel}
                                    ref={register(fieldRegisterConfig)} />

                <FormGroupComponent controlId="password"
                                    type="password"
                                    errors={errors}
                                    label={formatMessage(messages.password)}
                                    ref={register({required: true})}
                                    name="password"/>
            </fieldset>

            <ButtonComponent className="login-form-component-submit"
                             type="submit"
                             title={formatMessage(messages.login_submit)}>
                <span className="login-form-component-submit-title">
                    {formatMessage(messages.login_submit)}
                </span>
                {loading && (
                    <LoaderComponent size="sm"
                                     variant="light"
                                     type="attached"/>
                )}
            </ButtonComponent>
        </form>
    );
}
