import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';
import classnames from 'classnames';
import Script from 'react-load-script';

import {
    ButtonComponent,
    FormGroupComponent,
    LoaderComponent,
    ErrorComponent,
    useValidationPatterns
} from '@luft/common';
import {CmsBlockContainer} from '@luft/cms';

import {
    getPhonePrefixByStoreCode,
    getStoreCodeByPathname,
    useFormInputRules
} from '../../../../common';
import {RecaptchaComponent} from '../../../../user';

import messages from './resources/messages';

type Props = {
    isWebToCaseEnabled: boolean,
    isRecaptchaEnabled: boolean,
    isSentSuccess: boolean,
    loading: boolean,
    error: Error,
    token?: string,
    isHubspotContactUsFormEnabled: boolean,
    hubspotContactUsFormRegion: string,
    hubspotContactUsFormPortalId: string,
    hubspotContactUsFormFormId: string,
    onVerify?: (token: string) => void,
    onSubmit: (input: Object) => void,
};

export function ContactUsComponent(props: Props) {
    const {
        isWebToCaseEnabled,
        isRecaptchaEnabled,
        isSentSuccess,
        loading,
        error,
        token,
        isHubspotContactUsFormEnabled,
        hubspotContactUsFormRegion,
        hubspotContactUsFormPortalId,
        hubspotContactUsFormFormId,
        onVerify,
        onSubmit,
        ...other
    } = props;

    const {formatMessage} = useIntl();
    const {register, errors, handleSubmit, setValue, formState} = useForm({mode: 'onBlur'});
    const {email: emailPattern} = useValidationPatterns();
    const storeCode = getStoreCodeByPathname();
    const phonePrefix = getPhonePrefixByStoreCode();
    const {getMaxLengthRule, getMinLengthRule, getTrimRule, getEmailRule} = useFormInputRules();

    const handleChangePhoneNumber = useCallback(({target}) => {
        setValue('phone', target.value.replace(/[^0-9]/g, ''));
    }, [setValue]);

    const handleOnSubmit = useCallback(async ({
        first_name,
        last_name,
        phone,
        ...data
    }) => {
        const input = {
            ...data,
            full_name: `${first_name} ${last_name}`,
            phone: `${phonePrefix}${phone}`
        };

        if (onSubmit) {
            onSubmit(input);
        }
    }, [onSubmit, phonePrefix]);

    const handleOnLoadHubspotScript = useCallback(() => {
        if (typeof window === 'undefined' || !window.hbspt?.forms) return;

        window.hbspt.forms.create({
            region: hubspotContactUsFormRegion,
            portalId: hubspotContactUsFormPortalId,
            formId: hubspotContactUsFormFormId,
            target: '.contact-us-component-hubspot-form'
        });
    }, [hubspotContactUsFormRegion, hubspotContactUsFormPortalId, hubspotContactUsFormFormId]);

    const phoneClassNames = classnames('phone-component', `phone-component-${storeCode}`);
    const disabled = !formState.isValid || (isRecaptchaEnabled && !token);

    return (
        <div className="contact-us-component">
            {error && <ErrorComponent error={error}/>}

            {isWebToCaseEnabled && (
                <>
                    <CmsBlockContainer cmsBlockId="contact-us"
                                       group="contact-us-page"/>

                    <div className="contact-us-component-wrapper">
                        {isSentSuccess ? (
                            <div className="contact-us-component-success">
                                <h2 className="contact-us-component-success-title">
                                    {formatMessage(messages.success_title)}
                                </h2>
                                <div className="contact-us-component-success-message">
                                    {formatMessage(messages.success_message)}
                                </div>
                            </div>
                        ) : (
                            <form noValidate
                                  className="contact-us-component-form"
                                  onSubmit={handleSubmit(handleOnSubmit)}>
                                <fieldset>
                                    <FormGroupComponent controlId="first_name"
                                                        name="first_name"
                                                        errors={errors}
                                                        label={formatMessage(messages.first_name)}
                                                        ref={register({
                                                            required: true,
                                                            validate: getTrimRule,
                                                            ...getMaxLengthRule('firstName', {apply: 'my'})
                                                        })}/>
                                    <FormGroupComponent controlId="last_name"
                                                        name="last_name"
                                                        errors={errors}
                                                        label={formatMessage(messages.last_name)}
                                                        ref={register({
                                                            required: true,
                                                            validate: getTrimRule,
                                                            ...getMaxLengthRule('lastName', {apply: 'my'})
                                                        })}/>
                                    <FormGroupComponent controlId="email_address"
                                                        name="email_address"
                                                        type="email"
                                                        errors={errors}
                                                        label={formatMessage(messages.email_address)}
                                                        ref={register({
                                                            required: true,
                                                            pattern: emailPattern,
                                                            validate: getEmailRule,
                                                            ...getMaxLengthRule('email', {apply: 'my'})
                                                        })}/>
                                    <FormGroupComponent controlId="phone"
                                                        name="phone"
                                                        className={phoneClassNames}
                                                        errors={errors}
                                                        label={formatMessage(messages.phone)}
                                                        onInput={handleChangePhoneNumber}
                                                        ref={register({
                                                            ...getMinLengthRule('phone'),
                                                            ...getMaxLengthRule('phone', {apply: 'my'})
                                                        })}/>
                                    <FormGroupComponent controlId="message"
                                                        name="message"
                                                        inputAs="textarea"
                                                        className="contact-us-component-form-message"
                                                        errors={errors}
                                                        label={formatMessage(messages.message)}
                                                        ref={register({
                                                            required: true,
                                                            validate: getTrimRule,
                                                            ...getMaxLengthRule('message')
                                                        })}/>
                                </fieldset>

                                {isRecaptchaEnabled && <RecaptchaComponent {...other}
                                                                           onVerify={onVerify}/>}

                                <ButtonComponent className="contact-us-component-form-submit"
                                                 type="submit"
                                                 disabled={disabled || loading}
                                                 title={formatMessage(messages.submit)}>
                                    <span className="contact-us-component-form-submit-title">
                                        {formatMessage(messages.submit)}
                                    </span>
                                    {loading && (
                                        <LoaderComponent size="sm"
                                                         variant="light"
                                                         type="attached"/>
                                    )}
                                </ButtonComponent>
                            </form>
                        )}
                        <div className="contact-us-component-divider"/>
                    </div>
                </>
            )}

            <div className="contact-us-component-wrapper">
                <CmsBlockContainer cmsBlockId="customer-service"
                                   group="contact-us-page"/>
            </div>

            {isHubspotContactUsFormEnabled && (
                <>
                    <Script url="//js-eu1.hsforms.net/forms/v2.js"
                            onLoad={handleOnLoadHubspotScript}/>
                    <div className="contact-us-component-hubspot-form">
                        {/* Hubspot form will be added here */}
                    </div>
                </>
            )}
        </div>
    );
}
