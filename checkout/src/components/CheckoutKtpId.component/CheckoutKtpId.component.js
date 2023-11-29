import React, {useEffect} from 'react';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';
import classnames from 'classnames';

import {
    ButtonComponent,
    FormGroupComponent,
    LoaderComponent,
    ErrorComponent
} from '@luft/common';

import {useKtpIdValidation, useLegalAge} from '../../../../restrict-access';
import messages from './resources/messages';

type Props = {
    /**
     * User's ktp id
     */
    ktpId?: string,
    /**
     * React ref to the submit element
     */
    refKtpId?: React.RefObject,
    /**
     * Error, identifies fetch data failure
     */
    error?: Error,
    /**
     * Loading state, identifies fetch data processing
     */
    loading?: boolean,
    /**
     * Callback on save of ktp id
     */
    onAdd?: Function,
    /**
     * Callback on set Ktp Id error
     */
    onSetKtpIdError?: Function
};

export function CheckoutKtpIdComponent(props: Props) {
    const {
        ktpId,
        refKtpId,
        error,
        loading,
        onAdd,
        onSetKtpIdError
    } = props;

    const {formatMessage} = useIntl();
    const {register, errors, handleSubmit, setValue, formState} = useForm({reValidateMode: 'onBlur', mode: 'onBlur'});
    const {validateKtpId} = useKtpIdValidation();
    const {legalAge} = useLegalAge();
    const ktpIdLS = localStorage?.getItem('ktpID');

    useEffect(() => {
        if (!onSetKtpIdError) return;

        if (Object.keys(formState?.errors).length) {
            onSetKtpIdError(true);
        } else {
            onSetKtpIdError(false);
        }
    }, [formState]);

    const handleChangeKtpId = ({target}) => {
        setValue('ktp_id', target.value.replace(/[^0-9]/g, ''));
    };

    const handleValidateKtpId = (value) => {
        const {isValid, reason} = validateKtpId(value);

        if (isValid) return true;

        switch (reason) {
            case 'invalid-format':
                return formatMessage(messages.error_message_empty);
            case 'invalid-age':
            default:
                return formatMessage(messages.error_message, {age: legalAge});
        }
    };

    const classNames = classnames('checkout-ktp-id-component', {
        'checkout-ktp-id-component-valid': ktpId
    });

    return (
        <div className={classNames}>
            {ktpId ? (
                <div>
                    <div className="checkout-ktp-id-component-valid-title">
                        {formatMessage(messages.ktp_id_title_valid)}
                    </div>
                    <div className="checkout-ktp-id-component-valid-code">
                        <span className="checkout-ktp-id-component-valid-code-label">
                            {`${formatMessage(messages.ktp_id)}:`}
                        </span>
                        <span className="checkout-ktp-id-component-valid-code-value">
                            {ktpId}
                        </span>
                    </div>
                </div>
            ) : (
                <>
                    <div className="checkout-ktp-id-component-title">
                        {formatMessage(messages.ktp_id_title)}
                    </div>
                    <form noValidate
                          className="checkout-ktp-id-component-form"
                          onSubmit={handleSubmit(onAdd)}>
                        {loading && <LoaderComponent type="overlay"/>}
                        {error && <ErrorComponent error={error}/>}
                        <div className="checkout-ktp-id-component-body">
                            <FormGroupComponent controlId="ktp_id"
                                                name="ktp_id"
                                                type="text"
                                                defaultValue={ktpId || ktpIdLS}
                                                errors={errors}
                                                label={formatMessage(messages.ktp_id_label)}
                                                onInput={handleChangeKtpId}
                                                className="checkout-ktp-id-component-input"
                                                ref={register({
                                                    validate: handleValidateKtpId
                                                })}/>

                            <div className="checkout-ktp-id-component-action">
                                <ButtonComponent className="checkout-ktp-id-component-submit"
                                                 ref={refKtpId}
                                                 type="submit"
                                                 variant="secondary"
                                                 title={formatMessage(messages.action)}>
                                    {formatMessage(messages.action)}
                                </ButtonComponent>
                            </div>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}
