import React, {
    useState,
    useMemo,
    useEffect,
    useCallback
} from 'react';
import {noop, isUndefined} from 'lodash';
import GoogleMapsApiLoader from 'google-maps-api-loader';
import type {ComponentType, RefObject} from 'react';

import {GoogleMapContext} from '../../contexts';
import blackWhiteMapStyles from './resources/mapStyles.json';
import type {Settings} from '../GoogleMapProvider.container';

type Props = {
    /**
     * Ref to location Map
     */
    locationMapRef: RefObject,
    /**
     * Google Map settings
     */
    settings?: Settings,
    /**
     * Used google libraries
     */
    libraries?: string[],
    /**
     * Children component
     */
    children?: ComponentType<{}>
};

const DEFAULT_LIBRARIES = ['places', 'geometry'];

export function GoogleMapProviderComponent({
    locationMapRef,
    settings = {},
    libraries = DEFAULT_LIBRARIES,
    children
}: Props) {
    const {
        apiKey,
        config,
        clusters,
        isGmEnabled
    } = settings;
    const [map, setMap] = useState(null);
    const [infoWindow, setInfoWindow] = useState(null);
    const [googleMap, setGoogleMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [selectedStoreTypes, setSelectedStoreTypes] = useState([]);

    const handleGetCurrentPosition = useCallback((onSuccess = noop, onError = () => map?.getCenter()) => {
        if (!navigator.geolocation) {
            return onError(new Error('Browser does not support Geolocation'));
        }

        navigator.geolocation.getCurrentPosition(({coords}) => {
            const position = {
                lat: coords.latitude,
                lng: coords.longitude
            };

            onSuccess(position);
        });
    }, []);

    const handleSetIcon = useCallback((marker, mapMarkers = markers) => {
        mapMarkers.forEach((mapMarker) => {
            mapMarker.setIcon(mapMarker.inactiveIcon);
        });
        // Not to have active marker over inactive need to delete marker first and then to set it up once again
        // with active icon
        const markerMap = marker.map;
        markerMap.icon = marker.activeIcon;
        marker.setMap(null);
        marker.setIcon(marker.activeIcon);
        marker.setMap(markerMap);
    }, [markers]);

    const handleOpenInfoWindow = useCallback(({latitude, longitude}, content) => {
        if (!markers) return;

        const marker = markers.find(({position}) => position.lat() === latitude && position.lng() === longitude);

        infoWindow.setContent(content);
        infoWindow.open(map, marker);
        handleSetIcon(marker);
    }, [markers, infoWindow, map]);

    useEffect(() => {
        if (isUndefined(window) || !apiKey) return;

        GoogleMapsApiLoader({apiKey, libraries}).then(google => {
            setGoogleMap(google);
        });
    }, [apiKey, libraries]);

    useEffect(() => {
        if (!googleMap || !config || !locationMapRef.current) return;

        const {isBlackWhite, ...otherConfig} = config;

        const map = new googleMap.maps.Map(locationMapRef.current, {
            ...otherConfig,
            styles: isBlackWhite ? blackWhiteMapStyles : undefined
        });
        const infoWindow = new googleMap.maps.InfoWindow();

        setMap(map);
        setInfoWindow(infoWindow);
    }, [googleMap, config, selectedStoreTypes]);

    const contextValue = useMemo(() => ({
        map,
        infoWindow,
        googleMap,
        clusters,
        selectedStoreTypes,
        isGmEnabled,
        setSelectedStoreTypes,
        setMarkers,
        onOpenInfoWindow: handleOpenInfoWindow,
        onGetCurrentPosition: handleGetCurrentPosition,
        onSetIcon: handleSetIcon
    }), [
        map,
        infoWindow,
        googleMap,
        clusters,
        selectedStoreTypes,
        isGmEnabled,
        setSelectedStoreTypes,
        setMarkers,
        handleOpenInfoWindow,
        handleGetCurrentPosition,
        handleSetIcon
    ]);

    return (
        <GoogleMapContext.Provider value={contextValue}>
            {children}
        </GoogleMapContext.Provider>
    );
}
