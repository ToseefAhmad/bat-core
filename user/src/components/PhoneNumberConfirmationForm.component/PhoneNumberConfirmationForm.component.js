import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';

import {
    ButtonComponent,
    ErrorComponent,
    FormGroupComponent,
    LoaderComponent
} from '@luft/common';

import {CountdownComponent} from '../../../../common';

import messages from './resources/messages';

type Props = {
    /**
     * Is loading status
     */
    loading?: boolean,
    /**
     * Error for represent
     */
    error?: Error,
    /**
     * Time in seconds left until a new code can be requested
     */
    penaltyTime?: number,
    /**
     * Callback to confirm a code that a customer fill in
     */
    onConfirmCode?: (code: number) => void,
    /**
     * Callback to request one more confirmation code
     */
    onRequestCode?: () => void,
    /**
     * Customer's phone number
     */
    phoneNumber?: string
};

export function PhoneNumberConfirmationFormComponent(
    {
        penaltyTime,
        loading,
        error,
        phoneNumber,
        onConfirmCode,
        onRequestCode
    }: Props) {
    const {formatMessage} = useIntl();
    const {register, errors, handleSubmit} = useForm();
    const [isTimeExpired, setIsTimeExpired] = useState(false);

    const handleOnExpiredTime = useCallback(() => {
        setIsTimeExpired(true);
    }, []);

    const handleOnSendCode = useCallback(() => {
        onRequestCode(phoneNumber);
        setIsTimeExpired(false);
    }, [onRequestCode, phoneNumber]);

    const handleOnConfirm = useCallback((input) => {
        onConfirmCode(phoneNumber, input.confirmation_code);
    }, [onConfirmCode, phoneNumber]);

    return (
        <form noValidate
              className="phone-number-confirmation-form-component"
              onSubmit={handleSubmit(handleOnConfirm)}>
            {error && <ErrorComponent error={error}
                                      className="phone-number-confirmation-form-component-error"/>}
            <p className="phone-number-confirmation-form-component-note">
                {formatMessage(messages.note, {phone: phoneNumber})}
            </p>
            <fieldset>
                <FormGroupComponent controlId="confirmation_code"
                                    name="confirmation_code"
                                    errors={errors}
                                    label={formatMessage(messages.code)}
                                    className="phone-number-confirmation-form-component-code"
                                    ref={register({
                                        required: true
                                    })}/>

            </fieldset>
            <ButtonComponent variant="tertiary"
                             title={formatMessage(messages.request)}
                             inline={false}
                             disabled={!isTimeExpired}
                             onClick={handleOnSendCode}
                             className="phone-number-confirmation-form-component-request">
                {formatMessage(messages.request)}
                {!isTimeExpired && (
                    <CountdownComponent expiredInterval={penaltyTime}
                                        onExpiredTime={handleOnExpiredTime}/>
                )}
            </ButtonComponent>
            <ButtonComponent className="phone-number-confirmation-form-component-submit"
                             type="submit"
                             title={formatMessage(messages.confirm)}>
                <span className="phone-number-confirmation-form-component-submit-title">
                    {formatMessage(messages.confirm)}
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
