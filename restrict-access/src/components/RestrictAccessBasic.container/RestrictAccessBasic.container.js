import React from 'react';

import {useCurrentStoreBaseName} from '@luft/multistore';

import {RestrictAccessComponent} from '../RestrictAccess.component';
import {useRestrictAccess} from '../../hooks/useRestrictAccess';
import {createSavStorageKey} from '../../util';
import {cookieManager} from '../../../../common/src/util/cookieManager';
import {BASIC_STATUS_KEY, ADVANCED_STATUS_KEY} from '../../constants';

const INITIAL_MAX_AGE = 60 * 60; // 1 hour (in seconds)

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: React.Component
};

export function RestrictAccessBasicContainer(props: Props) {
    const {
        as: Component = RestrictAccessComponent,
        ...other
    } = props;

    const storeBaseName = useCurrentStoreBaseName();
    const {isBasicAccessStatus: showPopup, onSetAdvancedAccessStatus} = useRestrictAccess();

    const handleRemovePopup = () => {
        const basicStorageKey = createSavStorageKey(BASIC_STATUS_KEY, storeBaseName);

        // This will guarantee, that basic SAV popup won't appear anymore
        localStorage?.setItem(basicStorageKey, true);
        // Postpone advanced SAV popup appearance on 1 hour
        cookieManager.set(ADVANCED_STATUS_KEY, Date.now(), {
            maxAge: INITIAL_MAX_AGE,
            path: storeBaseName,
            secure: true
        });

        onSetAdvancedAccessStatus();
    };

    return showPopup && (
        <Component {...other}
                   onRemovePopup={handleRemovePopup}/>
    );
}
