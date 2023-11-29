import React, {useEffect, useMemo} from 'react';
import type {ComponentType} from 'react';

import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent
} from '@luft/common';

import {StoreCardListComponent} from '../StoreCardList.component';
import {useStoreLocationsQuery} from '../../hooks';
import {trackStoreLocatorSearch, trackStoreLocatorClick} from '../../../../data-layer';
import type {StoreType, StoreLocation} from '../../../../types';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
    */
    as?: ComponentType<{}>,
    /**
     * Searched address
     */
    searchValue: string,
    /**
     * An array of selected store types
     */
    selectedTypes?: StoreType[],
     /**
     * Represent for loading view
     */
    loadingAs?: ComponentType<{}>,
    /**
     * Represent for error view
     */
    errorAs?: ComponentType<{}>,
    /**
     * Represent for no cache view
     */
    noCacheAs?: ComponentType<{}>,
    /**
     * Await result
     */
    awaitResult?: boolean,
    /**
     * Callback that should be called when a list of stores was loaded
     */
    onLoadStores?: (stores: StoreLocation[]) => void
}

export function StoreCardListContainer(props: Props) {
    const {
        as: Component = StoreCardListComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        searchValue,
        selectedTypes,
        onLoadStores,
        ...other
    } = props;

    const q = useStoreLocationsQuery({onCompleted: (data) => onLoadStores(data.StoreLocations)});

    const storeLocations = q?.data?.StoreLocations || [];
    const stores = storeLocations.filter(storeLocation => storeLocation.city === searchValue);
    const filteredStores = useMemo(() => {
        const storeNames = selectedTypes.map(type => type.store_name);

        if (!storeNames.length || !stores) return stores;

        return stores.filter(store => storeNames.includes(store.store_type.store_name));
    }, [selectedTypes, stores]);

    useEffect(() => {
        if (!searchValue) return;

        trackStoreLocatorSearch(searchValue, stores?.length);
    }, [searchValue, stores]);

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const handleGetDirections = (lat, long) => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`);
    };

    const handleClickStore = (distance) => trackStoreLocatorClick(searchValue, distance);

    return (
        <Component {...other}
                   stores={filteredStores}
                   onGetDirections={handleGetDirections}
                   onClickStore={handleClickStore}/>
    );
}
