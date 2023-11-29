import React from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import {useIntl} from 'react-intl';
import useOnclickOutside from 'react-cool-onclickoutside';
import {noop} from 'lodash';

import {useGoogleMapContext} from '../../hooks';

import messages from './resources/messages';

type Props = {
    /**
     * String with placeholder value for search input
     */
    placeholder: string,
    /**
     * Debounce from use-places-autocomplete library
     */
    debounce?: number,
    /**
     * Function return trimmed address
     */
    onSearchAddress?: Function
}

const DEBOUNCE = 300;

export function SearchLocationInputComponent(props: Props) {
    const {formatMessage} = useIntl();

    const {
        placeholder = formatMessage(messages.search_placeholder),
        debounce = DEBOUNCE,
        onSearchAddress = noop
    } = props;

    const {
        googleMap,
        map,
        infoWindow
    } = useGoogleMapContext();

    const {
        ready,
        value,
        suggestions: {status, data: suggestionsData},
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        googleMaps: googleMap?.maps,
        debounce
    });

    const registerRef = useOnclickOutside(() => {
        // When user clicks outside of the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });

    const handleInput = e => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect = ({description: address}) => () => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter as "false"
        setValue(address, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({address})
            .then(results => getLatLng(results[0]))
            .then((position) => {
                onSearchAddress(address);
                infoWindow.setPosition(position);
                map.setCenter(position);
            }).catch(error => {
                // eslint-disable-next-line no-console
                console.error('Error: ', error);
            });
    };

    return (
        <div className="search-location-input-component"
             ref={registerRef}>
            <input className="search-location-input-component-lookup"
                   value={value}
                   onChange={handleInput}
                   disabled={!ready}
                   placeholder={placeholder}/>
            {status === 'OK' && (
                <div className="search-location-input-component-list">
                    {suggestionsData.map((suggestion) => (
                        <div className="search-location-input-component-list-item"
                             key={suggestion?.place_id}
                             role="button"
                             tabIndex="0"
                             onClick={handleSelect(suggestion)}
                             onKeyPress={noop}>
                            <strong className="search-location-input-component-list-item-text-main">
                                {suggestion?.structured_formatting?.main_text}
                            </strong>
                            <small className="search-location-input-component-list-item-text-secondary">
                                {suggestion?.structured_formatting?.secondary_text}
                            </small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
