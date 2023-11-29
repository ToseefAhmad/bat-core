import React from 'react';
import type {RefObject} from 'react';

type Props = {
    locationMapRef?: RefObject
}

export function StoreLocatorMapComponent(props: Props) {
    const {locationMapRef, ...other} = props;

    return (
        <div {...other}
             className="store-locator-map-component"
             ref={locationMapRef}/>
    );
}
