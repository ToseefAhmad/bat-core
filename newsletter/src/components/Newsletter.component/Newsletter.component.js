import React from 'react';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';

import {
    ButtonComponent,
    FormGroupComponent,
    useValidationPatterns,
    LoaderComponent
} from '@luft/common';
import {CmsBlockContainer} from '@luft/cms';

import messages from '@luft/newsletter/src/components/Newsletter.component/resources/messages';

import {useFormInputRules} from '../../../../common';

type Props = {
    onSetNewsletter?: Function,
    loading?: boolean,
    enableSubscription: boolean,
    allowGuestSubscription?: boolean,
    isAuthorized?: boolean
};

export function NewsletterComponent(props: Props) {
    const {
        onSetNewsletter,
        loading,
        enableSubscription,
        allowGuestSubscription,
        isAuthorized
    } = props;

    const {formatMessage} = useIntl();
    const {register, handleSubmit, errors} = useForm({mode: 'onBlur'});
    const {email: emailPattern} = useValidationPatterns();
    const {getMaxLengthRule, getEmailRule} = useFormInputRules();

    if (!enableSubscription || (!allowGuestSubscription && !isAuthorized)) {
        return null;
    }

    const handleOnSetNewsletter = async data => {
        const {email} = data;
        return await onSetNewsletter({
            email,
            subscribed: true
        });
    };

    return (
        <div className="newsletter-component">
            <form noValidate
                  className="newsletter-component-form"
                  onSubmit={handleSubmit(handleOnSetNewsletter)}>
                <div className="newsletter-component-form-title">
                    {formatMessage(messages.newsletter_title)}
                </div>
                <div className="newsletter-component-form-body">
                    <FormGroupComponent controlId="newsletterEmail"
                                        className="newsletter-component-form-group"
                                        type="email"
                                        name="email"
                                        label={formatMessage(messages.newsletter_placeholder)}
                                        errors={errors}
                                        ref={register({
                                            required: true,
                                            pattern: emailPattern,
                                            validate: getEmailRule,
                                            ...getMaxLengthRule('email', {apply: 'my'})
                                        })}/>
                    <div className="newsletter-component-form-button">
                        <ButtonComponent className="newsletter-component-form-submit"
                                         variant="tertiary"
                                         type="submit"
                                         title={formatMessage(messages.newsletter_sign_up)}>
                            {formatMessage(messages.newsletter_sign_up)}
                            {loading && (
                                <LoaderComponent size="sm"
                                                 variant="dark"
                                                 type="attached"/>
                            )}
                        </ButtonComponent>
                    </div>
                </div>
            </form>
            <CmsBlockContainer className="newsletter-component-text"
                               cmsBlockId="newsletter-disclaimer"
                               group="footer"/>
        </div>
    );
}
