import React, {
    useState,
    useMemo,
    useEffect
} from 'react';
import {useIntl} from 'react-intl';
import {noop} from 'lodash';
import classnames from 'classnames';

import {ButtonComponent, ImageComponent} from '@luft/common';

import {useGoogleMapContext} from '../../hooks';
import messages from './resources/messages';
import type {StoreType} from '../../../../types';

type Store = {
    latitude: number,
    longitude: number,
    name: string,
    city: string,
    adr1: string,
    adr2: string,
    adr3: string,
    store_type: StoreType
}

type Props = {
    /**
     * Flag which indicates that card is selected
     */
    isActiveStoreCard: boolean,
     /**
     * Store location information
     */
    store: Store,
    /**
     * Function for setting active card
     */
    onSetActiveCard: Function,
     /**
     * Function for getting directions using Google Map
     */
    onGetDirections: Function,
    /**
     * Callback that is triggered when the store is clicked
     */
    onClickStore: Function
}

const FACTOR_METER_TO_MILE = 0.000621371;

export function StoreCardComponent(props: Props) {
    const {formatMessage} = useIntl();

    const {
        store,
        isActiveStoreCard,
        onSetActiveCard = noop,
        onGetDirections,
        onClickStore
    } = props;

    const {googleMap, onOpenInfoWindow, onGetCurrentPosition} = useGoogleMapContext();
    const [currentPosition, setCurrentPosition] = useState({});

    useEffect(() => {
        onGetCurrentPosition(setCurrentPosition);
    }, [store]);

    const distance = useMemo(() => {
        if (
            !googleMap?.maps?.geometry
            || !currentPosition?.lat
            || !currentPosition?.lng
            || !store?.latitude
            || !store?.longitude
        ) {
            return null;
        }

        const latLngA = new googleMap.maps.LatLng(currentPosition?.lat, currentPosition?.lng);
        const latLngB = new googleMap.maps.LatLng(store?.latitude, store?.longitude);

        const distanceInMeters = googleMap.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
        const distanceInMiles = distanceInMeters * FACTOR_METER_TO_MILE;

        return `${distanceInMiles.toFixed(0)} ${formatMessage(messages.mile)}`;
    }, [googleMap, currentPosition, store]);

    const addressStore = [store?.adr1, store?.adr2, store?.adr3].filter(Boolean).join(',');
    const hasTitleLogo = !!store?.store_type?.inactive_marker_logo;
    const contentClass = classnames('store-card-component-info-window-title',
        {'store-card-component-info-window-title-logo': hasTitleLogo});

    const handleOpenInfoWindow = () => {
        const content = `
            <p class="${contentClass}"
               style="background-image: url(${store?.store_type?.inactive_marker_logo})">
                ${store?.name}
            </p>
            <p class="store-card-component-info-window-address">${addressStore}<p>
        `;

        onOpenInfoWindow(store, content);
        onSetActiveCard();
        if (onClickStore) onClickStore(distance);
    };

    const storeCardClassNames = classnames('store-card-component', {
        'store-card-component-active': isActiveStoreCard
    });

    return (
        <div className={storeCardClassNames}
             role="button"
             tabIndex="0"
             onClick={handleOpenInfoWindow}
             onKeyPress={noop}>
            <div className="store-card-component-header">
                <div className="store-card-component-header-name">
                    {!!store?.store_type.inactive_marker_logo && (
                        <ImageComponent className="store-card-component-header-image"
                                        image={{url: store.store_type.inactive_marker_logo}}/>
                    )}
                    {store?.name}
                </div>
                <div className="store-card-component-header-distance">
                    {distance}
                </div>
            </div>
            <div className="store-card-component-address">
                {addressStore}
            </div>
            <div className="store-card-component-footer">
                <ButtonComponent type="button"
                                 title={formatMessage(messages.button_title)}
                                 variant="thumbnail"
                                 onClick={() => onGetDirections(store.latitude, store.longitude)}>
                    <span className="store-card-component-footer-title">
                        {formatMessage(messages.button_title)}
                    </span>
                </ButtonComponent>
            </div>
        </div>
    );
}
