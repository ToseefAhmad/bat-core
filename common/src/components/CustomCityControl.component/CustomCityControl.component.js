import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';

import {SelectComponent, FormGroupComponent} from '@luft/common';

import {PakistanCitiesContainer} from '../PakistanCities.container';
import {OtherCityControlComponent} from '../OtherCityControl.component';
import messages from './resources/messages';

type Errors = {
    [key: string]: Object
};

type CityDistributor = {
    email: string,
    city: string
};

type Props = {
    as?: React.Component,
    cityDistributors?: CityDistributor[],
    selectedRegion?: string,
    selectedCity?: string,
    controlId: string,
    defaultOption?: string,
    errors: Errors,
    register: (Object) => void,
    onChange?: (React.SyntheticEvent) => void
};

const OTHER_CITY_CODE = 'other';

export const CustomCityControlComponent = (props: Props) => {
    const {
        as: Component = SelectComponent,
        cityDistributors = [],
        selectedRegion,
        selectedCity,
        defaultOption,
        controlId,
        errors,
        register,
        onChange,
        ...other
    } = props;

    const {formatMessage} = useIntl();

    const emptyOption = useMemo(() => [{code: '', name: defaultOption}], [defaultOption]);

    const otherOption = useMemo(
        () => [{code: OTHER_CITY_CODE, name: formatMessage(messages.other_city_option)}],
        [formatMessage]
    );

    const citiesData = useMemo(
        () => cityDistributors.map(({city}) => ({code: city, name: city})).concat(otherOption),
        [cityDistributors, otherOption]
    );

    const cities = selectedRegion ? citiesData : emptyOption;
    const isOtherCityCode = selectedCity === OTHER_CITY_CODE;
    // If selected city is not among the city distributors list, then it's `other_city`
    const isNotCityDistributor = !!selectedCity && cityDistributors.every(({city}) => city !== selectedCity);
    const isSelectedOtherOption = isOtherCityCode || isNotCityDistributor;
    // `city` and `other_city` could share the same value (only `city` is stored on the BE)
    const selectedOtherCity = isNotCityDistributor ? selectedCity : '';
    const value = isSelectedOtherOption ? OTHER_CITY_CODE : selectedCity;

    return (
        <div className="custom-city-control-component">
            <FormGroupComponent {...other}
                                inputAs={Component}
                                controlId={controlId}
                                isLabelActive={true}
                                options={cities}
                                name="city"
                                value={value}
                                errors={errors}
                                ref={register({required: !isSelectedOtherOption})}
                                onChange={onChange}/>

            {isSelectedOtherOption && (
                <PakistanCitiesContainer {...other}
                                         as={OtherCityControlComponent}
                                         controlId={`${controlId}Other`}
                                         selectedRegion={selectedRegion}
                                         selectedOtherCity={selectedOtherCity}
                                         errors={errors}
                                         register={register}
                                         skip={!cityDistributors || !selectedRegion}
                                         onChange={onChange}/>
            )}
        </div>
    );
};
