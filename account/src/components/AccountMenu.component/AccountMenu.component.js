import React from 'react';
import {useIntl} from 'react-intl';
import {useLocation} from 'react-router';
import {NavLink} from 'react-router-dom';

import {LogoutContainer} from '@luft/user';
import {AccountMenuTitleComponent} from '@luft/account/src/components/AccountMenuTitle.component';
import messages from '@luft/account/src/components/AccountMenu.component/resources/messages';

import {getStoreCodeByPathname} from '../../../../common';

import custom_messages from './resources/messages';

type Props = {
    accountPath?: string,
    infoNavigatePath?: string,
    addressesNavigatePath?: string,
    ordersNavigatePath?: string,
    preferencesNavigatePath?: string,
    securityNavigatePath?: string,
    couponsNavigatePath?: string,
    referralProgramNavigatePath?: string,
    wishlistNavigatePath?: string,
    firstName?: string,
    lastName?: string,
    enableCouponWallet?: boolean,
    enableReferralProgramItemMenu?: boolean,
    enableWishlist?: boolean,
    onLogout?: Function
}

export function AccountMenuComponent(props: Props) {
    const {formatMessage} = useIntl();
    const {pathname} = useLocation();
    const {
        accountPath = '',
        infoNavigatePath = '',
        addressesNavigatePath = '',
        ordersNavigatePath = '',
        preferencesNavigatePath,
        securityNavigatePath = '',
        couponsNavigatePath = '',
        referralProgramNavigatePath = '',
        wishlistNavigatePath = '',
        firstName,
        lastName,
        enableCouponWallet,
        enableReferralProgramItemMenu,
        enableWishlist,
        onLogout
    } = props;

    const storeCode = getStoreCodeByPathname();
    const enableMarketingPreferences = storeCode === 'ph';

    return (
        <div className="account-menu-component">
            <AccountMenuTitleComponent firstName={firstName}
                                       lastName={lastName}/>
            <NavLink className="account-menu-component-link account-menu-component-link-info"
                     to={infoNavigatePath}
                     isActive={() => pathname === infoNavigatePath || pathname === accountPath}>
                {formatMessage(messages.information_link)}
            </NavLink>
            <NavLink className="account-menu-component-link account-menu-component-link-security"
                     to={securityNavigatePath}>
                {formatMessage(messages.security_link)}
            </NavLink>
            <NavLink className="account-menu-component-link account-menu-component-link-address"
                     to={addressesNavigatePath}>
                {formatMessage(messages.address_book_title)}
            </NavLink>
            <NavLink className="account-menu-component-link account-menu-component-link-orders"
                     to={ordersNavigatePath}>
                {formatMessage(messages.orders_title)}
            </NavLink>
            {enableMarketingPreferences && (
                <NavLink className="account-menu-component-link account-menu-component-link-preferences"
                         to={preferencesNavigatePath}>
                    {formatMessage(custom_messages.marketing_preferences_title)}
                </NavLink>
            )}
            {enableCouponWallet && (
                <NavLink className="account-menu-component-link account-menu-component-link-coupons"
                         to={couponsNavigatePath}>
                    {formatMessage(custom_messages.coupons_title)}
                </NavLink>
            )}
            {enableReferralProgramItemMenu && (
                <NavLink className="account-menu-component-link account-menu-component-link-referral"
                         to={referralProgramNavigatePath}>
                    {formatMessage(custom_messages.referral_title)}
                </NavLink>
            )}
            {enableWishlist && (
                <NavLink className="account-menu-component-link account-menu-component-link-wishlist"
                         to={wishlistNavigatePath}>
                    {formatMessage(custom_messages.wishlist_title)}
                </NavLink>
            )}
            <LogoutContainer onLogout={onLogout}/>
        </div>
    );
}
