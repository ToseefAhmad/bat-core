/* eslint-disable no-unused-vars */
import {createContext} from 'react';

type Coordinates = {
    latitude: number,
    longitude: number
};

export const GoogleMapContext = createContext({
    /**
     * Initialized map
     */
    map: {},
    /**
     * Content in a popup window above the map
     */
    infoWindow: {},
    /**
     * Object for initialization map
     */
    googleMap: {},
    /**
     * Icons cluster settings
     */
    clusters: {
        maxZoom: 1,
        isZoomedOnClick: true
    },
    /**
     * Function return markers (locations on the map)
     */
    setMarkers: (options) => undefined,
    /**
     * Function displays content in a popup window above the map
     */
    onOpenInfoWindow: (coordinates: Coordinates, content: string) => undefined,
    /**
     * Function calculate coordinates and use it for callback
     */
    onGetCurrentPosition: (onSuccess: Function, onError: Function) => undefined,
    /**
     * Function to change icons
     */
    onSetIcon: (marker: Object, mapMarkers: Array) => undefined,
    selectedStoreTypes: [],
    setSelectedStoreTypes: (types: Array) => undefined
});
