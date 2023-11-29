import React, {forwardRef} from 'react';

import {LoaderComponent} from '@luft/common';

import {useCityDistributorsQuery} from '../../hooks';

type Props = {
    /**
     * Component, used for data presentation
     */
    as: React.Component,
    /**
     * Current selected region code
     */
    selectedRegion?: string
};

export const CityDistributorsContainer = forwardRef((props: Props, ref) => {
    const {
        as: Component,
        selectedRegion,
        ...other
    } = props;

    const q = useCityDistributorsQuery(selectedRegion, {skip: !selectedRegion});

    const {data: {cityDistributors} = {}, loading} = q;

    return (
        <>
            {loading && <LoaderComponent type="block-overlay"/>}
            <Component {...other}
                       cityDistributors={cityDistributors}
                       selectedRegion={selectedRegion}
                       ref={ref}/>
        </>
    );
});

CityDistributorsContainer.displayName = 'CityDistributorsContainer';
