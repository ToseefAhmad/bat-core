import React, {
    forwardRef,
    useState,
    useRef,
    useEffect,
    useCallback,
    useImperativeHandle
} from 'react';
import classNames from 'classnames';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {formatDate, parseDate} from 'react-day-picker/moment';
import {useIntl} from 'react-intl';
import {isUndefined} from 'lodash';

import {FormInputComponent} from '@luft/common';
import {DayPickerYearMonthComponent} from '@luft/common/src/components/DayPickerYearMonth.component';

import messages from '@luft/common/src/components/Datepicker.component/resources/messages';

type Props = {
    /**
     * Datepicker input name
     */
    name: string,
    /**
     * Datepicker default value
     */
    defaultValue?: string,
    /**
     * If datepicker input is a required field
     */
    required?: boolean,
    /**
     * Datepicker string format
     */
    dateFormat?: string,
    /**
     * Placeholder string
     */
    placeholder?: string,
    /**
     * datepicker configuration props
     * Please visit https://github.com/gpbl/react-day-picker for more details
     */
    datePickerProps?: Object,
    /**
     * register prop for React Hook Forms register function
     * https://react-hook-form.com/api#register
     */
    register?: (React.Ref, options?: Object) => void,
    /**
     * trigger prop for React Hook Forms trigger function
     * https://react-hook-form.com/api#trigger
     */
    trigger?: (payload?: string | string[]) => Promise<boolean>,
    /**
     * Callback, fired when value changes
     */
    onChange?: (React.SyntheticEvent) => void,
    /**
     * Custom className
     */
    className?: string,
    /**
     * If datepicker is disabled
     */
    disabled?: boolean
};

/**
 * Configurable Datepicker input
 */
export const DatepickerComponent = forwardRef((
    {
        name,
        defaultValue,
        required,
        dateFormat: _dateFormat = 'MM/DD/YYYY',
        placeholder = _dateFormat,
        datePickerProps = {},
        register,
        trigger,
        className,
        disabled = false,
        ...other
    }: Props, ref) => {
    // TODO: `moment.js` uses "DD/MM/YYYY" format, when `date-fns` uses "dd/MM/yyyy".
    // Remove this transformation after moving to `date-fns`
    const dateFormat = _dateFormat.toUpperCase();

    // remove props, that should not used on form input
    const {type, ...clearedOther} = other;

    const {formatMessage} = useIntl();

    const inputRef = useRef();
    const datepickerRef = useRef();
    useImperativeHandle(ref, () => inputRef);

    const [showOverlay, setShowOverlay] = useState(false);
    const [isValidDay, setIsValidDay] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [month, setMonth] = useState(() => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        return new Date(currentYear, currentMonth);
    });

    const isValid = useCallback(() => {
        if (!isValidDay) {
            return formatMessage(messages.invalid);
        }
        if (isDisabled) {
            return formatMessage(messages.unavailable);
        }
        return true;
    }, [isValidDay, isDisabled, formatMessage]);

    // https://stackoverflow.com/questions/23892547/what-is-the-best-way-to-trigger-onchange-event-in-react-js
    const emitNativeOnChange = useCallback((val) => {
        if (!inputRef.current || isUndefined(window)) return;
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        const event = new Event('input', {bubbles: true});
        setter.call(inputRef.current, val);
        inputRef?.current.dispatchEvent(event);
    }, [inputRef]);

    const handleOnDayChange = useCallback((selectedDay, modifiers, dayPickerInput) => {
        const input = dayPickerInput.getInput();
        const _disabled = modifiers.disabled === true;
        const fieldIsEmpty = !dayPickerInput.input.value;
        const dayIsValid = typeof selectedDay !== 'undefined';

        setIsValidDay(fieldIsEmpty || dayIsValid);
        setIsDisabled(_disabled);
        const val = selectedDay && !_disabled ? formatDate(selectedDay, dateFormat) : input ? input.value : '';
        emitNativeOnChange(val);
    }, [dateFormat, emitNativeOnChange]);

    const handleOnDayPickerHide = useCallback(() => {
        if (isUndefined(window)) return;
        inputRef?.current?.dispatchEvent(new Event('blur', {bubbles: true}));
        setShowOverlay(false);
        if (trigger) {
            trigger(name);
        }
    }, [inputRef, setShowOverlay, trigger, name]);

    const wrapRef = useCallback((el) => {
        if (inputRef) {
            inputRef.current = el;
        }
        if (register) {
            register(el, {required, validate: isValid});
        }
    }, [register, inputRef, required, isValid]);

    const handleOnDayPickerShow = useCallback(() => setShowOverlay(true), [setShowOverlay]);

    useEffect(() => {
        if (isUndefined(window)) return;
        const handleClick = (e) => setShowOverlay(datepickerRef?.current?.contains(e.target));

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [datepickerRef]);

    return (
        <div className="datepicker-component"
             ref={datepickerRef}>
            <FormInputComponent {...clearedOther}
                                name={name}
                                defaultValue={defaultValue && formatDate(defaultValue, dateFormat)}
                                className={className}
                                disabled={disabled}
                                ref={wrapRef}/>
            <DayPickerInput format={dateFormat}
                            dayPickerProps={{
                                month,
                                captionElement: captionProps => (
                                    <DayPickerYearMonthComponent {...captionProps}
                                                                 onChange={(date) => setMonth(date)}/>
                                ),
                                ...datePickerProps
                            }}
                            formatDate={formatDate}
                            parseDate={parseDate}
                            keepFocus={false}
                            showOverlay={showOverlay}
                            overlayComponent={({classNames: c, selectedDay, children, ...rest}) => showOverlay && (
                                <div className={c.overlayWrapper}
                                     {...rest}>
                                    <div className={c.overlay}>
                                        {children}
                                    </div>
                                </div>
                            )}
                            classNames={{
                                container: 'datepicker-component-container',
                                overlayWrapper: 'datepicker-component-popper',
                                overlay: 'datepicker-component-popper-body'
                            }}
                            onDayChange={handleOnDayChange}
                            onDayPickerShow={handleOnDayPickerShow}
                            onDayPickerHide={handleOnDayPickerHide}
                            value={defaultValue && formatDate(defaultValue, dateFormat)}
                            inputProps={{
                                className: classNames('form-input-component', className),
                                placeholder: placeholder.toUpperCase(),
                                disabled
                            }}/>
        </div>
    );
});

DatepickerComponent.displayName = 'DatepickerComponent';
