import {useMemo, useCallback} from 'react';
import {useIntl} from 'react-intl';
import {castArray, isEmpty} from 'lodash';

import {getStoreCodeByPathname, getPhonePrefixByStoreCode} from '../util';

import messages from '../components/FormInput.component/resources/messages';

type Field = 'email' | 'firstName' | 'lastName' | 'message' | 'phone' | 'referral' | 'street' | 'postcode';
type StoresRulesConfig = {
    /**
     * List of stores to apply rule
     */
    apply?: Array<string> | string,
    /**
     * List of stores to skip rule
     */
    skip?: Array<string> | string,
    /**
     * Flag is used to skip the phone prefix in validation
     */
    skipPhonePrefix?: boolean
}

const SM_LENGTH = 40;
const LG_LENGTH = 80;
const MAX_LENGTH_BEFORE_AT_SIGN = 64; // default Magento validation
const MESSAGE_MAX_LENGTH = 32000;
const STREET_MIN_LENGTH = 10;
const PHONE_MIN_LENGTH = {
    default: 7,
    uae: 9
};
const PHONE_MAX_LENGTH = {
    my: 10
};
const PASSWORD_MIN_LENGTH_DEFAULT = 8;
const POSTCODE_MIN_LENGTH = {
    ph: 4,
    id: 5
};
const POSTCODE_MAX_LENGTH = {
    ph: 4,
    id: 5,
    uae: 6
};

export const useFormInputRules = () => {
    const {formatMessage} = useIntl();
    const storeCode = getStoreCodeByPathname();

    const getMaxLengthRule = useCallback((field: Field, config?: StoresRulesConfig) => {
        const {apply, skip} = config || {};

        if (skip && castArray(skip).includes(storeCode)) return true;
        if (apply && !castArray(apply).includes(storeCode)) return true;

        const maxLengthPostcode = POSTCODE_MAX_LENGTH[storeCode];

        switch (field) {
            case 'email':
                return {
                    maxLength: {
                        value: LG_LENGTH,
                        message: formatMessage(messages.error_max_length, {
                            field: formatMessage(messages.email),
                            number: LG_LENGTH
                        })
                    }
                };

            case 'firstName':
                return {
                    maxLength: {
                        value: SM_LENGTH,
                        message: formatMessage(messages.error_max_length, {
                            field: formatMessage(messages.first_name),
                            number: SM_LENGTH
                        })
                    }
                };

            case 'lastName':
                return {
                    maxLength: {
                        value: LG_LENGTH,
                        message: formatMessage(messages.error_max_length, {
                            field: formatMessage(messages.last_name),
                            number: LG_LENGTH
                        })
                    }
                };

            case 'message':
                return {
                    maxLength: {
                        value: MESSAGE_MAX_LENGTH,
                        message: formatMessage(messages.error_max_length_message, {
                            number: MESSAGE_MAX_LENGTH
                        })
                    }
                };

            case 'phone':
                return PHONE_MAX_LENGTH[storeCode] && {
                    maxLength: {
                        value: PHONE_MAX_LENGTH[storeCode],
                        message: formatMessage(messages.phone_error)
                    }
                };

            case 'referral':
                return {
                    maxLength: {
                        value: SM_LENGTH,
                        message: formatMessage(messages.error_max_length, {
                            field: formatMessage(messages.referral_code),
                            number: SM_LENGTH
                        })
                    }
                };

            case 'postcode':
                return maxLengthPostcode && {
                    maxLength: {
                        value: maxLengthPostcode,
                        message: formatMessage(messages.error_max_length, {
                            field: formatMessage(messages.postcode),
                            number: maxLengthPostcode
                        })
                    }
                };

            default:
                return {};
        }
    }, [formatMessage, storeCode]);

    const getMinLengthRule = useCallback((field: Field, {apply, skipPhonePrefix}: StoresRulesConfig = {}) => {
        const minLengthPostcode = POSTCODE_MIN_LENGTH[storeCode];

        switch (field) {
            case 'phone': {
                const isSkipPrefix = skipPhonePrefix && castArray(apply).includes(storeCode);
                const minLength = PHONE_MIN_LENGTH[storeCode] || PHONE_MIN_LENGTH.default;
                const phoneCode = getPhonePrefixByStoreCode(storeCode);
                const phoneCodeLength = phoneCode.replace(/\+/g, '').length;
                const validLength = isSkipPrefix ? minLength - phoneCodeLength : minLength;

                return {
                    minLength: {
                        value: validLength,
                        message: formatMessage(messages.phone_error)
                    }
                };
            }

            case 'street':
                return {
                    minLength: {
                        value: STREET_MIN_LENGTH,
                        message: formatMessage(messages.error_street_min_length, {
                            number: STREET_MIN_LENGTH
                        })
                    }
                };

            case 'postcode':
                return minLengthPostcode && {
                    minLength: {
                        value: minLengthPostcode,
                        message: formatMessage(messages.error_min_length, {
                            field: formatMessage(messages.postcode),
                            number: minLengthPostcode
                        })
                    }
                };

            default:
                return {};
        }
    }, [formatMessage, storeCode]);

    const getTrimRule = useCallback((value: string) => (
        isEmpty(value) || !!value.trim() || formatMessage(messages.error_spaces_trim)
    ), [formatMessage]);

    const getEmailRule = useCallback((value: string) => {
        if (!value) return true;

        const [chars] = value.split('@');

        if (chars.length <= MAX_LENGTH_BEFORE_AT_SIGN) return true;

        return formatMessage(messages.email_error_max_length, {
            number: MAX_LENGTH_BEFORE_AT_SIGN
        });
    }, [formatMessage]);

    const getPasswordRule = useCallback((minLength = PASSWORD_MIN_LENGTH_DEFAULT, passwordRequiredClassesCount) => ({
        minLength: {
            value: minLength,
            message: formatMessage(messages.error_password)
        },
        validate: (value) => {
            if (!value) return true;

            let count = 0;

            // Digits
            if (/[0-9]+/.test(value)) {
                count += 1;
            }

            // Upper Case
            if (/[A-Z]+/.test(value)) {
                count += 1;
            }

            // Lower Case
            if (/[a-z]+/.test(value)) {
                count += 1;
            }

            // Special Characters
            if (/[^a-zA-Z0-9]+/.test(value)) {
                count += 1;
            }

            if (count >= passwordRequiredClassesCount) return true;

            return formatMessage(messages.error_password);
        }
    }), [formatMessage]);

    const getLoginFieldRule = useCallback((value) => {
        if (!value) return true;
        const phoneCode = getPhonePrefixByStoreCode(storeCode);
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phonePattern = new RegExp(`^\\${phoneCode}[0-9]{${PHONE_MIN_LENGTH.default},}$`, 'g');

        if (phonePattern.test(value) || emailPattern.test(value)) {
            return true;
        }

        return formatMessage(messages.error_phone_login, {phoneCode});
    }, [formatMessage]);

    const getPhoneRule = useCallback(() => ({
        validate: (value) => {
            if (!value) return true;

            if (!(/^\+?\d+$/.test(value))) {
                return formatMessage(messages.phone_number_error);
            }

            const phoneMinLength = value.replace(/\D/g, '').length;
            const minLength = PHONE_MIN_LENGTH[storeCode] || PHONE_MIN_LENGTH.default;
            if (phoneMinLength < minLength) {
                return formatMessage(messages.phone_minlength_error, {number: minLength});
            }
        }
    }), [formatMessage, storeCode]);

    return useMemo(() => (
        {
            getMaxLengthRule,
            getMinLengthRule,
            getTrimRule,
            getEmailRule,
            getPasswordRule,
            getLoginFieldRule,
            getPhoneRule
        }
    ), [
        getMaxLengthRule,
        getMinLengthRule,
        getTrimRule,
        getEmailRule,
        getPasswordRule,
        getLoginFieldRule,
        getPhoneRule
    ]);
};
