import React from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';

import {
    BackComponent,
    ButtonComponent,
    FormGroupComponent,
    ErrorComponent,
    LoaderComponent,
    useValidationPatterns,
    useResolutions
} from '@luft/common';

import {useFormInputRules} from '../../../../common';

import messages from './resources/messages';

type Props = {
    /**
     * Flag, which shows that confirmation link is sending
     */
    loading?: boolean,
    /**
     * Error, that should be displayed, in case something went wrong during sending the confirmation link
     */
    error?: Error,
    /**
     * Callback for sending the confirmation link
     */
    onSendConfirmationLink: Function,
    /**
     * Callback for returning back
     */
    onBack?: Function
};

export function AccountConfirmComponent(props: Props) {
    const {formatMessage} = useIntl();
    const {register, errors, handleSubmit} = useForm({mode: 'onBlur'});
    const {email: emailPattern} = useValidationPatterns();
    const {isSMdown} = useResolutions();
    const {getEmailRule, getMaxLengthRule} = useFormInputRules();

    const {
        onSendConfirmationLink,
        onBack = noop,
        error,
        loading
    } = props;

    const title = formatMessage(messages.confirm_account_title);

    return (
        <div className="account-confirm-component">
            {isSMdown ? (
                <BackComponent title={title}
                               onBack={onBack}
                               variant="header"/>
            ) : (
                <h3 className="login-component-title">
                    {title}
                </h3>
            )}

            {error && <ErrorComponent error={error}/>}

            <form noValidate
                  className="account-confirm-component-form"
                  onSubmit={handleSubmit(onSendConfirmationLink)}>
                <div className="account-confirm-component-tip">
                    {formatMessage(messages.confirm_account_tip)}
                </div>

                <fieldset>
                    <FormGroupComponent controlId="email"
                                        name="email"
                                        type="email"
                                        errors={errors}
                                        label={formatMessage(messages.email)}
                                        ref={register({
                                            required: true,
                                            pattern: emailPattern,
                                            validate: getEmailRule,
                                            ...getMaxLengthRule('email', {apply: 'my'})
                                        })} />
                </fieldset>

                <ButtonComponent className="account-confirm-component-submit"
                                 type="submit"
                                 title={formatMessage(messages.send_email_button)}>
                    <span className="account-confirm-component-submit-title">
                        {formatMessage(messages.send_email_button)}
                    </span>

                    {loading && (
                        <LoaderComponent size="sm"
                                         variant="light"
                                         type="attached"/>
                    )}
                </ButtonComponent>
            </form>
        </div>
    );
}
