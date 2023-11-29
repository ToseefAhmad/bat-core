import React, {forwardRef} from 'react';

import {LoaderComponent} from '@luft/common';

import {usePakistanCitiesQuery} from '../../hooks';

type Props = {
    /**
     * Component, used for data presentation
     */
    as: React.Component,
    /**
     * Current selected region code
     */
    selectedRegion?: string,
    /**
     * Flag, which indicates that query should not be performed
     */
    skip?: boolean
};

export const PakistanCitiesContainer = forwardRef((props: Props, ref) => {
    const {
        as: Component,
        selectedRegion,
        skip,
        ...other
    } = props;

    const q = usePakistanCitiesQuery(selectedRegion, {skip});

    const pakistanCities = q?.data?.pk_cities;

    return (
        <>
            {!pakistanCities && <LoaderComponent type="block-overlay"/>}
            <Component {...other}
                       pakistanCities={pakistanCities}
                       ref={ref}/>
        </>
    );
});

PakistanCitiesContainer.displayName = 'PakistanCitiesContainer';
