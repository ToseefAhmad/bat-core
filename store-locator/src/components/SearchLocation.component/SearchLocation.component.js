import React, {useState} from 'react';
import {useIntl} from 'react-intl';

import {ButtonComponent} from '@luft/common';

import {SearchLocationInputComponent} from '../SearchLocationInput.component';
import {StoreCardListContainer} from '../StoreCardList.container';
import {StoreTypeComponent} from '../StoreType.component';
import {useGoogleMapContext} from '../../hooks';

import messages from './resources/messages';

type Props = {
    /**
     * Store brand name
     */
    brandName: string
}

export function SearchLocationComponent(props: Props) {
    const {
        brandName
    } = props;

    const [searchValue, setSearchValue] = useState('');
    const [storeLocations, setStoreLocations] = useState([]);
    const {formatMessage} = useIntl();
    const {map, googleMap, onGetCurrentPosition, selectedStoreTypes, setSelectedStoreTypes} = useGoogleMapContext();

    const handleSearchCurrentLocation = () => {
        onGetCurrentPosition((position) => map?.setCenter(new googleMap.maps.LatLng(position)));
    };

    const handleSearchAddress = (address) => {
        const [trimmedAddress] = address?.split(',') || [];

        setSearchValue(trimmedAddress);
    };

    const handleOnSelectStoreType = (type) => {
        if (!selectedStoreTypes.includes(type)) {
            setSelectedStoreTypes(prevList => [type, ...prevList]);
        } else {
            setSelectedStoreTypes(prevList => prevList.filter(({store_name}) => store_name !== type.store_name));
        }
    };

    return (
        <div className="search-location-component">
            <div className="search-location-component-wrapper">
                <span className="search-location-component-text">
                    {formatMessage(messages.search_title, {brandName})}
                </span>
                {!!storeLocations.length && <StoreTypeComponent stores={storeLocations}
                                                                onSelectStoreType={handleOnSelectStoreType}/>}
                {googleMap && <SearchLocationInputComponent onSearchAddress={handleSearchAddress}/>}
                <ButtonComponent className="search-location-component-button"
                                 onClick={handleSearchCurrentLocation}
                                 inline={true}
                                 title={formatMessage(messages.button_title)}
                                 aria-label={formatMessage(messages.button_title)}
                                 variant="primary-link">
                    <span className="search-location-component-button-text">
                        {formatMessage(messages.button_title)}
                    </span>
                </ButtonComponent>
                <StoreCardListContainer searchValue={searchValue}
                                        selectedTypes={selectedStoreTypes}
                                        onLoadStores={setStoreLocations}/>
            </div>
        </div>
    );
}
