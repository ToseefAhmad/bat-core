import React, {
    forwardRef,
    useRef,
    useImperativeHandle,
    useEffect,
    useCallback
} from 'react';
import {useIntl} from 'react-intl';
import {isUndefined, noop} from 'lodash';
import Select from 'react-select';
import classnames from 'classnames';

import {FormInputComponent} from '@luft/common';

import messages from '@luft/common/src/components/Select.component/resources/messages';

// Temp solution - https://github.com/JedWatson/react-select/issues/2872
const styles = {
    clearIndicator: noop,
    container: noop,
    control: noop,
    dropdownIndicator: noop,
    group: noop,
    groupHeading: noop,
    indicatorsContainer: noop,
    indicatorSeparator: noop,
    input: noop,
    loadingIndicator: noop,
    loadingMessage: noop,
    menu: noop,
    menuList: noop,
    menuPortal: noop,
    multiValue: noop,
    multiValueLabel: noop,
    multiValueRemove: noop,
    noOptionsMessage: noop,
    option: noop,
    placeholder: noop,
    singleValue: noop,
    valueContainer: noop
};

type Props = {
    /**
     * From Control id
     */
    id?: string,
    /**
     * From Control id alias
     */
    controlId?: string,
    /**
     * Current value
     */
    value?: string,
    /**
     * Array of objects, that provides list of available options
     */
    options: { code: string, name: string }[],
    /**
     * custom key for option value
     */
    optionValueKey?: string,
    /**
     * custom key for option name
     */
    optionNameKey?: string,
    /**
     * Select styling variant with no label
     */
    variant?: 'no-label' | 'default',
    /**
     * Default option message
     */
    defaultOptionMessage?: string,
    /**
     * If default option with empty value should be added.
     */
    defaultOption?: boolean,
    /**
     * control default value
     */
    defaultValue?: string,
    /**
     * If selected option can be cleared
     */
    isClearable?: boolean,
    /**
     * callback fired on select value change
     */
    onChange?: (React.SyntheticEvent) => void,
    /**
     * custom className
     */
    className?: string,
    /**
     * Flag is used for setting the first option as default value
     */
    setFirstValueAsDefault?: boolean
};

/**
 * Custom styled Select component
 */
export const SelectComponent = forwardRef((
    {
        id,
        controlId,
        value,
        options,
        optionValueKey = 'code',
        optionNameKey = 'name',
        variant,
        isClearable = false,
        defaultOption = true,
        defaultOptionMessage,
        defaultValue,
        onChange = noop,
        className,
        setFirstValueAsDefault,
        ...rest
    }: Props, forwardedRef) => {
    const {formatMessage} = useIntl();
    const ref = useRef();
    useImperativeHandle(forwardedRef, () => ref.current);

    const handleOnChange = useCallback(option => {
        if (!ref.current || isUndefined(window)) return;
        const setter = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value').set;

        setter.call(ref.current, option ? option[optionValueKey] : null);
        ref.current.dispatchEvent(new Event('change', {bubbles: true}));
    }, [ref, optionValueKey]);

    const handleOnBlur = useCallback(() => {
        if (!ref.current || isUndefined(window)) return;
        ref.current.dispatchEvent(new Event('blur', {bubbles: true}));
    }, [ref]);

    useEffect(() => {
        if (!setFirstValueAsDefault || !onChange || !options) return;

        // Manually set first option's value, if it was not set for some reason
        if (!ref.current.value) {
            const firstOptionValue = options?.[0]?.[optionValueKey];

            ref.current.value = firstOptionValue;
        }

        onChange({target: ref.current}, {setFirstValueAsDefault});
    }, [setFirstValueAsDefault, options, optionValueKey, onChange]);

    const getOptionByValue = useCallback(
        (val) => options?.find(i => i[optionValueKey] === val),
        [options, optionValueKey]
    );

    const getNativeSelectValue = (selectedValue) => {
        if (setFirstValueAsDefault && !selectedValue) {
            return options?.[0]?.[optionValueKey];
        }

        return selectedValue;
    };

    const getCustomSelectValue = (selectedValue) => {
        if (setFirstValueAsDefault && !selectedValue) {
            return getOptionByValue(options?.[0]?.[optionValueKey]);
        }

        return getOptionByValue(selectedValue);
    };

    const isUncontrolled = isUndefined(value);

    const nativeSelectProps = {
        ...(isUncontrolled ? {
            defaultValue: getNativeSelectValue(defaultValue)
        } : {
            value: getNativeSelectValue(value) || undefined
        })
    };
    const customSelectProps = {
        ...(isUncontrolled ? {
            defaultValue: getCustomSelectValue(defaultValue)
        } : {
            value: getCustomSelectValue(value) || null
        })
    };

    return (
        <>
            <FormInputComponent {...rest}
                                {...nativeSelectProps}
                                as="select"
                                id={id || controlId}
                                className={classnames('select-component', className)}
                                onChange={onChange}
                                ref={ref}>
                {defaultOption && (
                    <option value="">
                        {defaultOptionMessage || formatMessage(messages.select_option)}
                    </option>
                )}
                {options && options.map((o) => (
                    <option key={o.id || o[optionValueKey]}
                            value={o[optionValueKey]}>
                        {o[optionNameKey]}
                    </option>
                ))}
            </FormInputComponent>
            <Select className={classnames('select-component', 'select-component-custom', className, {
                [`select-component-${variant}`]: variant
            })}
                    {...customSelectProps}
                    classNamePrefix="select-component-custom"
                    isClearable={isClearable}
                    placeholder={defaultOptionMessage || formatMessage(messages.select_option)}
                    getOptionLabel={option => option[optionNameKey]}
                    getOptionValue={option => option[optionValueKey]}
                    options={options}
                    styles={styles}
                    aria-labelledby={id || controlId}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}/>
        </>
    );
});

SelectComponent.displayName = 'SelectComponent';
