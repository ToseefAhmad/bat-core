import React from 'react';
import {useIntl} from 'react-intl';

import {ButtonComponent, MoneyComponent} from '@luft/common';
import type {Money} from '@luft/types';

import messages from './resources/messages';

type Props = {
    price: Money,
    disclaimer: string,
    onShowOptions: (boolean) => void
};

export function ProductEngravingControlComponent(props: Props) {
    const {
        price,
        disclaimer,
        onShowOptions
    } = props;

    const {formatMessage} = useIntl();

    const isFreePrice = !price || price?.value === 0;

    return (
        <div className="product-engraving-control-component">
            <div className="product-engraving-control-component-top">
                <div className="product-engraving-control-component-icon"/>
                <div className="product-engraving-control-component-content">
                    <div className="product-engraving-control-component-content-title">
                        <span>
                            {formatMessage(messages.title)}
                        </span>
                        {!isFreePrice ? (
                            <span className="product-engraving-control-component-content-price">
                                <MoneyComponent money={price}/>
                            </span>
                        ) : formatMessage(messages.free)}
                    </div>
                    <div className="product-engraving-control-component-content-description">
                        {formatMessage(messages.description)}
                    </div>
                </div>
                <ButtonComponent className="product-engraving-control-component-action"
                                 onClick={() => onShowOptions(true)}
                                 inline={true}
                                 title={formatMessage(messages.action)}
                                 aria-label={formatMessage(messages.action)}
                                 variant="primary-link">
                    {formatMessage(messages.action)}
                </ButtonComponent>
            </div>
            <div className="product-engraving-control-component-disclaimer">
                {disclaimer}
            </div>
        </div>
    );
}
