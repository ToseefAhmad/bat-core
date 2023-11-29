import React, {useMemo} from 'react';
import type {ComponentType} from 'react';

import {GoogleMapProviderComponent} from '../GoogleMapProvider.component';
import {useStoreLocatorSettingsQuery} from '../../hooks';

export type Config = {
    /**
     * Flag, which indicates that Google Map should be in black/white colors
     */
    isBlackWhite: boolean,
    /**
     * Map center coordinates
     */
    center: {
        lat: number,
        lng: number
    },
    /**
     * Map zoom level
     */
    zoom: number,
    /**
     * Min map zoom level
     */
    minZoom: number,
    /**
     * Max map zoom level
     */
    maxZoom: number
};

export type Clusters = {
    /**
     * Cluster max zoom level
     */
    maxZoom: number,
    /**
     * Flag, which indicates that click on cluster should zoom the map
     */
    isZoomedOnClick: boolean
};

export type Settings = {
    /**
     * Google Map unique api key
     */
    apiKey?: string,
    /**
     * Icon clusters settings
     */
    clusters?: Clusters,
    /**
     * Google Map configuration
     */
    config?: Config
};

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: ComponentType<{}>,
    /**
     * Children element(s)
     */
    children: React.ReactNode
};

export function GoogleMapProviderContainer({
    as: Component = GoogleMapProviderComponent,
    children,
    ...other
}: Props) {
    const {data} = useStoreLocatorSettingsQuery();

    const settings: Settings = useMemo(() => {
        if (!data) return;

        const {
            sl_api_key,
            sl_blackwhite,
            sl_center_lat,
            sl_center_lng,
            sl_zoom,
            sl_min_zoom,
            sl_max_zoom,
            sl_clustering_max_zoom,
            sl_clustering_zoom_on_click,
            sl_gm_enabled
        } = data?.storeConfig || {};

        return {
            apiKey: sl_api_key,
            isGmEnabled: sl_gm_enabled,
            clusters: {
                maxZoom: sl_clustering_max_zoom,
                isZoomedOnClick: sl_clustering_zoom_on_click
            },
            config: {
                isBlackWhite: sl_blackwhite,
                center: {
                    lat: sl_center_lat,
                    lng: sl_center_lng
                },
                zoom: sl_zoom,
                minZoom: sl_min_zoom,
                maxZoom: sl_max_zoom
            }
        };
    }, [data]);

    return (
        <Component {...other}
                   settings={settings}>
            {children}
        </Component>
    );
}
