import React from 'react';
import type {ComponentType} from 'react';
import {useIntl} from 'react-intl';

import {useViewerQuery} from '@luft/user';
import {
    LoaderComponent,
    ErrorComponent,
    useToast,
    useStoreConfigQuery
} from '@luft/common';

import {AccountPreferencesComponent} from '../AccountPreferences.component';
import {useUpdatePreferencesMutation} from '../../hooks';
import messages from './resources/messages';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: ComponentType<{}>,
    /**
     * Represent for loading view
     */
    loadingAs?: ComponentType<{}>,
    /**
     * Represent for error view
     */
    errorAs?: ComponentType<{}>,
    /**
     * Await result
     */
    awaitResult?: boolean,
    /**
     * Callback for saving info updates
     */
    onSaveInfoUpdates?: Function
}

export function AccountPreferencesContainer(props: Props) {
    const {
        as: Component = AccountPreferencesComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        awaitResult = true,
        onSaveInfoUpdates
    } = props;

    const addToast = useToast();
    const {formatMessage} = useIntl();
    const [preferencesInfoMutation, {error: updateError, loading: updateLoading}] = useUpdatePreferencesMutation();
    const storeConfigQuery = useStoreConfigQuery();
    const viewerQuery = useViewerQuery();

    const isLoading = viewerQuery.loading || storeConfigQuery.loading;
    const isDataError = viewerQuery.dataError || storeConfigQuery.dataError;

    if (awaitResult && isLoading) return Loading && <Loading/>;
    if (awaitResult && isDataError) return Error && <Error error={isDataError}/>;

    const handleInfoChange = async (data) => {
        const resp = await preferencesInfoMutation(data);
        addToast(formatMessage(messages.save_success), 'success');
        if (onSaveInfoUpdates) onSaveInfoUpdates(data);

        return resp;
    };

    const account = viewerQuery.data?.viewer?.user;
    const isEnabledSubscription = storeConfigQuery.data?.storeConfig?.enable_subscription;

    return (
        <Component error={updateError}
                   loading={updateLoading}
                   account={account}
                   isEnabledSubscription={isEnabledSubscription}
                   onSaveInfoUpdates={handleInfoChange}/>
    );
}
