import React, {useState} from 'react';
import {isEmpty} from 'lodash';
import {useIntl} from 'react-intl';

import {ErrorComponent, ButtonComponent} from '@luft/common';
import {RegisterFormComponent} from '@luft/user';

import type {RegisterInput} from '@luft/types';

import messages from '@luft/user/src/components/Register.component/resources/messages';

import {AgeVerificationContainer, AgeVerificationComponent} from '../../../../restrict-access';
import {CmsRegisterSuccessComponent} from '../CmsRegisterSuccess.component';

import custom_messages from './resources/messages';

type Props = {
    error?: Error,
    loading?: boolean,
    registerInput?: RegisterInput,
    isEmailPredefined?: boolean,
    isSocialRegister?: boolean,
    referralCode?: string,
    isAzureEnabled?: boolean,
    isRegistered?: boolean,
    onRegister?: () => void
}

export function CmsRegisterComponent(props: Props) {
    const {formatMessage} = useIntl();

    const {
        error,
        loading,
        registerInput = {},
        isEmailPredefined = false,
        isSocialRegister = false,
        referralCode = '',
        isAzureEnabled = false,
        isRegistered = false,
        onRegister,
        ...other
    } = props;

    const [userVerifiedData, setUserVerifiedData] = useState({});

    const handleVerify = (data) => {
        setUserVerifiedData(data);
    };

    const isAgeVerificationStep = isAzureEnabled && isEmpty(userVerifiedData);
    const isRegisterFormStep = !isAgeVerificationStep && !isRegistered;

    return (
        <div className="cms-register-component">
            <h3 className="cms-register-component-title">
                {formatMessage(messages.register)}
            </h3>

            {error && <ErrorComponent error={error}/>}

            {isAgeVerificationStep && (
                <AgeVerificationContainer as={AgeVerificationComponent}
                                          showTitle={true}
                                          onVerify={handleVerify}/>
            )}

            {!isEmpty(userVerifiedData) && !isRegistered && (
                <div className="cms-register-component-age">
                    <p>
                        {formatMessage(custom_messages.check_note)}
                    </p>
                    <p className="cms-register-component-verify-name">
                        {userVerifiedData.first_name}
                        {' '}
                        {userVerifiedData.last_name}
                    </p>
                    <p className="cms-register-component-verify-text">
                        {formatMessage(custom_messages.verify_note)}
                        <ButtonComponent className="register-component-reverify"
                                         variant="link"
                                         inline={true}
                                         type="button"
                                         onClick={() => setUserVerifiedData({})}
                                         title={formatMessage(custom_messages.link_title)}>
                            {formatMessage(custom_messages.link_title)}
                        </ButtonComponent>
                    </p>
                    <p>
                        {formatMessage(custom_messages.fix_note)}
                    </p>
                </div>
            )}

            {isRegisterFormStep && (
                <RegisterFormComponent onRegister={onRegister}
                                       loading={loading}
                                       registerInput={registerInput}
                                       isEmailPredefined={isEmailPredefined}
                                       isSocialRegister={isSocialRegister}
                                       referralCode={referralCode}
                                       userVerifiedData={userVerifiedData}
                                       {...other}/>
            )}

            {isRegistered && (
                <CmsRegisterSuccessComponent/>
            )}
        </div>
    );
}
