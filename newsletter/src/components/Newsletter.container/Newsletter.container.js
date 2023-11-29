import React, {useCallback} from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';

import {useIsAuthorized} from '@luft/user';
import {useToast, useStoreConfigQuery} from '@luft/common';
import {useSetNewsletterMutation} from '@luft/newsletter';
import messages from '@luft/newsletter/src/components/Newsletter.container/resources/messages';

import {NewsletterComponent} from '../Newsletter.component';
import {trackNewsletter} from '../../../../data-layer';

type Props = {
    as?: React.Component,
    onSetNewsletter?: (response: Object) => void
};

export function NewsletterContainer(props: Props) {
    const {
        as: Component = NewsletterComponent,
        onSetNewsletter = noop,
        ...other
    } = props;

    const {formatMessage} = useIntl();
    const {data} = useStoreConfigQuery();
    const enableSubscription = data?.storeConfig?.enable_subscription;
    const allowGuestSubscription = data?.storeConfig?.allow_guest_subscription;
    const isAuthorized = useIsAuthorized();
    const addToast = useToast();
    const [setNewsletter, {loading}] = useSetNewsletterMutation();

    const handleSetNewsletter = useCallback(async (input) => {
        try {
            const res = await setNewsletter(input);

            if (onSetNewsletter) {
                onSetNewsletter(res);
            }

            addToast(formatMessage(messages.newsletter_message), 'success');
            trackNewsletter();
            return res;
        } catch ({message}) {
            addToast(message, 'error');
        }
    }, [setNewsletter, onSetNewsletter, addToast, formatMessage]);

    return (
        <Component {...other}
                   onSetNewsletter={handleSetNewsletter}
                   loading={loading}
                   enableSubscription={enableSubscription}
                   allowGuestSubscription={allowGuestSubscription}
                   isAuthorized={isAuthorized}/>
    );
}
