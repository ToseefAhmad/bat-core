import React from 'react';
import type {ComponentType} from 'react';

import {useStoreConfigQuery} from '@luft/common';

import {SalesforceChatComponent} from '../SalesforceChat.component';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as: ComponentType<{}>,
    /**
     * Prop, that identifies component, used for presentation of loading state
     */
    loadingAs?: ComponentType<{}>,
    /**
     * Flag, used to identify handling of loading state by container
     */
    awaitResult?: boolean
};

export function SalesforceChatContainer({
    as: Component = SalesforceChatComponent,
    loadingAs: Loading = null,
    awaitResult = true,
    ...other
}: Props) {
    const q = useStoreConfigQuery();

    if (awaitResult && q.loading) return Loading && <Loading/>;

    const {
        salesforce_chat_button_id: buttonId,
        salesforce_chat_deployment_id: deploymentId,
        salesforce_chat_endpoint_url: endpointUrl,
        salesforce_chat_organization_id: organizationId,
        salesforce_chat_script_url: scriptUrl
    } = q.data?.storeConfig || {};

    return (
        <Component {...other}
                   buttonId={buttonId}
                   deploymentId={deploymentId}
                   endpointUrl={endpointUrl}
                   organizationId={organizationId}
                   scriptUrl={scriptUrl}
                   error={q.error}/>
    );
}
