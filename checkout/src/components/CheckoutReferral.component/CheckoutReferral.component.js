import React, {useContext, useEffect} from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';

import {
    ButtonComponent,
    FormGroupComponent,
    LoaderComponent,
    ErrorComponent
} from '@luft/common';

import {useFormInputRules} from '../../../../common';
import {CheckoutContext} from '../../contexts';
import messages from './resources/messages';

type Props = {
    referralCode: String,
    error?: Error,
    loading?: Boolean,
    onAdd?: Function,
    onRemove?: Function
};

export function CheckoutReferralComponent(props: Props) {
    const {
        referralCode,
        error,
        loading,
        onAdd = noop,
        onRemove = noop
    } = props;
    const actionTitle = referralCode ? messages.remove : messages.apply;

    const {formatMessage} = useIntl();
    const {register, errors, handleSubmit, clearErrors} = useForm();
    const {onSetCheckoutErrors} = useContext(CheckoutContext);
    const {getTrimRule} = useFormInputRules();

    useEffect(() => {
        if (!errors.code) return;

        onSetCheckoutErrors(errors, 'invalid referral code');
        const timer = setTimeout(() => clearErrors('code'), 5000);

        return () => clearTimeout(timer);
    }, [errors, clearErrors, onSetCheckoutErrors]);

    const handleOnSubmit = async ({code}) => {
        await onAdd(code);
    };

    return (
        <div className="checkout-referral-component">
            <div className="checkout-referral-component-title">
                {formatMessage(messages.referral_code_title)}
            </div>
            <form noValidate
                  className="checkout-referral-component-form"
                  onSubmit={handleSubmit(handleOnSubmit)}>
                {loading && <LoaderComponent type="overlay"/>}
                {error && <ErrorComponent error={error}/>}
                <div className="checkout-referral-component-body">
                    {referralCode ? (
                        <>
                            <div className="checkout-referral-component-code">
                                <span className="checkout-referral-component-code-label">
                                    {formatMessage(messages.referral_code)}
                                    :
                                </span>
                                <span className="checkout-referral-component-code-value">
                                    {referralCode}
                                </span>
                            </div>
                            <div className="checkout-referral-component-action">
                                <ButtonComponent className="checkout-referral-component-submit"
                                                 variant="link"
                                                 type="button"
                                                 disabled={loading}
                                                 onClick={() => onRemove(referralCode)}
                                                 title={formatMessage(actionTitle)}>
                                    {formatMessage(actionTitle)}
                                </ButtonComponent>
                            </div>
                        </>
                    ) : (
                        <>
                            <FormGroupComponent controlId="referralCode"
                                                className="checkout-referral-component-input"
                                                label={formatMessage(messages.referral_code)}
                                                name="code"
                                                errors={errors}
                                                ref={register({
                                                    required: true,
                                                    validate: getTrimRule
                                                })}/>
                            <div className="checkout-referral-component-action">
                                <ButtonComponent className="checkout-referral-component-submit"
                                                 variant="secondary"
                                                 type="submit"
                                                 disabled={loading}
                                                 title={formatMessage(actionTitle)}>
                                    {formatMessage(actionTitle)}
                                </ButtonComponent>
                            </div>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
