import React, {useEffect, useMemo} from 'react';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import type {ComponentType, RefObject} from 'react';
import classnames from 'classnames';

import {StoreLocatorMapComponent} from '../StoreLocatorMap.component';
import {useStoreLocationsQuery, useGoogleMapContext} from '../../hooks';

type Icons = {
    active: string,
    inactive: string
};

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: ComponentType<{}>,
    /**
     * Object which contains active and inactive store icons
     */
    storeIcons: Icons,
    /**
     * Ref to location map
     */
    locationMapRef?: RefObject,
    /**
     * Cluster icon sizes
     */
    clusterIconSizes?: number[],
    /**
     * Function return icon path with index
     */
    getClusterIconUrl: (index: number) => string
};

const DEFAULT_CLUSTER_ICON_SIZES = [46, 60, 80];
const CLUSTER = {
    sm: 10,
    md: 20
};
const MARKER_ICON_WIDTH = 40;
const MARKER_ICON_HEIGHT = 54;

export function StoreLocatorMapContainer(props: Props) {
    const {
        as: Component = StoreLocatorMapComponent,
        storeIcons,
        locationMapRef,
        clusterIconSizes = DEFAULT_CLUSTER_ICON_SIZES,
        getClusterIconUrl,
        ...other
    } = props;

    const {map, infoWindow, googleMap, clusters, setMarkers, onSetIcon, selectedStoreTypes} = useGoogleMapContext();
    const {data} = useStoreLocationsQuery();

    const storeLocations = data?.StoreLocations;

    const storeList = useMemo(() => {
        const storeNames = selectedStoreTypes.map(type => type.store_name);

        if (!storeNames.length || !storeLocations) return storeLocations;

        return storeLocations.filter(store => storeNames.includes(store.store_type.store_name));
    }, [selectedStoreTypes, storeLocations]);

    useEffect(() => {
        if (!storeList || !googleMap || !map || !storeIcons || !clusters) return;

        const mapMarkers = storeList.map((storeLocation) => {
            const {inactive_marker_logo, active_marker_logo} = storeLocation.store_type || {};
            const markerIcon = {
                url: inactive_marker_logo || storeIcons.inactive,
                scaledSize: new googleMap.maps.Size(MARKER_ICON_WIDTH, MARKER_ICON_HEIGHT)
            };
            const markerIconActive = {
                url: active_marker_logo || storeIcons.active,
                scaledSize: new googleMap.maps.Size(MARKER_ICON_WIDTH, MARKER_ICON_HEIGHT)
            };
            const marker = new googleMap.maps.Marker({
                position: {lat: storeLocation?.latitude, lng: storeLocation?.longitude},
                map,
                icon: markerIcon,
                activeIcon: markerIconActive,
                inactiveIcon: markerIcon
            });

            const addressStore = [storeLocation?.adr1, storeLocation?.adr2, storeLocation?.adr3].filter(Boolean).join(',');
            const hasTitleLogo = !!storeLocation.store_type?.inactive_marker_logo;
            const contentClass = classnames('store-locator-map-component-info-window-title',
                {'store-locator-map-component-info-window-title-logo': hasTitleLogo});
            const content = `
                <p class="${contentClass}"
                   style="background-image: url(${storeLocation.store_type?.inactive_marker_logo})">
                    ${storeLocation.name}
                </p>
                <p class="store-locator-map-component-info-window-address">${addressStore}<p>
            `;

            marker.addListener('click', () => {
                infoWindow.setContent(content);
                infoWindow.open(map, marker);
                onSetIcon(marker, mapMarkers);
            });

            return marker;
        });

        // This function determines the number of stores for each cluster
        const calculator = (markers) => {
            let index = 0;
            const count = markers.length;

            if (count < CLUSTER.sm) {
                index = 1;
            } else if (count < CLUSTER.md) {
                index = 2;
            } else {
                index = 3;
            }

            return {
                url: getClusterIconUrl(index),
                text: count.toString(),
                index,
                title: ''
            };
        };

        // eslint-disable-next-line no-new
        new MarkerClusterer(map, mapMarkers, {
            calculator,
            imageSizes: clusterIconSizes,
            clusterClass: 'store-locator-map-component-cluster',
            maxZoom: clusters.maxZoom,
            zoomOnClick: clusters.isZoomedOnClick
        });

        setMarkers(mapMarkers);
    }, [
        storeList,
        googleMap,
        map,
        storeIcons,
        clusterIconSizes
    ]);

    return (
        <Component {...other}
                   locationMapRef={locationMapRef}/>
    );
}
