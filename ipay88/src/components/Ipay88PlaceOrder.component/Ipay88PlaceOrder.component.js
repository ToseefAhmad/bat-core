import React, {useEffect, useRef} from 'react';
import {useIntl} from 'react-intl';

import {
    ButtonComponent,
    ErrorComponent,
    LoaderComponent
} from '@luft/common';

import messages from './resources/messages';

type Ipay88FormData = {
    /**
     * Action url
     */
    action: string,
    /**
     * Fields for sending
     */
    fields: {name: string, value: string, __typename: string}[]
}

type Props = {
    /**
     * Is loading status
     */
    loading: boolean,
    /**
     * Error for represent
     */
    error: Error,
    /**
     * Flag to disable/enable button
     */
    disabled?: boolean,
    /**
     * Data for sending to payment gateway
     */
    formData?: Ipay88FormData,
    /**
     * Callback to redirect to payment
     */
    onSubmit: () => void
};

export const Ipay88PlaceOrderComponent = ({loading, error, disabled, formData, onSubmit}: Props) => {
    const {formatMessage} = useIntl();
    const formRef = useRef();

    useEffect(() => {
        if (!formData) return;
        formRef.current.submit();
    }, [formData]);

    return (
        <div className="ipay88-place-order-component">
            {error && <ErrorComponent error={error}/>}
            {loading && <LoaderComponent type="overlay"/>}

            <ButtonComponent className="ipay88-place-order-component-action"
                             onClick={onSubmit}
                             variant="secondary"
                             disabled={disabled || loading}
                             title={formatMessage(messages.action_title)}>
                {formatMessage(messages.action_title)}
            </ButtonComponent>

            {formData && (
                <form action={formData.action}
                      ref={formRef}
                      method="post"
                      style={{display: 'none'}}>
                    {formData.fields.map(field => (
                        <input key={field.name}
                               type="text"
                               name={field.name}
                               value={field.value}/>
                    ))}
                </form>
            )}
        </div>
    );
};
