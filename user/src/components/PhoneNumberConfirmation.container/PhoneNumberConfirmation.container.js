import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';
import {FetchResult} from '@apollo/client';

import {useToast} from '@luft/common';

import {PhoneNumberConfirmationComponent} from '../PhoneNumberConfirmation.component';
import {useVerifyConfirmationCodeMutation, useSendPhoneConfirmationCodeMutation} from '../../hooks';
import {useStoreConfigQuery} from '../../../../common';
import custom_messages from './resources/messages';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     * */
    as?: React.Component,
    /**
     * Callback on successful code confirmation
     */
    onProcessRequest?: (Object) => Promise<FetchResult>
};

export function PhoneNumberConfirmationContainer(props: Props) {
    const {
        as: Component = PhoneNumberConfirmationComponent,
        onProcessRequest,
        ...others
    } = props;

    const {data: storeConfigData} = useStoreConfigQuery();
    const {formatMessage} = useIntl();
    const [confirmCode, {loading: confirmationLoading, error: confirmationError}] = useVerifyConfirmationCodeMutation();
    const [requestCode, {loading: requestCodeLoading, error: requestError}] = useSendPhoneConfirmationCodeMutation();
    const penaltyTime = storeConfigData?.storeConfig?.confirmation_code_request_frequency;
    const addToast = useToast();

    const handleOnConfirmCode = useCallback(async (phoneNumber, code) => {
        const result = await confirmCode({phone_number: phoneNumber, code});
        const isConfirmed = result?.data?.verifyPhoneConfirmationCode;

        if (isConfirmed) {
            addToast(formatMessage(custom_messages.confirmed_phone), 'success');
        }

        onProcessRequest();
    }, [
        confirmCode,
        onProcessRequest,
        addToast
    ]);

    const handleOnRequestCode = useCallback((phoneNumber) => requestCode({phone_number: phoneNumber}), [requestCode]);

    return (
        <Component {...others}
                   error={confirmationError || requestError}
                   loading={confirmationLoading || requestCodeLoading}
                   penaltyTime={penaltyTime}
                   onConfirmCode={handleOnConfirmCode}
                   onRequestCode={handleOnRequestCode}/>
    );
}
