import React, {
    useEffect, useState, createRef
} from 'react';
import Script from 'react-load-script';
import {useIntl} from 'react-intl';
import {isEmpty} from 'lodash';
import {ErrorComponent} from '@luft/common';
import type {EspayPaymentItem} from '@luft/types';
import messages from './resources/messages';

type Props = {
    config: any,
    espayOrderId?: String,
    paymentMethod?: EspayPaymentItem
};

export function EspayComponent({espayOrderId, config, paymentMethod}: Props) {
    const [Espay, setEspay] = useState();
    const [scriptError, setScriptError] = useState();
    const {formatMessage} = useIntl();
    const iframeRef = createRef();

    useEffect(() => {
        if (!Espay || isEmpty(config)) {
            return;
        }
        const data = {
            display: 'select',
            paymentId: espayOrderId,
            bankCode: paymentMethod.bank_code,
            bankProduct: paymentMethod.product_code,
            key: config.key,
            backUrl: config.back_url,
        };
        const sgoPlusIframe = iframeRef.current;

        if (sgoPlusIframe !== null) {
            sgoPlusIframe.src = window.SGOSignature.getIframeURL(data);
        }
        window.SGOSignature.receiveForm();
    }, [Espay, config]);

    if (isEmpty(config) && !espayOrderId) {
        return null;
    }

    return (
        <div className="espay-component">
            <h1 className="espay-component-title">
                {formatMessage(messages.espay_title)}
            </h1>
            <div className="espay-component-note">
                <div>
                    {formatMessage(messages.espay_redirect)}
                </div>
                <div>
                    {formatMessage(messages.espay_order, {order_id: espayOrderId})}
                </div>
                <div>
                    {formatMessage(messages.espay_note)}
                </div>
            </div>
            {scriptError && <ErrorComponent error={scriptError}/>}
            <iframe id="sgoplus-iframe"
                    sandbox="allow-same-origin allow-scripts allow-top-navigation"
                    title="sgoplus-iframe"
                    src=""
                    scrolling="no"
                    allowTransparency="true"
                    frameBorder="0"
                    height="0"
                    width="0"
                    ref={iframeRef}/>
            <Script url={config.espay_url}
                    onError={setScriptError}
                    onLoad={() => {
                        setEspay(true);
                    }}/>
        </div>
    );
}
