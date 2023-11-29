import React, {
    useState,
    useRef,
    useEffect,
    useCallback
} from 'react';
import {useIntl} from 'react-intl';
import {useLocation, useHistory} from 'react-router';
import {Link} from 'react-router-dom';

import {CmsBlockContainer} from '@luft/cms';
import {CartNavigationComponent} from '@luft/cart';
import {BillingAddressAsShippingContainer} from '@luft/billing';
import {
    BoxComponent,
    ErrorComponent,
    LoaderComponent,
    useResolutions,
    useToast,
    useScrollTo
} from '@luft/common';
import {
    CheckoutHeaderContainer,
    CheckoutTotalsContainer,
    CheckoutAppliedDiscountsComponent,
    CreateOrderRendererComponent,
    CheckoutContactInfoStepComponent,
    CheckoutShippingMethodStepComponent,
    CheckoutPaymentMethodStepComponent
} from '@luft/checkout';

import type {
    Address,
    PaymentMethod,
    ShippingMethod
} from '@luft/types';

import messages from '@luft/checkout/src/components/CheckoutInfo.component/resources/messages';

import {CheckoutKtpIdContainer} from '../CheckoutKtpId.container';
import {CheckoutDobContainer} from '../CheckoutDob.container';
import {CheckoutProductsListComponent} from '../CheckoutProductsList.component';
import {CheckoutDiscountsComponent} from '../CheckoutDiscounts.component';
import {CheckoutCouponsWalletContainer} from '../CheckoutCouponsWallet.container';
import {RewardPointsContainer} from '../RewardPoints.container';
import {CheckoutShippingAddressStepComponent} from '../CheckoutShippingAddressStep.component';
import {CheckoutBillingAddressStepComponent} from '../CheckoutBillingAddressStep.component';
import {CouponsWalletItemComponent} from '../../../../sales';
import {PaymentMethodDetailsRendererContainer} from '../../../../payment';
import {useKtpIdValidation} from '../../../../restrict-access';

import custom_messages from './resources/messages';

type Props = {
    /**
     * Flag, that either Cart is loading or create order is in progress
     * (forwarded to LoaderComponent)
     * */
    loading?: boolean,
    /**
     * Error, that should be displayed on top of component, usually identifies order creation failure
     * (forwarded to ErrorComponent)
     * */
    error?: Error,
    /**
     * TODO: make container for preview, that fetches this information
     * User email
     * (forwarded to AddressPreviewComponent)
     * */
    email?: string,
    /**
     * Is only virtual products in cart
     */
    isVirtual?: boolean,
    /**
     * TODO: make container for preview, that fetches this information
     * Shipping address, assigned to cart as selected
     * (forwarded to AddressPreviewComponent)
     * */
    shippingAddress?: Address,
    /**
     * TODO: make container for preview, that fetches this information
     * Shipping Method, assigned to cart as selected
     * (forwarded to ShippingMethodPreviewComponent)
     * */
    shippingMethod?: ShippingMethod,
    /**
     * TODO: make container for preview, that fetches this information
     * Payment Method, assigned to cart as selected
     * (forwarded to PaymentMethodPreviewComponent)
     * */
    selectedPaymentMethod?: PaymentMethod,
    /**
     * TODO: make container for preview, that fetches this information
     * Billing address, assigned to cart as selected
     * (forwarded to AddressPreviewComponent)
     * */
    billingAddress?: Address,
    /**
     * Flag, that identifies create order control should be disabled
     * (forwarded to LoaderComponent)
     * */
    checkoutDisabled?: boolean,
    /**
     * Callback used when user should be navigated on Shipping Address page
     * */
    onNavigateShippingAddress?: Function,
    /**
     * Callback used when user should be navigated on Shipping Method page
     * */
    onNavigateShippingMethod?: Function,
    /**
     * Callback used when user should be navigated on Payment Method page
     * */
    onNavigatePaymentMethod?: Function,
    /**
     * Callback used when user should be navigated on Billing Address page
     * */
    onNavigateBillingAddress?: Function,
    /**
     * Callback used when user clicks create order control
     * */
    onCreateOrder?: Function,
    /**
     * Callback used when user set billing address same as shipping
     * */
    onBillingAsShipping?: Function,
    /**
     * Billing and shipping addresses are same
     * */
    billingAddressSameAsShipping: boolean,
    /**
     * Callback used when user should be navigated on Contact Info page
     * */
    onNavigateContactInfo?: Function,
    /**
     * Callback on navigate to cart
     */
    onNavigateCart?: Function,
    /**
     * Exposed step
     */
    step?: 'contact-info' | 'shipping-address' | 'shipping-method' | 'payment-method' | 'billing-address',
    /**
     * Callback when user navigated to login
     */
    onNavigateLogin?: Function,
    /**
     * Callback when user save email
     */
    onSaveContactInfo: Function,
    /**
     * Callback when user save shipping address
     */
    onSaveShippingAddress?: Function,
    /**
     * Callback when user add  shipping address to address book
     */
    onAddShippingAddress?: Function,
    /**
     * Callback when user add  billing address to address book
     */
    onAddBillingAddress?: Function,
    /**
     * Callback when use save shipping method
     */
    onSaveShippingMethod?: Function,
    /**
     * Callback when use save payment method
     */
    onSelectPaymentMethod?: Function,
    /**
     * Callback when use save billing address
     */
    onSaveBillingAddress?: Function,
    /**
     * Should show validation error
     */
    showValidation?: boolean,
    /**
     * Payment method code
     */
    paymentCode?: string,
    /**
     * Callback when usr navigate to add new address to address book
     */
    onNavigateAddNewShippingAddress?: Function,
    /**
     * Callback when use navigate to add billing address
     */
    onNavigateAddNewBillingAddress?: Function,
    /**
     * Callback used when authorized user select another shipping address from Address Book
     */
    onChangeShippingAddress?: Function,
    /**
     * Callback used when authorized user select another ишддштп address from Address Book
     */
    onChangeBillingAddress?: Function,
    /**
     * List of cart products
     */
    cartItems: Product[],
    /**
     * Total amount of cart products
     */
    cartTotalItems: number,
    /**
     * Show coupon wallet
     */
    showCouponWallet: boolean,
    /**
     * Flag, which indicates that reward points should be shown
     */
    showRewardPoints: boolean,
    /**
     * Flag, used to identify if there is authorized user
     */
    isAuthorized?: boolean,
    /**
     * User addresses from address book
     */
    addresses?: Address[],
    /**
     * Ktp Id for unregistered user
     */
    customerKtpId?: string,
    /**
     * Customer's Day of Birth
     */
    customerDob?: string,
    /**
     * Ktp Id for registered user
     */
    viewerKtpId?: string,
    /**
     * Flag, uses to hide CheckoutKtpContainer
     */
    hideCheckoutKtpId?: boolean
};

const KTP_SHOULD_KEEP_STEP_BY_STEP_ORDER = false;
const DOB_SHOULD_KEEP_STEP_BY_STEP_ORDER = false;
const PAYMENT_ERROR_DURATION = 7000; // ms

export function CheckoutInfoComponent(props: Props) {
    const {
        loading,
        error,
        email,
        isVirtual,
        shippingAddress,
        shippingMethod,
        selectedPaymentMethod,
        billingAddress,
        checkoutDisabled,
        onNavigateShippingMethod,
        onNavigatePaymentMethod,
        onNavigateBillingAddress,
        onNavigateContactInfo,
        onCreateOrder,
        onBillingAsShipping,
        billingAddressSameAsShipping,
        onNavigateCart,
        onNavigateLogin,
        onSaveContactInfo,
        step,
        onSaveShippingAddress,
        onChangeShippingAddress,
        onSaveShippingMethod,
        onSelectPaymentMethod,
        onSaveBillingAddress,
        showValidation,
        paymentCode,
        onNavigateAddNewBillingAddress,
        onNavigateAddNewShippingAddress,
        onAddShippingAddress,
        onAddBillingAddress,
        onChangeBillingAddress,
        onNavigateShippingAddress,
        cartItems,
        cartTotalItems,
        showCouponWallet,
        showRewardPoints,
        isAuthorized,
        addresses,
        customerKtpId,
        customerDob,
        viewerKtpId,
        hideCheckoutKtpId,
        ...other
    } = props;

    const isContactInfoStep = step === 'contact-info';
    const isShippingAddressAddStep = step === 'shipping-address-add';
    const isShippingAddressStep = step === 'shipping-address' || isShippingAddressAddStep;
    const isShippingMethodStep = step === 'shipping-method';
    const isPaymentMethodStep = step === 'payment-method';
    const isBillingAddressAddStep = step === 'billing-address-add';
    const isBillingAddressStep = step === 'billing-address' || isBillingAddressAddStep;
    const paymentMethod = selectedPaymentMethod?.payment_method;

    const {formatMessage} = useIntl();
    const {isSMdown} = useResolutions();
    const location = useLocation();
    const history = useHistory();
    const addToast = useToast();
    const shippingContainerRef = useRef();
    const scrollTopShippingContainer = useScrollTo(shippingContainerRef);
    const billingContainerRef = useRef();
    const scrollTopBillingContainer = useScrollTo(billingContainerRef);
    const [hasKtpIdError, setHasKtpIdError] = useState(false);
    const [hasDobError, setHasDobError] = useState(false);
    const [checkoutPaymentError, setCheckoutPaymentError] = useState();
    const [isShownKtpIdRequiredError, setIsShownKtpIdRequiredError] = useState(false);
    const {validateKtpId} = useKtpIdValidation();

    const isError = showValidation && !email;
    const isPaymentActive = (isVirtual && email) || (!isVirtual && shippingMethod);

    const refCustomerKtp = useRef(null);

    const validateKtp = useCallback(() => {
        const {isValid} = validateKtpId(customerKtpId);

        if (isAuthorized && !isValid) {
            setIsShownKtpIdRequiredError(true);
            window.scrollTo({top: 0});
            return;
        }

        if (refCustomerKtp.current) {
            refCustomerKtp.current.click();
        }
    }, [isAuthorized, customerKtpId]);

    const {showDisabledRegistrationToast, paymentError, ...updatedState} = location.state || {};
    const checkoutError = error || checkoutPaymentError;

    useEffect(() => {
        if (!paymentError) return;

        setCheckoutPaymentError(paymentError);
        const timeoutId = setTimeout(() => {
            setCheckoutPaymentError(null);
        }, PAYMENT_ERROR_DURATION);

        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (!checkoutError) return;

        window.scrollTo({top: 0});
    }, [checkoutError]);

    useEffect(() => {
        if (!showDisabledRegistrationToast) return;

        addToast(formatMessage(custom_messages.disable_register_notification), 'success');
        history.replace({...location, state: updatedState});
    }, []);

    const handleSetDobError = useCallback(hasError => {
        setHasDobError(hasError);
    }, []);

    const handleSetKtpIdError = useCallback(hasError => {
        setHasKtpIdError(hasError);
    }, []);

    const handleOnSaveShippingAddress = () => {
        onSaveShippingAddress();
        scrollTopShippingContainer();
    };

    const handleOnSaveBillingAddress = () => {
        onSaveBillingAddress();
        scrollTopBillingContainer();
    };

    // KtpId and DOB should be always enable but keep these variables to stay compatible with other steps
    const isDisabledKtpId = KTP_SHOULD_KEEP_STEP_BY_STEP_ORDER && (!shippingAddress || !shippingMethod);
    const isDisabledDob = DOB_SHOULD_KEEP_STEP_BY_STEP_ORDER && (!shippingAddress || !shippingMethod);
    const isDisabledPaymentMethod = !isPaymentActive
        || !shippingAddress
        || !shippingMethod
        || (!isAuthorized && !customerDob);

    const isNotCompletedUserData = !isAuthorized && (!customerDob || hasDobError || hasKtpIdError);
    const isCreateOrderDisabled = isNotCompletedUserData || !paymentMethod;

    return (
        <div className="checkout-info-component">
            <div className="checkout-info-component-header-wrapper">
                <CheckoutHeaderContainer/>
            </div>

            <CartNavigationComponent onNavigateCart={onNavigateCart}
                                     selected="checkout"/>

            <div className="checkout-info-component-body-holder">
                {loading && (<LoaderComponent className="checkout-info-component-loader"
                                              type="overlay"/>)}
                {checkoutError && (
                    <ErrorComponent className="checkout-info-component-error"
                                    error={checkoutError}/>
                )}

                {isShownKtpIdRequiredError && (
                    <ErrorComponent className="checkout-info-component-error"
                                    error={{
                                        message: formatMessage(custom_messages.ktp_id_required_error, {
                                            link: text => (
                                                <Link className="checkout-info-component-error-link"
                                                      to={{
                                                          pathname: '/account',
                                                          state: {isKtpIdRequiredError: true}
                                                      }}>
                                                    {text}
                                                </Link>
                                            )
                                        })
                                    }}/>
                )}

                <div className="checkout-info-component-body">
                    <div className="checkout-info-component-body-total">
                        <CheckoutProductsListComponent cartItems={cartItems}
                                                       cartTotalItems={cartTotalItems}/>

                        <div className="checkout-info-component-body-total-title">
                            {formatMessage(messages.summary)}
                        </div>

                        <CmsBlockContainer cmsBlockId="checkout-totals-before"
                                           group="checkout-page"/>
                        <CheckoutTotalsContainer showRewardPoints={showRewardPoints}/>

                        {!isSMdown && (
                            <div className="checkout-info-component-create-order-holder">
                                <CreateOrderRendererComponent {...other}
                                                              disabled={checkoutDisabled || isCreateOrderDisabled}
                                                              onCreateOrder={onCreateOrder}
                                                              customerKtpId={customerKtpId}
                                                              viewerKtpId={viewerKtpId}
                                                              validateKtp={validateKtp}/>
                                <CmsBlockContainer cmsBlockId="checkout-totals-after"
                                                   group="checkout-page"/>
                            </div>
                        )}
                    </div>
                    <div className="checkout-info-component-body-content">
                        <BoxComponent className="checkout-info-component-contact-info-box"
                                      error={isError && isContactInfoStep}
                                      active={!email && isContactInfoStep}>

                            {isContactInfoStep && (
                                <div className="checkout-info-component-step-title checkout-info-component-step-title-contact-info">
                                    {formatMessage(messages.contact_information_title)}
                                </div>
                            )}

                            <CheckoutContactInfoStepComponent email={email}
                                                              active={!email && !isError}
                                                              invalid={isError}
                                                              exposed={isContactInfoStep}
                                                              onNavigateLogin={onNavigateLogin}
                                                              onSaveContactInfo={onSaveContactInfo}
                                                              onNavigateContactInfo={onNavigateContactInfo}/>
                        </BoxComponent>
                        <div className="checkout-info-component-shipping"
                             ref={shippingContainerRef}>
                            <BoxComponent title={formatMessage(messages.delivery_title)}
                                          disabled={!email}
                                          className="checkout-info-component-shipping-box"
                                          error={showValidation && !shippingAddress}
                                          active={email && !shippingAddress}>

                                {isShippingAddressStep && (
                                    <div className="checkout-info-component-step-title">
                                        {formatMessage(messages.delivery_address_title)}
                                    </div>
                                )}

                                <CheckoutShippingAddressStepComponent email={email}
                                                                      exposed={isShippingAddressStep}
                                                                      isAddStep={isShippingAddressAddStep}
                                                                      onNavigateAdd={onNavigateAddNewShippingAddress}
                                                                      showValidation={showValidation}
                                                                      shippingAddress={shippingAddress}
                                                                      isAuthorized={isAuthorized}
                                                                      addresses={addresses}
                                                                      // eslint-disable-next-line max-len
                                                                      onNavigateShippingAddress={onNavigateShippingAddress}
                                                                      onAddShippingAddress={onAddShippingAddress}
                                                                      onChangeAddress={onChangeShippingAddress}
                                                                      onSaveAddress={handleOnSaveShippingAddress}/>

                                {isShippingMethodStep && (
                                    <div className="checkout-info-component-step-title">
                                        {formatMessage(messages.delivery_method_title)}
                                    </div>
                                )}
                                <CmsBlockContainer cmsBlockId="checkout-shipping-notes"
                                                   group="checkout-page"/>
                                <CheckoutShippingMethodStepComponent exposed={isShippingMethodStep}
                                                                     shippingAddress={shippingAddress}
                                                                     shippingMethod={shippingMethod}
                                                                     showValidation={showValidation}
                                                                     email={email}
                                                                     onNavigateShippingMethod={onNavigateShippingMethod}
                                                                     onSaveShippingMethod={onSaveShippingMethod}/>
                            </BoxComponent>
                        </div>
                        {!isAuthorized && (
                            <>
                                {!hideCheckoutKtpId && (
                                    <BoxComponent title={isDisabledKtpId && formatMessage(custom_messages.ktp_id_title)}
                                                  disabled={isDisabledKtpId}>
                                        <CheckoutKtpIdContainer ktpId={customerKtpId}
                                                                refKtpId={refCustomerKtp}
                                                                onSetKtpIdError={handleSetKtpIdError}/>
                                    </BoxComponent>
                                )}
                                <BoxComponent title={isDisabledDob && formatMessage(custom_messages.dob_title)}
                                              disabled={isDisabledDob}>
                                    <CheckoutDobContainer dob={customerDob}
                                                          ktpId={customerKtpId}
                                                          onSetDobError={handleSetDobError}/>
                                </BoxComponent>
                            </>
                        )}

                        {showCouponWallet && (
                            <CheckoutCouponsWalletContainer couponsWalletItemAs={CouponsWalletItemComponent}/>
                        )}

                        {showRewardPoints && <RewardPointsContainer/>}

                        <CheckoutDiscountsComponent className="checkout-info-component-step-checkout-discounts"
                                                    showRewardPoints={showRewardPoints}/>

                        <CheckoutAppliedDiscountsComponent showRewardPoints={showRewardPoints}/>

                        <div className="checkout-info-component-payment-wrapper"
                             ref={billingContainerRef}>
                            <BoxComponent title={formatMessage(messages.payment_title)}
                                          error={showValidation && !paymentMethod}
                                          active={!isDisabledPaymentMethod && !paymentMethod}
                                          className="checkout-info-component-payment-box"
                                          disabled={isDisabledPaymentMethod}>

                                {isPaymentMethodStep && (
                                    <div className="checkout-info-component-step-title">
                                        {formatMessage(messages.payment_method_title)}
                                    </div>
                                )}

                                <CheckoutPaymentMethodStepComponent exposed={isPaymentMethodStep}
                                                                    paymentCode={paymentCode}
                                                                    paymentMethod={paymentMethod}
                                                                    isPaymentActive={isPaymentActive}
                                                                    showValidation={showValidation}
                                                                    onNavigatePaymentMethod={onNavigatePaymentMethod}
                                                                    onSelectPaymentMethod={onSelectPaymentMethod}/>

                                <PaymentMethodDetailsRendererContainer code={paymentMethod?.code}
                                                                       selectedPaymentMethod={selectedPaymentMethod}
                                                                       isPaymentStep={isPaymentMethodStep}/>

                                {!isBillingAddressStep && paymentMethod && (
                                    <div className="checkout-info-component-sm-billing-as-shipping">
                                        <BillingAddressAsShippingContainer isChecked={billingAddressSameAsShipping}
                                                                           isDisabled={!shippingAddress}
                                                                           onBillingAsShipping={onBillingAsShipping}/>
                                    </div>
                                )}

                                {!isSMdown && !billingAddressSameAsShipping && (
                                    <>
                                        {paymentMethod && (
                                            <div className="checkout-info-component-step-title">
                                                {formatMessage(messages.billing_address_title)}
                                            </div>
                                        )}
                                        <CheckoutBillingAddressStepComponent exposed={isBillingAddressStep}
                                                                             isAddStep={isBillingAddressAddStep}
                                                                             email={email}
                                                                             // eslint-disable-next-line max-len
                                                                             onNavigateAdd={onNavigateAddNewBillingAddress}
                                                                             onAddBillingAddress={onAddBillingAddress}
                                                                             showValidation={showValidation}
                                                                             paymentMethod={paymentMethod}
                                                                             billingAddress={billingAddress}
                                                                             isAuthorized={isAuthorized}
                                                                             addresses={addresses}
                                                                             // eslint-disable-next-line max-len
                                                                             onNavigateAddress={onNavigateBillingAddress}
                                                                             onBillingAsShipping={onBillingAsShipping}
                                                                             onSaveAddress={handleOnSaveBillingAddress}
                                                                             onChangeAddress={onChangeBillingAddress}/>
                                    </>
                                )}
                            </BoxComponent>
                        </div>
                        {isSMdown && paymentMethod && !billingAddressSameAsShipping && (
                            <BoxComponent title={!billingAddress ? formatMessage(messages.billing_title) : null}
                                          className="checkout-info-component-billing-box"
                                          error={showValidation && !billingAddress}
                                          active={paymentMethod && !billingAddress}>
                                <CheckoutBillingAddressStepComponent exposed={step === 'billing-address'}
                                                                     email={email}
                                                                     active={false}
                                                                     paymentMethod={paymentMethod}
                                                                     billingAddress={billingAddress}
                                                                     onNavigateAddress={onNavigateBillingAddress}
                                                                     onBillingAsShipping={onBillingAsShipping}
                                                                     onSaveAddress={onSaveBillingAddress}/>
                            </BoxComponent>
                        )}
                        {isSMdown && (
                            <div className="checkout-info-component-create-order-holder">
                                <CreateOrderRendererComponent {...other}
                                                              disabled={checkoutDisabled || isCreateOrderDisabled}
                                                              onCreateOrder={onCreateOrder}
                                                              customerKtpId={customerKtpId}
                                                              viewerKtpId={viewerKtpId}
                                                              validateKtp={validateKtp}/>
                                <CmsBlockContainer cmsBlockId="checkout-totals-after"
                                                   group="checkout-page"/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
