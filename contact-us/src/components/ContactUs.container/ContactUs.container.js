import React, {useState} from 'react';

import {ContactUsComponent} from '../ContactUs.component';
import {useContactUsMutation, useContactUsConfigQuery} from '../../hooks';

type Props = {
    as?: React.Component
};

export function ContactUsContainer(props: Props) {
    const {
        as: Component = ContactUsComponent,
        ...other
    } = props;

    const [token, setToken] = useState();
    const [sendContactUsForm, {data, loading, error}] = useContactUsMutation(token);
    const {data: contactUsConfigData} = useContactUsConfigQuery();

    const isSentSuccess = data?.sendContactUsFormToCRM?.success;
    const {
        web_to_case_enabled: isWebToCaseEnabled,
        recaptcha_contact: recaptchaContactConfig,
        hubspot_contact_us_form_enabled: isHubspotContactUsFormEnabled,
        hubspot_contact_us_form_region: hubspotContactUsFormRegion,
        hubspot_contact_us_form_portal_id: hubspotContactUsFormPortalId,
        hubspot_contact_us_form_form_id: hubspotContactUsFormFormId
    } = contactUsConfigData?.storeConfig || {};
    const isRecaptchaEnabledOnPage = recaptchaContactConfig?.enabled;

    return (
        <Component {...other}
                   isWebToCaseEnabled={isWebToCaseEnabled}
                   isRecaptchaEnabled={isRecaptchaEnabledOnPage}
                   isSentSuccess={isSentSuccess}
                   loading={loading}
                   error={error}
                   recaptchaConfig={recaptchaContactConfig}
                   token={token}
                   isHubspotContactUsFormEnabled={isHubspotContactUsFormEnabled}
                   hubspotContactUsFormRegion={hubspotContactUsFormRegion}
                   hubspotContactUsFormPortalId={hubspotContactUsFormPortalId}
                   hubspotContactUsFormFormId={hubspotContactUsFormFormId}
                   onVerify={setToken}
                   onSubmit={sendContactUsForm}/>
    );
}
