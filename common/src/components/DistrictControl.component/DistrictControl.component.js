import React, {forwardRef, useMemo} from 'react';
import {isEmpty, noop} from 'lodash';
import type {ComponentType} from 'react';

import {SelectComponent, FormGroupComponent} from '@luft/common';
import type {Country} from '@luft/types';

import {getCountryRegionCityDistricts} from '../../util';

type Props = {
    as?: ComponentType<{}>,
    countries: Country[],
    selectedCountryCode?: string,
    selectedRegion?: string,
    selectedCity: string,
    selectedDistrict: string,
    defaultOption?: string,
    onChange?: Function
};

export const DistrictControlComponent = forwardRef((props: Props, ref) => {
    const {
        as: Component = SelectComponent,
        countries,
        selectedCountryCode,
        selectedRegion,
        selectedCity,
        selectedDistrict,
        defaultOption,
        onChange = noop,
        ...other
    } = props;

    const districts = useMemo(() => {
        const districtsData = getCountryRegionCityDistricts(
            countries,
            selectedCountryCode,
            selectedRegion,
            selectedCity
        );
        const emptyOption = [{code: '', name: defaultOption}];

        return !isEmpty(districtsData) ? districtsData : emptyOption;
    }, [countries, selectedCountryCode, selectedRegion, selectedCity, defaultOption]);

    return (
        <div className="district-control-component">
            <FormGroupComponent {...other}
                                inputAs={Component}
                                isLabelActive={true}
                                options={districts}
                                name="district"
                                value={selectedDistrict}
                                ref={ref}
                                onChange={onChange}/>
        </div>
    );
});

DistrictControlComponent.displayName = 'DistrictControlComponent';
