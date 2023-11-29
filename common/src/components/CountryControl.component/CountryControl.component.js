import React, {forwardRef} from 'react';

import {FormGroupComponent} from '@luft/common';
import type {Country} from '@luft/types';

import {SelectComponentLoadable as SelectComponent} from '../Select.component';

type Props = {
    /**
     * Array of countries
     */
    countries?: Country[],
    /**
     * Code of currently selected country
     */
    selectedCountryCode?: string,
    /**
     * callback on country selection change
     */
    onChange?: (React.SyntheticEvent) => void
};

/**
 * Component, that represents list of countries
 */
export const CountryControlComponent = forwardRef((
    {
        countries,
        selectedCountryCode,
        onChange,
        ...other
    }: Props, ref) => (
        <div className="country-control-component">
            <FormGroupComponent {...other}
                                inputAs={SelectComponent}
                                options={countries}
                                onChange={onChange}
                                value={selectedCountryCode}
                                ref={ref}/>
        </div>
));

CountryControlComponent.displayName = 'CountryControlComponent';
