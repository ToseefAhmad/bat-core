import React, {forwardRef} from 'react';

import {CountryControlComponent, LoaderComponent} from '@luft/common';
import {useCountriesQuery} from '@luft/common/src/hooks';

import COUNTRIES_QUERY from '../../graphql/queries/Countries.query.graphql';

type Props = {
    as?: React.Component
};

export const CountryContainer = forwardRef((props: Props, ref) => {
    const {
        as: Component = CountryControlComponent,
        ...other
    } = props;

    const {data: {countries} = {}} = useCountriesQuery({}, COUNTRIES_QUERY);

    return (
        <>
            {!countries && <LoaderComponent type="block-overlay"/>}
            <Component {...other}
                       countries={countries}
                       ref={ref}/>
        </>
    );
});

CountryContainer.displayName = 'CountryContainer';
