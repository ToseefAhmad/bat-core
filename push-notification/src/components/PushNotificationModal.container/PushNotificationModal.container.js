import React, {useState, useEffect} from 'react';
import type {ComponentType} from 'react';
import {noop, isUndefined} from 'lodash';

import {useUserSubscription} from '@luft/push-notification';
import {useIsAuthorized} from '@luft/user';

import {PushNotificationModalComponent} from '../PushNotificationModal.component';
import {useStorage} from '../../../../common';

type Props = {
    as?: ComponentType,
    brandName?: string,
    onSubscribe?: Function,
    onUnsubscribe?: Function
};

const IS_SHOWN_POPUP = 'isShownPopup';
const IS_SHOWN_POPUP_TO_CUSTOMER = 'isShownPopupToCustomer';

export function PushNotificationModalContainer(props: Props) {
    const {
        as: Component = PushNotificationModalComponent,
        brandName,
        onSubscribe = noop,
        onUnsubscribe = noop,
        ...other
    } = props;

    const [
        subscribe,
        unsubscribe,
        {data}
    ] = useUserSubscription();
    const {
        getValue: getPopupValue,
        setValue: setPopupValue
    } = useStorage({key: IS_SHOWN_POPUP, storage: sessionStorage});
    const {
        getValue: getCustomerPopupValue,
        setValue: setCustomerPopupValue
    } = useStorage({key: IS_SHOWN_POPUP_TO_CUSTOMER});
    const isAuthorized = useIsAuthorized();

    const [isOpen, setIsOpen] = useState(false);

    const isSubscribed = data?.pushSubscriptionDetails?.enabled;
    const isShownPopup = getPopupValue();
    const isShownPopupToCustomer = getCustomerPopupValue();

    // show popup if user is not subscribed and the popup hasn't shown yet
    useEffect(() => {
        if (isUndefined(isSubscribed) || isSubscribed || isShownPopup) return;
        setIsOpen(true);
        setPopupValue(true);
    }, [isSubscribed, isShownPopup, setPopupValue]);

    // show popup for an authorized customer if the popup hasn't shown yet
    useEffect(() => {
        if (isUndefined(isSubscribed) || !isAuthorized || isShownPopupToCustomer) return;
        setIsOpen(true);
        setCustomerPopupValue(true);
    }, [isSubscribed, isAuthorized, isShownPopupToCustomer, setCustomerPopupValue]);

    const handleOnSubscribe = async () => {
        setIsOpen(false);
        onSubscribe(await subscribe());
    };

    const handleOnUnsubscribe = async () => {
        setIsOpen(false);
        onUnsubscribe(await unsubscribe());
    };

    if (isUndefined(isSubscribed)) return null;

    return (
        <Component {...other}
                   onAgree={handleOnSubscribe}
                   onCancel={handleOnUnsubscribe}
                   isOpen={isOpen}
                   brandName={brandName}/>
    );
}
