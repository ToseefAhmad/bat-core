import React from 'react';
import {uniqBy} from 'lodash';

import {CheckboxComponent, ImageComponent} from '@luft/common';

import type {StoreType, StoreLocation} from '../../../../types';

type Props = {
    /**
     * List of stores
     */
    stores: StoreLocation[],
    /**
     * Select store type checkbox callback
     */
    onSelectStoreType: (type: StoreType) => void
}

export function StoreTypeComponent(props: Props) {
    const {
        stores,
        onSelectStoreType
    } = props;

    const storeTypeFullList = stores.map(store => store.store_type);
    const storeTypeList = uniqBy(storeTypeFullList, 'store_name').filter(type => !!type.store_name);

    return (
        <div className="store-type-component">
            {storeTypeList.map(type => (
                <CheckboxComponent id={type.store_name}
                                   key={type.store_name}
                                   className="store-type-component-checkbox"
                                   name={type.store_name}
                                   onChange={() => onSelectStoreType(type)}>
                    <ImageComponent className="store-type-component-checkbox-image"
                                    image={{url: type.full_logo}}/>
                </CheckboxComponent>
            ))}
        </div>
    );
}
