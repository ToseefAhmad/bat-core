import React, {useEffect} from 'react';
import {noop, isEmpty} from 'lodash';
import {useIntl} from 'react-intl';
import {useHistory, useLocation} from 'react-router-dom';
import {parse} from 'query-string';
import type {ComponentType} from 'react';

import {LoaderComponent, useToast} from '@luft/common';

import {AccountConfirmComponent} from '../AccountConfirm.component';
import {useSendConfirmationLinkMutation, useActivateAccountMutation} from '../../hooks';
import {getReferralManager} from '../../util';
import {trackRegistration, trackNewsletter} from '../../../../data-layer';
import messages from './resources/messages';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: ComponentType<{}>,
    /**
     * Callback for sending the confirmation link
     */
    onSendConfirmationLink?: Function,
    /**
     * Callback for activating the account
     */
    onActivateAccount?: Function
};

const DEFAULT_BACK_URL = '/account';

export function AccountConfirmContainer(props: Props) {
    const {
        as: Component = AccountConfirmComponent,
        onSendConfirmationLink = noop,
        onActivateAccount = noop,
        ...other
    } = props;

    const {formatMessage} = useIntl();
    const {search, state} = useLocation();
    const history = useHistory();
    const addToast = useToast();

    const params = parse(search);
    const hasParams = !isEmpty(params);

    const [sendConfirmationLinkMutation, {loading, error: sendLinkError}] = useSendConfirmationLinkMutation();
    const [activeAccountMutation, {error: activateAccountError}] = useActivateAccountMutation();

    const {clearCode} = getReferralManager();

    useEffect(() => {
        if (!hasParams) return;

        (async () => {
            const {back_url, ...input} = params;

            try {
                const response = await activeAccountMutation(input);

                const hasConsent = response?.data?.activateAccount?.user?.consent;

                if (hasConsent) trackNewsletter();
                trackRegistration('success');
                clearCode();
                addToast(formatMessage(messages.register_success), 'success');
                onActivateAccount(input);

                history.push(back_url);
            } catch (e) {
                onActivateAccount(e);

                history.push('/account/login', {error: e});
            }
        })();
    }, []);

    const handleSendConfirmationLink = async (input) => {
        try {
            const backUrl = state?.backUrl || DEFAULT_BACK_URL;

            const response = await sendConfirmationLinkMutation({...input, back_url: backUrl});

            const isSuccess = response?.data?.sendConfirmationLink?.success;

            if (isSuccess) {
                addToast(formatMessage(messages.email_sent_success), 'success');
                onSendConfirmationLink(response);

                history.push('/account/login');
            }

            return response;
        } catch (e) {
            onSendConfirmationLink(e);
            return e;
        }
    };

    if (hasParams && !activateAccountError) return <LoaderComponent type="overlay"/>;

    return (
        <Component {...other}
                   loading={loading}
                   error={sendLinkError || activateAccountError}
                   onSendConfirmationLink={handleSendConfirmationLink}/>
    );
}
