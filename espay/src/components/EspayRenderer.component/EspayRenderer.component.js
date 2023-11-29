import React from 'react';
import {useIntl} from 'react-intl';
import {isEmpty} from 'lodash';

import {ButtonComponent, LoaderComponent} from '@luft/common';
import type {PaymentMethod} from '@luft/types';

import {EspayMethodsContainer} from '../EspayMethods.container';
import messages from './resources/messages';

type Props = {
    paymentMethod?: PaymentMethod,
    onSave?: Function,
    onSelectMethod?: Function,
    loading?: boolean,
    viewerKtpId?: string,
    customerKtpId?: string,
    validateKtp?: Function,
    shouldValidateKtp?: boolean
};

export function EspayRendererComponent(props: Props) {
    const {
        paymentMethod,
        onSave,
        onSelectMethod,
        loading,
        viewerKtpId,
        customerKtpId,
        validateKtp,
        shouldValidateKtp = true
    } = props;

    const {formatMessage} = useIntl();
    const handleOnSave = () => {
        if (!viewerKtpId && !customerKtpId && shouldValidateKtp) {
            validateKtp();
        } else {
            onSave();
        }
    };

    return (
        <div className="espay-renderer-component">
            {loading ? (
                <LoaderComponent/>
            ) : (
                <>
                    <EspayMethodsContainer onSelectMethod={onSelectMethod}
                                           paymentMethod={paymentMethod}/>

                    <ButtonComponent onClick={handleOnSave}
                                     disabled={isEmpty(paymentMethod)}
                                     title={formatMessage(messages.create_order_title)}>
                        {formatMessage(messages.create_order_title)}
                    </ButtonComponent>
                </>
            )
            }
        </div>
    );
}
