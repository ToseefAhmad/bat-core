import {getStorageManager} from '../../../common';

const REGISTER_URL = '/account/register';
let referralCode = null;

const getReferralCode = (pathname) => {
    const isRegisterUrl = pathname === REGISTER_URL;
    const {getStorageData} = getStorageManager();

    return isRegisterUrl
        ? getStorageData(localStorage, 'referralCode') || ''
        : pathname && pathname.startsWith(REGISTER_URL) ? pathname.replace(`${REGISTER_URL}`, '').replace(/\//g, '') : null;
};

export const getReferralManager = () => {
    return {
        getCode: (pathname) => {
            if (!referralCode) referralCode = getReferralCode(pathname);
            return referralCode;
        },
        setCode: (code) => {
            referralCode = code;
        },
        clearCode: () => {
            referralCode = null;
        }
    };
};
