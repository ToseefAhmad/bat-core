import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';
import {useHistory, useLocation} from 'react-router';

import {useToast} from '@luft/common';
import {useProductContextField} from '@luft/product';
import {useIsAuthorized} from '@luft/user';

import {ProductAlertComponent} from '../ProductAlert.component';
import {useProductAlertNotifyMutation} from '../../hooks';

import messages from './resources/messages';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: React.Component
};

export function ProductAlertContainer({
    as: Component = ProductAlertComponent
}: Props) {
    const history = useHistory();
    const {pathname} = useLocation();
    const {formatMessage} = useIntl();
    const addToast = useToast();
    const isAuthorized = useIsAuthorized();
    const [notify, {loading, error}] = useProductAlertNotifyMutation();

    const productId = useProductContextField('product.id');

    const handleNotify = useCallback(async () => {
        if (!isAuthorized) {
            history.push('/account/login', {from: pathname});
            return;
        }

        try {
            await notify(productId);
            addToast(formatMessage(messages.success_message), 'success');
        } catch (e) {
            return null;
        }
    }, [history]);

    return (
        <Component error={error}
                   loading={loading}
                   onNotify={handleNotify}/>
    );
}
