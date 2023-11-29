import React, {
    useContext,
    useEffect,
    useState,
    useRef
} from 'react';
import type {ComponentType} from 'react';
import {isEmpty, noop} from 'lodash';
import {
    Redirect,
    useHistory,
    useLocation
} from 'react-router';

import {useCheckoutQuery} from '@luft/quote';
import {useCartDataBillingAddress} from '@luft/billing';
import {useCartDataPaymentMethod} from '@luft/payment';
import {useCartDataShippingAddress, useCartDataShippingMethod} from '@luft/shipping';
import {
    useViewerQuery,
    useViewerAddressesQuery,
    useIsAuthorized
} from '@luft/user';
import {useUpdateViewerMutation} from '@luft/account';
import {
    LoaderComponent,
    useStoreConfigQuery
} from '@luft/common';
import {useAskGuestAuthorize} from '@luft/checkout';

import {CheckoutContext} from '../../contexts';
import {CheckoutInfoComponent} from '../CheckoutInfo.component';
import {useSetClientPurchase} from '../../hooks';
import {getReferralManager} from '../../../../user';
import {trackCheckoutOption} from '../../../../data-layer';
import VIEWER_INFO_MUTATION from '../../../../account/src/graphql/mutations/UpdateViewer.mutation.graphql';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: ComponentType<{}>,
    /**
     * Exposed step
     */
    step?: 'contact-info' | 'shipping-address' | 'shipping-address-dd' | 'shipping-method' | 'payment-method' | 'billing-address' | 'billing-address-add',
    /**
     * Payment method code
     */
    paymentCode?: string,
    /**
     * Callback used when create order finished successfully
     */
    onCreateOrder?: Function,
    /**
     * Callback used when guest user try open checkout which requires authorization
     */
    onNavigateAskGuestLogin?: Function,
    /**
     * Callback used when user set billing address same as shipping
     */
    onBillingAsShipping?: Function,
    /**
     * Callback for handling payment method forward
     */
    onSelectPaymentMethod?: Function
};

const DEFAULT_CART = {};

export function CheckoutInfoContainer(props: Props) {
    const {
        as: Component = CheckoutInfoComponent,
        step,
        paymentCode,
        onCreateOrder,
        onNavigateAskGuestLogin,
        onBillingAsShipping = noop,
        onSelectPaymentMethod = noop,
        ...other
    } = props;

    const history = useHistory();
    const referralCodeRef = useRef(null);
    const location = useLocation();
    const {stateError, payByEspayAndCreateOrderError} = location.state || {};

    const [error, setError] = useState();
    const [showValidation, setShowValidation] = useState(false);
    const viewerQuery: any = useViewerQuery();
    const {loading: askGuestAuthLoading, error: askGuestAuthError} = useAskGuestAuthorize(onNavigateAskGuestLogin);
    const {
        data: cartData,
        error: cartError,
        loading: cartDataLoading
    } = useCheckoutQuery();
    const {data: storeConfigData, loading: storeConfigLoading} = useStoreConfigQuery();
    const isAuthorized = useIsAuthorized();
    const {data: viewerAddresses} = useViewerAddressesQuery();
    const {data: shippingAddress} = useCartDataShippingAddress();
    const {data: shippingMethod} = useCartDataShippingMethod();
    const {data: selectedPaymentMethod} = useCartDataPaymentMethod();
    const {data: billingAddress} = useCartDataBillingAddress();
    const [viewerInfoMutation] = useUpdateViewerMutation({}, VIEWER_INFO_MUTATION);
    const setClientPurchase = useSetClientPurchase();
    const {
        checkoutStep,
        onSetCheckoutStep,
        onSetCheckoutCartItems
    } = useContext(CheckoutContext);
    const viewerEmail = viewerQuery?.data?.viewer?.user?.email;
    const addresses = viewerAddresses?.viewer?.user?.addresses;
    const cart = cartData?.cart || DEFAULT_CART;
    const billingAddressSameAsShipping = cart?.billing_address?.same_as_shipping || false;
    const cartEmail = cart?.email;
    const isVirtual = cart?.is_virtual;
    const cartItems = cart?.items || [];
    const cartTotalItems = cart?.total_items;
    const isCartLimitError = cart?.error_info?.has_error;
    const viewerKtpId = viewerQuery?.data?.viewer?.user?.ktp_id;
    const customerKtpId = cart?.customer_ktp_id?.[0]?.ktp_id;
    const customerDob = cart?.dob?.dob;
    const {getCode} = getReferralManager();
    const viewerReferralCode = viewerQuery?.data?.viewer?.user?.referral;
    const referralCode = viewerReferralCode || referralCodeRef.current || getCode();
    const {
        show_coupon_wallet,
        show_referral_program_menu: showRewardPoints,
        is_referral_program_enabled: isReferralProgramEnabled
    } = storeConfigData?.storeConfig || {};

    useEffect(() => {
        setError(cartError || askGuestAuthError || stateError || payByEspayAndCreateOrderError);
    }, [cartError, askGuestAuthError, stateError, payByEspayAndCreateOrderError]);

    useEffect(() => {
        if (cart && !referralCodeRef.current) {
            referralCodeRef.current = cart?.referral_code?.referral_code;
        }
    }, [cart]);

    useEffect(() => {
        if (!checkoutStep && !isEmpty(cartItems)) {
            onSetCheckoutCartItems(cartItems);
            onSetCheckoutStep(1);
        }
    }, [cartItems]);

    // TODO: It's not triggered on mobile
    const handleSelectPaymentMethodExtend = (res) => {
        const selectedPayment = res?.data?.setPaymentMethodOnCart?.selected_payment_method?.payment_method;
        const method = selectedPayment?.code;

        onSelectPaymentMethod();
        onSetCheckoutStep(2);

        if (method !== 'espay') {
            const name = selectedPayment?.name;
            trackCheckoutOption({option: name, step: 2});
        }
    };

    const handleOnCreateOrder = async (payload) => {
        if (payload.error) {
            setShowValidation(true);
            setError(payload.error);
        } else {
            const refCode = isReferralProgramEnabled ? referralCode : cart.customer_note?.[0]?.code;

            const purchase = {
                actionField: {
                    id: payload.data?.createOrder?.order?.id,
                    affiliation: 'Online Store',
                    revenue: cart.prices.grand_total.value,
                    shipping: shippingMethod.amount.value.toString(),
                    coupon: cart.coupons && cart.coupons[0]?.label,
                    referral_code: refCode,
                    payment_method: cart.selected_payment_method.payment_method.name,
                    taxes: payload.data?.createOrder?.order?.prices?.taxes
                },
                products: cart.items
            };

            // We want this value to be persistent in storage,
            // because sometimes we need to restore it after a redirect from 3rd party
            setClientPurchase(purchase);
            setError(null);

            if (!viewerKtpId && !!viewerEmail && !!customerKtpId) {
                await viewerInfoMutation({viewer_info: {ktp_id: customerKtpId}});
            }

            onCreateOrder({payload, referralCode: refCode}, {purchase, customerKtpId});
        }
    };

    const handleOnBillingAsShipping = async (res) => {
        const val = res?.data?.setBillingAddressAsShippingAddressOnCart;

        if (val) {
            onBillingAsShipping();
            onSetCheckoutStep(3);
            trackCheckoutOption({option: 'the same as shipping address', step: 3});
            history.replace('/checkout');
        }
    };

    const handleSaveBillingAddress = () => {
        history.replace('/checkout');
        onSetCheckoutStep(3);
        trackCheckoutOption({option: 'billing address is created', step: 3});
    };

    const handleChangeBillingAddress = (res) => {
        const isSameAsShipping = res?.data?.setBillingFromAddressBook?.billing_address?.same_as_shipping;

        trackCheckoutOption({
            option: isSameAsShipping
                ? 'the same as shipping address'
                : 'another billing address is selected',
            step: 3
        });
        history.replace('/checkout');
    };

    const handleSaveShippingMethod = (resp) => {
        const currentAddresses = resp?.data?.setShippingMethodsOnCart?.shipping_addresses;
        if (!isEmpty(currentAddresses)) {
            const method = currentAddresses?.[0]?.selected_shipping_method?.method_title;
            trackCheckoutOption({option: method, step: 1});
        }
        history.replace('/checkout');
    };

    if (cartDataLoading) return <LoaderComponent/>;
    if (!cart?.id || !cartItems.length || isCartLimitError) return <Redirect to="/cart"/>;

    return (
        <Component {...other}
                   step={step}
                   paymentCode={paymentCode}
                   loading={cartDataLoading || askGuestAuthLoading || storeConfigLoading}
                   error={error}
                   email={viewerEmail || cartEmail}
                   isVirtual={isVirtual}
                   shippingAddress={shippingAddress}
                   shippingMethod={shippingMethod}
                   selectedPaymentMethod={selectedPaymentMethod}
                   billingAddress={billingAddress}
                   billingAddressSameAsShipping={billingAddressSameAsShipping}
                   showValidation={showValidation}
                   onCreateOrder={handleOnCreateOrder}
                   onBillingAsShipping={handleOnBillingAsShipping}
                   cartItems={cartItems}
                   cartTotalItems={cartTotalItems}
                   viewerKtpId={viewerKtpId}
                   customerKtpId={customerKtpId}
                   customerDob={customerDob}
                   onSelectPaymentMethod={handleSelectPaymentMethodExtend}
                   onSaveShippingMethod={handleSaveShippingMethod}
                   onChangeBillingAddress={handleChangeBillingAddress}
                   onSaveBillingAddress={handleSaveBillingAddress}
                   showCouponWallet={show_coupon_wallet}
                   showRewardPoints={showRewardPoints}
                   isAuthorized={isAuthorized}
                   addresses={addresses}/>
    );
}
