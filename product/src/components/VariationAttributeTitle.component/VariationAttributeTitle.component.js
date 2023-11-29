import React from 'react';
import {useIntl} from 'react-intl';

import messages from './resources/messages';

type Props = {
    name: string,
    valueName: string
};

export function VariationAttributeTitleComponent(props: Props) {
    const {
        name,
        valueName
    } = props;

    const {formatMessage} = useIntl();

    return (
        <h4 className="variation-attribute-title-component">
            <span className="variation-attribute-title-component-name">
                {formatMessage(messages.choose)}
                {' '}
                {name}
            </span>
            {valueName && (
                <span className="variation-attribute-title-component-value-name">
                    {valueName}
                </span>
            )}
        </h4>
    );
}
