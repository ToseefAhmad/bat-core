import React from 'react';
import {
    noop,
    forIn,
    groupBy
} from 'lodash';
import {useIntl} from 'react-intl';
import classnames from 'classnames';

import {RadioComponent, AccordionComponent} from '@luft/common';
import type {EspayPaymentItem} from '@luft/types';

import messages from './resources/messages';

type Props = {
    /**
     * Espay methods
     */
    methods: EspayPaymentItem[],
    /**
     * Callback, when Espay payment method was selected
     */
    onSelectMethod?: Function,
    /**
     * Espay selected method
     */
    paymentMethod?: EspayPaymentItem
};

export function EspayMethodsComponent({methods, onSelectMethod = noop, paymentMethod}: Props) {
    const {formatMessage} = useIntl();

    const groupedMethods = [];
    forIn(groupBy(methods, (i) => i.category), (val, key) => {
        groupedMethods.push({category: key, methods: val});
    });

    const getLabel = (method) => (
        <>
            <img src={`https://kit.espay.id/images/products/${method.product_code}.png`}
                 alt={method.product_code}
                 className="espay-methods-component-list-item-icon"/>
            {method.product_name}
        </>
    );

    return (
        <div className="espay-methods-component">
            {methods?.length ? (
                <>
                    <div className="espay-methods-component-title">
                        {formatMessage(messages.choose_method)}
                    </div>
                    {groupedMethods.map(group => (
                        <AccordionComponent className={classnames({'espay-methods-component-default': !group.category})}
                                            key={group.category}>
                            <AccordionComponent.Toggle className="espay-methods-component-list-title"
                                                       eventKey={group.category}>
                                {group.category || formatMessage(messages.default_category_title)}
                            </AccordionComponent.Toggle>
                            <AccordionComponent.Collapse eventKey={group.category}>
                                <div className="espay-methods-component-list">
                                    {group.methods.map(method => (
                                        <div className="espay-methods-component-list-item"
                                             key={method.product_code}>
                                            <RadioComponent className="espay-methods-component-list-item-radio"
                                                            name="methods-group"
                                                            checked={paymentMethod === method}
                                                            onChange={() => onSelectMethod(method)}
                                                            label={getLabel(method)}/>
                                        </div>
                                    ))}
                                </div>
                            </AccordionComponent.Collapse>
                        </AccordionComponent>
                    ))}
                </>
            ) : (
                <div className="espay-methods-component-empty">
                    {formatMessage(messages.no_methods)}
                </div>
            )}
        </div>
    );
}
