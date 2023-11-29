import React, {useEffect} from 'react';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';
import {parse as parseDate} from 'date-fns';

import {
    LoaderComponent,
    ErrorComponent,
    FormGroupComponent
} from '@luft/common';

import {
    getDateFormatByStoreCode,
    getFormattedDate,
    getStoreCodeByPathname,
    useStorage,
    isValidDob
} from '../../../../common';
import {useLegalAge} from '../../../../restrict-access';

import messages from './resources/messages';

type Props = {
    /**
     * User's day of birth
     */
    dob?: string,
    /**
     * Error, identifies fetch data failure
     */
    error?: Error,
    /**
     * Loading state, identifies fetch data processing
     */
    loading?: boolean,
    /**
     * Flag, which indicates that ktp id validation for guest is enabled
     */
    isGuestValidateKtpIdEnabled?: boolean,
    /**
     * Callback on save of day of birth
     */
    onAdd?: Function,
    /**
     * Callback on set DOB error
     */
    onSetDobError?: Function
};

const HOUR = 60 * 60 * 1000;

export function CheckoutDobComponent(props: Props) {
    const {
        dob,
        error,
        loading,
        isGuestValidateKtpIdEnabled,
        onAdd,
        onSetDobError
    } = props;

    const {formatMessage} = useIntl();
    const {register, errors, handleSubmit, formState, setValue, trigger} = useForm({reValidateMode: 'onSubmit', mode: 'onBlur'});
    const {dateFormat} = getDateFormatByStoreCode();
    const {legalAge, legalDate} = useLegalAge();
    const {setValue: setDobValue} = useStorage({key: 'dob'});
    const storeCode = getStoreCodeByPathname();

    const isIndonesia = storeCode === 'id';

    // Update actual form value if dob was changed
    useEffect(() => {
        if (!dob) return;

        setValue('dob', getFormattedDate(dob));
        setDobValue(dob);
    }, [dob, setValue, setDobValue]);

    useEffect(() => {
        if (!onSetDobError) return;

        if (Object.keys(formState?.errors).length) {
            onSetDobError(true);
        } else {
            onSetDobError(false);
        }
    }, [formState]);

    const handleValidateDateOfBirth = (value) => {
        const date = parseDate(value, dateFormat, new Date());

        if (!isValidDob(date)) {
            return formatMessage(messages.incorrect_date_format);
        }

        return legalDate >= date || formatMessage(messages.error_message, {age: legalAge});
    };

    const handleSetDob = ({target}) => {
        const {value} = target;
        const isValid = handleValidateDateOfBirth(value);
        const currentDob = getFormattedDate(dob);

        if (isValid !== true || value === currentDob) return;

        const dobDate = getFormattedDate(value, true);
        onAdd(dobDate);
    };

    return (
        <div className="checkout-dob-component">
            <div className="checkout-dob-component-title">
                {formatMessage(messages.dob)}
            </div>
            <form noValidate
                  className="checkout-ktp-dob-component-form"
                  onSubmit={handleSubmit(onAdd)}>
                {loading && <LoaderComponent type="overlay"/>}
                {error && <ErrorComponent error={error}/>}
                <FormGroupComponent controlId="dob"
                                    type="datepicker"
                                    name="dob"
                                    autoComplete="off"
                                    errors={errors}
                                    label={formatMessage(messages.dob)}
                                    isLabelActive={true}
                                    defaultValue={dob}
                                    ref={null}
                                    register={register({
                                        required: true,
                                        validate: handleValidateDateOfBirth
                                    })}
                                    disabled={isIndonesia && isGuestValidateKtpIdEnabled}
                                    trigger={trigger}
                                    onBlur={handleSetDob}
                                    dateFormat={dateFormat}
                                    placeholder={dateFormat}
                                    datePickerProps={{
                                        disabledDays: [{
                                            after: new Date(Date.now() - 24 * HOUR)
                                        }]
                                    }}/>
            </form>
        </div>
    );
}
