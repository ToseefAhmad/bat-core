import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';

import {AccountTitleComponent} from '@luft/account';
import {
    CheckboxComponent,
    ButtonComponent,
    ErrorComponent,
    LoaderComponent
} from '@luft/common';
import {CmsBlockContainer} from '@luft/cms';

import messages from './resources/messages';

type Account = {
    /**
     * Flag, which indicates that user has accepted the consent to use data
     */
    consent: boolean,
    /**
     * Flag, which indicates that user is subscribed to newsletter
     */
    newsletter_subscribe: boolean
};

type Props = {
    /**
     * Text, which is used as a title
     */
    title?: string,
    /**
     * User information
     */
    account: Account,
    /**
     * Subscription information
     */
    isEnabledSubscription: boolean,
    /**
     * Represent for loading view
     */
    loading: boolean,
    /**
     * Error for represent
     */
    error?: boolean,
    /**
     * Callback for saving info updates
     */
    onSaveInfoUpdates?: Function,
    /**
     * Callback, which is used to go back
     */
    onBack?: Function
};

export function AccountPreferencesComponent(props: Props) {
    const {formatMessage} = useIntl();
    const {
        account,
        isEnabledSubscription,
        loading,
        error,
        title = formatMessage(messages.preferences_title),
        onSaveInfoUpdates,
        onBack
    } = props;

    const {errors, register, handleSubmit} = useForm();
    const [checkedConsent, setCheckedConsent] = useState(account?.consent);
    const [checkedPreferences, setCheckedPreferences] = useState(account?.newsletter_subscribe);

    return (
        <div className="account-preferences-component">
            <AccountTitleComponent title={title}
                                   onBack={onBack}/>
            <form className="account-preferences-component-form"
                  noValidate
                  onSubmit={handleSubmit(onSaveInfoUpdates)}>
                {loading && <LoaderComponent type="overlay"/>}
                {error && <ErrorComponent error={error}/>}

                <div className="account-preferences-component-content">
                    <CmsBlockContainer cmsBlockId="account-preferences-description"
                                       group="account-preferences-page"/>
                    {isEnabledSubscription && (
                        <div className="account-preferences-component-content-email">
                            <CmsBlockContainer cmsBlockId="account-preferences-email-description"
                                               group="account-preferences-page"/>
                            <CheckboxComponent id="preferences"
                                               label={formatMessage(messages.email)}
                                               name="preferences"
                                               errors={errors}
                                               ref={register}
                                               checked={checkedPreferences}
                                               onChange={() => setCheckedPreferences(prev => !prev)}
                                               className="account-preferences-component-label"/>
                            <CmsBlockContainer cmsBlockId="account-preferences-component-content-email-notes"
                                               group="account-preferences-page"/>
                        </div>
                    )}

                    <div className="account-preferences-component-content-data-sharing">
                        <CheckboxComponent id="consent"
                                           className="account-preferences-component-label"
                                           label={formatMessage(messages.consent)}
                                           name="consent"
                                           checked={checkedConsent}
                                           onChange={() => setCheckedConsent(prev => !prev)}
                                           errors={errors}
                                           ref={register}/>
                    </div>
                    <CmsBlockContainer cmsBlockId="account-preferences-component-content-link"
                                       group="account-preferences-page"/>

                    <ButtonComponent className="account-preferences-component-submit"
                                     type="submit"
                                     title={formatMessage(messages.save)}
                                     variant="secondary">
                        <span className="account-preferences-component-submit-title">
                            {formatMessage(messages.save)}
                        </span>
                    </ButtonComponent>
                </div>
            </form>
        </div>
    );
}
