import React, {forwardRef, useMemo} from 'react';
import {isEmpty, noop} from 'lodash';

import {
    SelectComponentLoadable as SelectComponent,
    FormGroupComponent,
    getCountryRegions
} from '@luft/common';
import type {Country} from '@luft/types';

type Props = {
    as?: React.Component,
    countries: Country[],
    selectedCountryCode?: string,
    selectedRegion?: string,
    defaultOption?: string,
    onChange?: (React.SyntheticEvent) => void
};

export const RegionControlComponent = forwardRef((props: Props, ref) => {
    const {
        as: Component = SelectComponent,
        countries,
        selectedCountryCode,
        selectedRegion,
        defaultOption,
        onChange = noop,
        ...other
    } = props;

    const regions = useMemo(() => {
        const regionsData = getCountryRegions(countries, selectedCountryCode);
        const emptyOption = [{id: '', name: defaultOption}];

        return !isEmpty(regionsData) ? regionsData : emptyOption;
    }, [countries, selectedCountryCode, defaultOption]);

    return (
        <div className="region-control-component">
            <FormGroupComponent {...other}
                                inputAs={Component}
                                isLabelActive={true}
                                options={regions}
                                name="region"
                                value={selectedRegion}
                                ref={ref}
                                onChange={onChange}/>
        </div>
    );
});

RegionControlComponent.displayName = 'RegionControlComponent';
