import React, {useEffect, useRef} from 'react';
import {useIntl} from 'react-intl';

import {
    ButtonComponent,
    ErrorComponent,
    LoaderComponent
} from '@luft/common';

import messages from './resources/messages';

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
     * Paynamics form data
     */
    formData: Object,
    /**
     * Callback, when place order action is submitted
     */
    onSubmit: Function
};

export function PaynamicsPlaceOrderComponent({
    loading,
    error,
    formData,
    onSubmit
}: Props) {
    const {formatMessage} = useIntl();
    const formRef = useRef();
    const {form_url, form_method, input_value, input_name} = formData || {};

    useEffect(() => {
        if (!form_url || !form_method || !input_value || !input_name) return;

        formRef.current.submit();
    }, [form_url, form_method, input_value, input_name]);

    return (
        <div className="paynamics-place-order-component">
            {error && <ErrorComponent error={error}/>}
            {loading && <LoaderComponent type="overlay"/>}
            <ButtonComponent className="paynamics-place-order-component-action"
                             onClick={onSubmit}
                             variant="secondary"
                             disabled={loading}
                             title={formatMessage(messages.action_title)}>
                {formatMessage(messages.action_title)}
            </ButtonComponent>
            <form action={form_url}
                  ref={formRef}
                  method={form_method}
                  style={{display: 'none'}}>
                <input type="text"
                       name={input_name}
                       value={input_value}/>
            </form>
        </div>
    );
}
