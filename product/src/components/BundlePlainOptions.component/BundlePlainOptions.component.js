import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';

import {AccordionComponent} from '@luft/common';
import type {BundleInfo} from '@luft/types';

import {ProductContext, useProductState} from '@luft/product';

import messages from './resources/messages';

type Props = {
    /**
     *  Computed bundle information in cart, order or other place
     *
     *  **Default value from ProductContext**
     */
    bundleInfo?: BundleInfo | ProductContext.productState.bundleInfo,
    /**
     * Flag, that identifies if an accordion is opened with details information by default
     */
    showDetailsByDefault?: boolean,
    /**
     * Flag, that identifies if details information can be collapsed
     */
    disableDetailsCollapse?: boolean
}

export function BundlePlainOptionsComponent({bundleInfo, showDetailsByDefault, disableDetailsCollapse}: Props) {
    const [$bundleInfo] = useProductState('bundleInfo', bundleInfo);
    const {formatMessage} = useIntl();
    const defaultActiveKey = useMemo(() => (showDetailsByDefault ? 'expandOptions' : ''), [showDetailsByDefault]);

    return !!$bundleInfo?.selected_options?.length && (
        <AccordionComponent defaultActiveKey={defaultActiveKey}
                            className="bundle-plain-options-component">
            {!disableDetailsCollapse && (
                <AccordionComponent.Toggle eventKey="expandOptions"
                                           className="bundle-plain-options-component-toggle">
                    {formatMessage(messages.includes)}
                </AccordionComponent.Toggle>
            )}

            <AccordionComponent.Collapse eventKey="expandOptions"
                                         className="bundle-plain-options-component-collapse">
                {$bundleInfo.selected_options.map(option => option.values.map(value => (
                    <div className="bundle-plain-options-component-item"
                         key={value.id}>
                        <span className="bundle-plain-options-component-item-option">
                            {value.label}
                        </span>
                        <span className="bundle-plain-options-component-item-qty">
                            {`x${value.quantity}`}
                        </span>
                    </div>
                )))}
            </AccordionComponent.Collapse>
        </AccordionComponent>
    );
}
