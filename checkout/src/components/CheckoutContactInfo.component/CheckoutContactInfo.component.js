import React from 'react';
import {useIntl} from 'react-intl';

import {
    BackComponent,
    ButtonComponent,
    ErrorComponent,
    LoaderComponent
} from '@luft/common';
import {CheckoutContactInfoFormComponent} from '@luft/checkout';
import {SocialProvidersContainer} from '@luft/user';

import messages from '@luft/checkout/src/components/CheckoutContactInfo.component/resources/messages';

type Props = {
    email: string | null,
    loading?: boolean,
    error?: Error,
    onNavigateLogin?: (e: React.SyntheticEvent) => void,
    onBack?: () => void,
    onSaveInfo?: (email: string) => void
};

export function CheckoutContactInfoComponent(props: Props): React.Component {
    const {
        email,
        error,
        loading = false,
        onBack,
        onNavigateLogin,
        onSaveInfo
    }: Props = props;

    const {formatMessage} = useIntl();

    return (
        <div className="checkout-contact-info-component">
            <BackComponent title={formatMessage(messages.title)}
                           variant="header"
                           onBack={onBack}/>

            {error && <ErrorComponent error={error}/>}
            {loading && <LoaderComponent type="overlay"/>}

            <div className="checkout-contact-info-component-body">

                <CheckoutContactInfoFormComponent email={email}
                                                  onSaveInfo={onSaveInfo}
                                                  loading={loading} />

                <div className="checkout-contact-info-component-body-message">
                    <span className="checkout-contact-info-component-body-message-text">
                        {formatMessage(messages.have_account)}
                    </span>

                    <ButtonComponent className="checkout-contact-info-component-login-link"
                                     onClick={onNavigateLogin}
                                     title={formatMessage(messages.login)}
                                     inline={true}
                                     variant="link">
                        {formatMessage(messages.login)}
                    </ButtonComponent>
                </div>
            </div>
            <SocialProvidersContainer pageType="CHECKOUT"/>
        </div>
    );
}
