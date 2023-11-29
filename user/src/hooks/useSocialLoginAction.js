import {useCallback} from 'react';
import {useHistory, useLocation} from 'react-router';

import {parseUrlQuery} from '@luft/util';

import {useStorage} from '../../../common';
import type {UserForSocialRegister} from '../../../types';

const checkUserDataValidity = (userData: UserForSocialRegister) => {
    if (!userData) return false;

    return Object.values(userData).every(Boolean);
};

export const useSocialLoginAction = () => {
    const history = useHistory();
    const {search, pathname} = useLocation();
    const {popValue} = useStorage({storage: sessionStorage});

    const isCheckoutPathname = pathname.includes('checkout');
    const {checkout} = parseUrlQuery(search) || {};
    const returnToCheckout = isCheckoutPathname || !!checkout;

    return useCallback(({data, error, isAuthorized, socialName, isDisabledRegistration}) => {
        const userData = data?.socialLogin?.user_for_social_register;
        const isValidUserData = checkUserDataValidity(userData);
        // Right now this value is used only as product url, which is needed to be
        // able to return to product page after trying to add a review as a guest.
        // But it could be something else in a future
        const productUrl = popValue('from');

        if (isValidUserData && !isDisabledRegistration) {
            return history.replace('/account/register?social_register=true', {
                socialRegisterInput: userData,
                from: returnToCheckout ? '/checkout' : productUrl,
                socialName
            });
        }

        if (isValidUserData && isDisabledRegistration && !returnToCheckout) {
            return history.replace('/account/login', {
                showDisabledRegistrationToast: true
            });
        }

        if (error) {
            return history.replace('/account/login', {error: {...error}});
        }

        if (isAuthorized && !returnToCheckout) {
            return history.replace('/account/security');
        }

        if (returnToCheckout) {
            return history.replace('/checkout', {
                showDisabledRegistrationToast: isDisabledRegistration && isValidUserData
            });
        }

        if (productUrl) {
            return history.replace(productUrl);
        }

        history.replace('/account');
    }, [history, popValue, returnToCheckout]);
};
