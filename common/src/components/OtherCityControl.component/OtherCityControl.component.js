import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';
import type {ComponentType} from 'react';

import {SelectComponent, FormGroupComponent} from '@luft/common';

import messages from './resources/messages';

type Errors = {
    [key: string]: Object
};

type PakistanCity = {
    id: string,
    name: string
};

type Props = {
    as?: ComponentType<{}>,
    selectedOtherCity?: string,
    pakistanCities?: PakistanCity[],
    errors: Errors,
    register: Function
};

export const OtherCityControlComponent = (props: Props) => {
    const {
        as: Component = SelectComponent,
        pakistanCities = [],
        selectedOtherCity,
        errors,
        register,
        ...other
    } = props;

    const {formatMessage} = useIntl();

    const cities = useMemo(
        () => pakistanCities.map(({name}) => ({code: name, name})),
        [pakistanCities]
    );

    return (
        <div className="other-city-control-component">
            <FormGroupComponent {...other}
                                inputAs={Component}
                                isLabelActive={true}
                                options={cities}
                                name="other_city"
                                label={formatMessage(messages.other_city_label)}
                                value={selectedOtherCity}
                                errors={errors}
                                ref={register({required: true})}/>
        </div>
    );
};
