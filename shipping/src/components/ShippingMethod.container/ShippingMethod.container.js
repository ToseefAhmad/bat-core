import React, {useState, useEffect} from 'react';
import {noop} from 'lodash';
import type {ComponentType} from 'react';

import {useCheckoutQuery, useSetShippingMethodsOnCart} from '@luft/quote';
import {ShippingMethodComponent, useCartDataShippingMethod} from '@luft/shipping';
import {useIsAuthorized} from '@luft/user';
import {useStoreConfigQuery} from '@luft/common';

import REWARD_POINTS_SETTINGS_QUERY from '../../../../quote/src/graphql/queries/RewardPointsSettings.query.graphql';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     * */
    as?: ComponentType<{}>,
    /**
     * Callback used on select Shipping Method mutation success
     * */
    onSaveShippingMethod?: Function,
    /**
     * Callback used on Close
     * (forwarded to presentation component)
     * */
    onBack?: Function
};

export function ShippingMethodContainer(props: Props) {
    const {
        as: Component = ShippingMethodComponent,
        onSaveShippingMethod = noop,
        ...other
    } = props;

    const [error, setError] = useState();
    const isAuthorized = useIsAuthorized();

    const {data: cartData, error: cartError, loading: cartLoading} = useCheckoutQuery();
    const {data: shippingMethod} = useCartDataShippingMethod();
    const {data: storeConfigData} = useStoreConfigQuery();

    const cartId = cartData?.cart?.id;
    const shippingMethods = cartData?.cart?.shipping_addresses?.[0]?.shipping_methods;
    const showRewardPoints = storeConfigData?.storeConfig?.show_referral_program_menu;

    const [setShippingMethod, {loading}] = useSetShippingMethodsOnCart({
        awaitRefetchQueries: true,
        refetchQueries: () => {
            if (!showRewardPoints || !isAuthorized) return null;

            return [{
                query: REWARD_POINTS_SETTINGS_QUERY,
                variables: {
                    input: {cart_id: cartId}
                }
            }];
        }
    });

    const handleOnSaveShippingMethod = async (methodCode, carrierCode) => {
        try {
            const resp = await setShippingMethod(cartId, methodCode, carrierCode);
            setError(null);
            onSaveShippingMethod(resp);
            return resp;
        } catch (e) {
            setError(e);
        }
    };

    useEffect(() => setError(cartError), [cartError]);

    return (
        <Component {...other}
                   shippingMethod={shippingMethod}
                   shippingMethods={shippingMethods}
                   loading={loading || cartLoading}
                   error={error}
                   onSaveShippingMethod={handleOnSaveShippingMethod}/>
    );
}
