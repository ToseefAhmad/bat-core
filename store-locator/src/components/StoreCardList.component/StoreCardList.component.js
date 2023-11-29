import React, { useState } from 'react';

import {StoreCardComponent} from '../StoreCard.component';

type Props = {
    /**
     * List of stores filtered by selected city
     */
    stores: Array
}

export function StoreCardListComponent(props: Props) {
    const {
        stores,
        ...other
    } = props;

    const [activeStoreCardIndex, setActiveStoreCardIndex] = useState(0);

    return (
        <div className="store-card-list-component">
            {stores.map((store, i) => (
                <StoreCardComponent {...other}
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={i}
                                    isActiveStoreCard={activeStoreCardIndex === i}
                                    store={store}
                                    onSetActiveCard={() => setActiveStoreCardIndex(i)}/>
            ))}
        </div>
    );
}
