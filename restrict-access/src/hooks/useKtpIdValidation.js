import {isDate} from 'lodash';

import {useLegalAge} from './useLegalAge';
import {getStoreCodeByPathname} from '../../../common';
import type {StoreCode} from '../../../common';

type ValidationOptions = {
    /**
     * Store code, which will influence the type of validation
     */
    storeCode?: StoreCode
};

type ValidationResult = {
    /**
     * Flag, which indicates that `ktpId` is valid
     */
    isValid: boolean,
    /**
     * Reason why `ktpId` is invalid. For valid `ktpId` it will be null
     */
    reason: 'invalid-format' | 'invalid-age' | null
};

type FormatOptions = {
    /**
     * Ktp Id (National Id), entered by a user
     */
    ktpId: string,
    /**
     * Store code, which will influence the type of validation
     */
    storeCode: StoreCode
};

type AgeOptions = {
    /**
     * Ktp Id (National Id), entered by a user
     */
    ktpId: string,
    /**
     * Store code, which will influence the type of validation
     */
    storeCode: StoreCode,
    /**
     * Market's legal age (age of majority)
     */
    legalAge: number
};

const PK_MIN_DIGIT = 1;

const KTP_ID_LENGTH = {
    id: 16,
    pk: 13
};

const parseKtpId = (ktpId: string) => {
    const dob = ktpId.slice(6, 12);
    const day = parseInt(dob.slice(0, 2), 10);
    const currentYear = new Date().getFullYear() - 2000;

    // Male/female logic
    const year = dob.slice(-2);
    const dd = day <= 31 ? parseInt(day, 10) : parseInt(day - 40, 10);
    const mm = parseInt(dob.slice(2, 4), 10) - 1;
    const yy = parseInt(parseInt(year, 10) < currentYear ? `20${year}` : `19${year}`, 10);

    return {
        dob: new Date(yy, mm, dd),
        mm
    };
};

const isValidFormat = ({ktpId, storeCode}: FormatOptions) => {
    const ktpIdLength = KTP_ID_LENGTH[storeCode];

    if (!ktpId || !ktpIdLength) return false;

    const isValidLength = ktpId.length === ktpIdLength;

    switch (storeCode) {
        case 'id':
            return isValidLength;

        case 'pk': {
            const firstDigit = ktpId[0];

            return firstDigit >= PK_MIN_DIGIT && isValidLength;
        }

        default:
            return false;
    }
};

const isValidAge = ({ktpId, storeCode, legalAge}: AgeOptions) => {
    if (!ktpId || !legalAge) return false;

    switch (storeCode) {
        case 'id': {
            const {dob, mm} = parseKtpId(ktpId);

            if (!isDate(dob) || mm > 11) return false;

            const today = new Date();
            const m = today.getMonth() - dob.getMonth();
            let age = today.getFullYear() - dob.getFullYear();

            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                age -= 1;
            }

            return age >= legalAge;
        }

        case 'pk':
            return true;

        default:
            return false;
    }
};

/**
 * Get tools for ktp id validation, based on a market preferences
 *
 * @param {ValidationOptions=} options
 * @returns tools for validation
 *
 * @example
 * ```jsx
 * import {useKtpIdValidation} from 'bat-core/restrict-access';
 *
 * const {validateKtpId} = useKtpIdValidation();
 *
 * const handleValidateKtpId = (ktpId) => {
 *     const {isValid, reason} = validateKtpId(ktpId);
 *
 *     if (isValid) {
 *         // Do awesome stuff...
 *     } else {
 *         switch (reason) {
 *             // Handle error
 *         }
 *     }
 * };
 * ```
 */
export const useKtpIdValidation = ({
    storeCode = getStoreCodeByPathname(),
    ...opts
}: ValidationOptions = {}) => {
    const {legalAge} = useLegalAge(opts);

    return {
        validateKtpId: (ktpId: string): ValidationResult => {
            if (!isValidFormat({ktpId, storeCode})) {
                return {
                    isValid: false,
                    reason: 'invalid-format'
                };
            }

            if (!isValidAge({ktpId, storeCode, legalAge})) {
                return {
                    isValid: false,
                    reason: 'invalid-age'
                };
            }

            // Store previous `ktpId`
            localStorage?.setItem('ktpID', ktpId);

            return {
                isValid: true,
                reason: null
            };
        }
    };
};
