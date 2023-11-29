import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';

import {useToast, useStoreConfigQuery} from '@luft/common';
import {AccountSecurityComponent, useUpdateViewerMutation} from '@luft/account';
import messages from '@luft/account/src/components/AccountSecurity.container/resources/messages';

type Props = {
    as?: React.Component,
    onSaveInfoUpdates?: Function
}

export function AccountSecurityContainer(props: Props) {
    const {
        as: Component = AccountSecurityComponent,
        onSaveInfoUpdates,
        ...other
    } = props;

    const m = useUpdateViewerMutation();
    const {data: storeConfigData} = useStoreConfigQuery();
    const {formatMessage} = useIntl();
    const addToast = useToast();

    const [viewerInfoMutation, {loading, error}] = m;

    const handleInfoChange = useCallback(async ({password, new_password, ...others}) => {
        const resp = await viewerInfoMutation({viewer_info: {...others}, password, new_password});
        addToast(formatMessage(messages.save_password_success), 'success');
        if (onSaveInfoUpdates) onSaveInfoUpdates({password, new_password, ...others});
        return resp;
    }, [viewerInfoMutation, onSaveInfoUpdates, addToast, formatMessage]);

    const minimumPasswordLength = storeConfigData?.storeConfig?.customer_minimum_password_length;
    const passwordRequiredClassesCount = storeConfigData?.storeConfig?.password_required_character_classes_number;

    return (
        <Component {...other}
                   m={m}
                   loading={loading}
                   error={error}
                   isConfirmPassword={true}
                   minimumPasswordLength={minimumPasswordLength}
                   passwordRequiredClassesCount={passwordRequiredClassesCount}
                   onSaveInfoUpdates={handleInfoChange}/>
    );
}
