import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';

import {AccordionComponent} from '@luft/common';

import {VERTICAL, HORIZONTAL} from '../../utils';
import type {EngravedOptionsInfo} from '../../../../types';

import messages from './resources/messages';

type Props = {
    /**
     * Options of engraved product (from cartItem), used when updating the engraved product
     */
    engravingOptions: EngravedOptionsInfo,
    /**
     * Flag, that identifies if an accordion is opened with details information by default
     */
    showDetailsByDefault?: boolean,
    /**
     * Flag, that identifies if details information can be collapsed
     */
    disableDetailsCollapse?: boolean
};

const LIST_IDS = ['psn_is_personalisable', 'psn_front_pattern_id', 'psn_front_icon_id', 'psn_back_text_font_family_id'];

export function ProductEngravingOptionsComponent(
    {
        engravingOptions,
        showDetailsByDefault,
        disableDetailsCollapse
    }: Props) {
    const {formatMessage} = useIntl();
    const optionKeyArray = Object.keys(engravingOptions).filter((option) => !LIST_IDS.includes(option));
    const defaultActiveKey = useMemo(() => (showDetailsByDefault ? 'expandOptions' : null), [showDetailsByDefault]);

    const engravingOption = (option) => {
        if (option === VERTICAL) {
            return formatMessage(messages.vertical);
        }

        if (option === HORIZONTAL) {
            return formatMessage(messages.horizontal);
        }

        return option;
    };

    return (
        <AccordionComponent defaultActiveKey={defaultActiveKey}
                            className="product-engraving-options-component">
            {!disableDetailsCollapse && (
                <AccordionComponent.Toggle eventKey="expandOptions"
                                           className="product-engraving-options-component-toggle">
                    {formatMessage(messages.personalisation)}
                </AccordionComponent.Toggle>
            )}
            {disableDetailsCollapse && (
                <div className="product-engraving-options-component-label">
                    {formatMessage(messages.personalisation)}
                </div>
            )}
            <AccordionComponent.Collapse eventKey="expandOptions"
                                         className="product-engraving-options-component-collapse">
                {optionKeyArray.map(key => !!engravingOptions[key] && (
                    <div key={key}>
                        <span className="product-engraving-options-component-option">
                            {formatMessage(messages[`${key}`])}
                        </span>
                        <span className="product-engraving-options-component-value">
                            {engravingOption(engravingOptions[key])}
                        </span>
                    </div>
                ))}
            </AccordionComponent.Collapse>
        </AccordionComponent>
    );
}
