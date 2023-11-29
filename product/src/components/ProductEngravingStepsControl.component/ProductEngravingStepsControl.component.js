import React from 'react';
import {useIntl} from 'react-intl';
import classnames from 'classnames';

import {ButtonComponent} from '@luft/common';
import {useProductState} from '@luft/product';

import messages from './resources/messages';

type Props = {
    step?: number,
    onBack: () => void,
    onCancel: () => void
};

export function ProductEngravingStepsControlComponent(props: Props) {
    const {
        step,
        onBack,
        onCancel
    } = props;

    const {formatMessage} = useIntl();
    const [selectedEngravingOptions = []] = useProductState('selectedEngravingOptions');

    const items = [
        {
            step: 1,
            title: formatMessage(messages.front_step)
        },
        {
            step: 2,
            title: formatMessage(messages.back_step)
        },
        {
            step: 3,
            title: formatMessage(messages.summary_step)
        }
    ];

    return (
        <div className="product-engraving-steps-control-component">
            <ul className="product-engraving-steps-control-component-list">
                {items.map(item => (
                    <li className={classnames('product-engraving-steps-control-component-item',
                        {active: item?.step === step})}
                        key={item.step}>
                        {item.title}
                    </li>
                ))}
            </ul>

            {selectedEngravingOptions?.length < 2 && (
                <div className="product-engraving-steps-control-component-actions">
                    <div>
                        {step !== 1 && (
                            <ButtonComponent className="product-engraving-steps-control-component-actions-back"
                                             onClick={onBack}
                                             inline={true}
                                             title={formatMessage(messages.back)}
                                             aria-label={formatMessage(messages.back)}
                                             variant="primary-link">
                                {formatMessage(messages.back)}
                            </ButtonComponent>
                        )}
                    </div>
                    <ButtonComponent className="product-engraving-steps-control-component-actions-cancel"
                                     onClick={onCancel}
                                     inline={true}
                                     title={formatMessage(messages.cancel)}
                                     aria-label={formatMessage(messages.cancel)}
                                     variant="primary-link">
                        {formatMessage(messages.cancel)}
                    </ButtonComponent>
                </div>
            )}
        </div>
    );
}
