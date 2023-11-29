import React from 'react';
import {useIntl} from 'react-intl';

import {
    ButtonComponent,
    ErrorComponent,
    LoaderComponent
} from '@luft/common';

import messages from './resources/messages';

type Props = {
    /**
     * Error product alert subscription
     */
    error?: Error,
    /**
     * A boolean indicating whether the updating data is in progress
     */
    loading?: boolean,
    /**
     * Callback to notify action
     */
    onNotify: () => void
};

export function ProductAlertComponent({
    error,
    loading,
    onNotify
}: Props) {
    const {formatMessage} = useIntl();

    return (
        <div className="product-alert-component">
            {error && <ErrorComponent error={error}/>}
            <ButtonComponent className="product-alert-component-action"
                             type="button"
                             title={formatMessage(messages.button_label)}
                             onClick={onNotify}>
                <span className="product-alert-component-action-label">
                    {formatMessage(messages.button_label)}
                </span>
                {loading && (
                    <LoaderComponent size="sm"
                                     variant="light"
                                     type="attached"/>
                )}
            </ButtonComponent>
        </div>
    );
}
