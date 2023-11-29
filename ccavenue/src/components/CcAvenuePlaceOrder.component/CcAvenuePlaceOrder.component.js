import React, {useEffect, useRef} from 'react';
import {useIntl} from 'react-intl';

import {
    ButtonComponent,
    ErrorComponent,
    LoaderComponent
} from '@luft/common';

import messages from './resources/messages';

import type {CcAvenueRedirect} from '../../../../types';

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
     * Data for sending to payment gateway
     */
    formData?: CcAvenueRedirect,
    /**
     * Callback to redirect to payment
     */
    onSubmit: () => void
};

export const CcAvenuePlaceOrderComponent = ({loading, error, formData, onSubmit}: Props) => {
    const {formatMessage} = useIntl();
    const formRef = useRef();

    useEffect(() => {
        if (!formData) return;
        formRef.current.submit();
    }, [formData]);

    return (
        <div className="ccavenue-place-order-component">
            {error && <ErrorComponent error={error}/>}
            {loading && <LoaderComponent type="overlay"/>}

            <ButtonComponent className="ccavenue-place-order-component-action"
                             onClick={onSubmit}
                             variant="secondary"
                             disabled={loading}
                             title={formatMessage(messages.action_title)}>
                {formatMessage(messages.action_title)}
            </ButtonComponent>

            {formData && (
                <form action={formData.action}
                      ref={formRef}
                      method="post"
                      encType="application/x-www-form-urlencoded"
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
