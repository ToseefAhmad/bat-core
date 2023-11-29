import React, {forwardRef, useMemo} from 'react';
import {isEmpty, noop} from 'lodash';

import {SelectComponentLoadable as SelectComponent, FormGroupComponent} from '@luft/common';
import type {Country} from '@luft/types';

import {getCountryRegionCities} from '../../util';

type Props = {
    as?: React.Component,
    countries: Country[],
    selectedCountryCode?: string,
    selectedRegion?: string,
    selectedCity?: string,
    defaultOption?: string,
    onChange?: (React.SyntheticEvent) => void
};

export const CityControlComponent = forwardRef((props: Props, ref) => {
    const {
        as: Component = SelectComponent,
        countries,
        selectedCountryCode,
        selectedRegion,
        selectedCity,
        defaultOption,
        onChange = noop,
        ...other
    } = props;

    const cities = useMemo(() => {
        const citiesData = getCountryRegionCities(countries, selectedCountryCode, selectedRegion);
        const emptyOption = [{code: '', name: defaultOption}];

        return !isEmpty(citiesData) ? citiesData : emptyOption;
    }, [countries, selectedCountryCode, selectedRegion, defaultOption]);

    return (
        <div className="city-control-component">
            <FormGroupComponent {...other}
                                inputAs={Component}
                                isLabelActive={true}
                                options={cities}
                                name="city"
                                value={selectedCity}
                                ref={ref}
                                onChange={onChange}/>
        </div>
    );
});

CityControlComponent.displayName = 'CityControlComponent';
