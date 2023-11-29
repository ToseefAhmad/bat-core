import React, {forwardRef, useMemo} from 'react';
import {useIntl} from 'react-intl';

import {SelectComponent} from '@luft/common';

import messages from './resources/messages';

type Props = {
    hasAdditionalOption?: boolean
}

export const GenderSelectComponent = forwardRef((props: Props, ref) => {
    const {
        hasAdditionalOption,
        ...other
    } = props;

    const {formatMessage} = useIntl();

    const options = useMemo(() => {
        const allOptions = [
            {
                code: 'MALE',
                name: formatMessage(messages.male)
            },
            {
                code: 'FEMALE',
                name: formatMessage(messages.female)
            }
        ];

        if (hasAdditionalOption) {
            allOptions.push(
                {
                    code: 'NOT_SPECIFIED',
                    name: formatMessage(messages.not_specified)
                }
            );
        }

        return allOptions;
    }, [hasAdditionalOption, formatMessage]);

    return (
        <SelectComponent {...other}
                         options={options}
                         ref={ref}/>
    );
});

GenderSelectComponent.displayName = 'GenderSelectComponent';
