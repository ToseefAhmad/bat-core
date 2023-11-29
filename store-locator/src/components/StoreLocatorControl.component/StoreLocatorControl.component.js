import React from 'react';
import {useIntl} from 'react-intl';

import {StoreLocatorMapContainer} from '../StoreLocatorMap.container';
import {useGoogleMapContext} from '../../hooks';

import messages from './resources/messages';

type Props = {
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

export function StoreLocatorControlComponent(props: Props) {
    const {formatMessage} = useIntl();
    const {isGmEnabled} = useGoogleMapContext();

    return (
        <>
            {isGmEnabled ? (
                <StoreLocatorMapContainer {...props}/>
            ) : (
                <div className="store-locator-control-component">
                    <div className="store-locator-control-component-wrapper">
                        <div className="store-locator-control-component-icon"/>
                        <div className="store-locator-control-component-title">
                            {formatMessage(messages.title)}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
