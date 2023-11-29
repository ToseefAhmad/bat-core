import React, {useContext, useEffect} from 'react';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';

import {
    ButtonComponent,
    FormGroupComponent,
    useValidationPatterns
} from '@luft/common';
import messages from '@luft/checkout/src/components/CheckoutContactInfoForm.component/resources/messages';

import {useFormInputRules} from '../../../../common';
import {CheckoutContext} from '../../contexts';

type Props = {
    email: string,
    loading?: boolean,
    onSaveInfo?: (email: string) => void
};

export function CheckoutContactInfoFormComponent(props: Props): React.Component {
    const {
        email,
        loading = false,
        onSaveInfo
    } = props;

    const {register, handleSubmit, errors} = useForm({mode: 'onBlur'});
    const {formatMessage} = useIntl();
    const {email: emailPattern} = useValidationPatterns();
    const {onSetCheckoutErrors} = useContext(CheckoutContext);
    const {getMaxLengthRule, getEmailRule} = useFormInputRules();

    const handleOnSaveInfo = async ({email: newEmail}) => onSaveInfo && await onSaveInfo(newEmail);

    // Passing the `errors.email` to useEffect deps will trigger it on every error appearance.
    // If the only `errors` object will be passed - it will be triggered only on form submit
    useEffect(() => {
        if (!errors.email) return;

        onSetCheckoutErrors(errors, 'email empty');
    }, [errors.email, errors, onSetCheckoutErrors]);

    return (
        <form noValidate
              className="checkout-contact-info-form-component"
              onSubmit={handleSubmit(handleOnSaveInfo)}>
            <FormGroupComponent controlId="shippingEmail"
                                type="email"
                                name="email"
                                label={formatMessage(messages.email_address)}
                                defaultValue={email}
                                errors={errors}
                                ref={register({
                                    required: true,
                                    pattern: emailPattern,
                                    validate: getEmailRule,
                                    ...getMaxLengthRule('email', {apply: 'my'})
                                })}/>

            <div className="checkout-contact-info-form-component-message">
                {formatMessage(messages.confirmation_text)}
            </div>

            <ButtonComponent variant="secondary"
                             type="submit"
                             disabled={loading}
                             title={formatMessage(messages.use_this_address)}>
                {formatMessage(messages.use_this_address)}
            </ButtonComponent>
        </form>
    );
}
