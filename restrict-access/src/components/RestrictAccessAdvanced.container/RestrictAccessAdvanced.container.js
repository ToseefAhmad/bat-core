import React, {
    useState,
    useEffect,
    useRef,
    useCallback
} from 'react';

import {LoaderComponent, useStoreConfigQuery} from '@luft/common';
import {useViewerQuery} from '@luft/user';
import {useCurrentStoreBaseName} from '@luft/multistore';

import {RestrictAccessComponent} from '../RestrictAccess.component';
import {useRestrictAccess} from '../../hooks';
import {useStorage, cookieManager} from '../../../../common';
import {createSavStorageKey} from '../../util';
import {ADVANCED_STATUS_KEY, CONFIRMED_STATUS_KEY} from '../../constants';

const HOUR_IN_SECONDS = 60 * 60;

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: React.Component,
    /**
     * Represent for loading view
     */
    loadingAs?: React.Component,
    /**
     * Await result
     */
    awaitResult?: boolean
};

export function RestrictAccessAdvancedContainer(props: Props) {
    const {
        as: Component = RestrictAccessComponent,
        loadingAs: Loading = LoaderComponent,
        awaitResult = true,
        ...other
    } = props;

    const {
        isAdvancedAccessStatus,
        onSetAdvancedAccessStatus,
        onSetConfirmedAccessStatus
    } = useRestrictAccess();

    const viewerQuery = useViewerQuery();
    const storeConfigQuery = useStoreConfigQuery();
    const storeBaseName = useCurrentStoreBaseName();
    const {
        setValue: setSavStorageKeyValue,
        removeValue: removeSavStorageKeyValue
    } = useStorage({key: createSavStorageKey(CONFIRMED_STATUS_KEY, storeBaseName)});

    const isAuthorized = !!viewerQuery.data?.viewer?.token;
    const isAgeVerified = viewerQuery.data?.viewer?.user?.is_age_verified ?? false;
    const verificationLifetime = storeConfigQuery.data?.storeConfig?.verification_lifetime || 1;

    const prevIsAuthorized = useRef(isAuthorized);

    const [showPopup, setShowPopup] = useState(() => {
        if (!isAdvancedAccessStatus) return false;

        return !cookieManager.has(ADVANCED_STATUS_KEY);
    });

    useEffect(() => {
        if (!isAdvancedAccessStatus) return;

        if (isAgeVerified) {
            setSavStorageKeyValue(true);
            onSetConfirmedAccessStatus();
            setShowPopup(false);
            return;
        }

        // Remove confirmed status just in case it was previously set
        removeSavStorageKeyValue();

        const handleClick = () => {
            const hasCookie = cookieManager.has(ADVANCED_STATUS_KEY);

            setShowPopup(!hasCookie);
        };

        // Watch the whole document for clicks and in case advanced cookie is missing,
        // display a SAV popup once again
        document.addEventListener('click', handleClick);

        return () => document.removeEventListener('click', handleClick);
    }, [
        isAgeVerified,
        isAdvancedAccessStatus,
        setSavStorageKeyValue,
        removeSavStorageKeyValue,
        onSetAdvancedAccessStatus,
        onSetConfirmedAccessStatus
    ]);

    const handleRemovePopup = useCallback((refreshCookie = false) => {
        // Prevent setting a new SAV cookie, if the old one still exists
        if (!refreshCookie && cookieManager.has(ADVANCED_STATUS_KEY)) {
            return setShowPopup(false);
        }

        // Remove confirmed status just in case it was previously set
        removeSavStorageKeyValue();
        // Postpone advanced SAV popup appearance on the configured value (in hours) at the BO
        cookieManager.set(ADVANCED_STATUS_KEY, Date.now(), {
            maxAge: verificationLifetime * HOUR_IN_SECONDS,
            path: storeBaseName,
            secure: true
        });

        setShowPopup(false);
        onSetAdvancedAccessStatus();
    }, [
        verificationLifetime,
        storeBaseName,
        removeSavStorageKeyValue,
        onSetAdvancedAccessStatus
    ]);

    // Delay the SAV popup appearance on logout
    useEffect(() => {
        // User was logged in, but now he/she is logged out
        if (prevIsAuthorized.current && !isAuthorized) {
            handleRemovePopup(true);
        }

        prevIsAuthorized.current = isAuthorized;
    }, [isAuthorized, handleRemovePopup]);

    const isLoading = viewerQuery.loading || storeConfigQuery.loading;

    if (awaitResult && isLoading) return Loading && <Loading/>;

    return showPopup && (
        <Component {...other}
                   error={viewerQuery.error || storeConfigQuery.error}
                   onRemovePopup={handleRemovePopup}/>
    );
}
