import React, {useState, useEffect} from 'react';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';
import classnames from 'classnames';
import {noop} from 'lodash';

import {
    ButtonComponent,
    FormGroupComponent,
    LoaderComponent,
    ErrorComponent,
    CheckboxComponent
} from '@luft/common';

import {getStoreCodeByPathname, useFormInputRules} from '../../../../common';

import messages from './resources/messages';

type PointsSettings = {
    /**
     * Minimum amount of reward points to spend
     */
    min_spend_points: number;
    /**
     * Maximum amount of reward points to spend
     */
    max_spend_points: number;
};

type Props = {
    /**
     * Reward points settings
     */
    pointsSettings: PointsSettings,
    /**
     * Amount of available reward points
     */
    availablePoints: number,
    /**
     * Amount of applied reward points
     */
    appliedPoints: number,
    /**
     * Loading state
     */
    loading: boolean,
    /**
     * Error for represent
     */
    error?: Error,
    /**
     * Apply reward points callback
     */
    onApplyPointsToCart: Function,
    /**
     * Remove reward points callback
     */
    onRemovePointsFromCart: Function
};

export function RewardPointsComponent(props: Props) {
    const {
        pointsSettings,
        availablePoints,
        appliedPoints,
        loading,
        error,
        onApplyPointsToCart,
        onRemovePointsFromCart
    } = props;
    const {
        min_spend_points,
        max_spend_points
    } = pointsSettings;

    const {formatMessage, formatNumber} = useIntl();
    const {register, errors, handleSubmit, setValue, clearErrors} = useForm();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const isSArabia = getStoreCodeByPathname() === 'sa';
    const {getTrimRule} = useFormInputRules();

    useEffect(() => {
        if (!error) return;

        // Reset the checkbox if something went wrong
        setValue('use_maximum', false);
    }, [error, setValue]);

    useEffect(() => {
        if (!errors.reward_points) return;

        const timer = setTimeout(() => clearErrors('reward_points'), 3000);

        return () => clearTimeout(timer);
    }, [errors.reward_points, clearErrors]);

    if (!availablePoints) return null;

    const handleOnApplyPoints = ({reward_points}) => {
        if (error) {
            setValue('use_maximum', false);
        }

        onApplyPointsToCart(+reward_points);
    };

    const handleUseMaximumPoints = () => {
        if (errors.reward_points) {
            clearErrors('reward_points');
        }

        onApplyPointsToCart(max_spend_points);
    };

    const handleToggleCollapse = () => setIsCollapsed(prevState => !prevState);
    const handleChangeInput = ({target}) => setValue('reward_points', target.value.replace(/\D/g, ''));

    const getFormattedNumber = value => {
        if (isSArabia) {
            return new Intl.NumberFormat('en').format(value);
        }

        return formatNumber(value);
    };

    const renderPointsValue = (text) => (
        <span key={text}
              className="reward-points-component-value">
            {text}
        </span>
    );

    const titleClassNames = classnames('reward-points-component-title', {
        'reward-points-component-title-active': !isCollapsed
    });
    const contentClassNames = classnames('reward-points-component-content', {
        'reward-points-component-content-collapsed': isCollapsed
    });

    const minimumPointsError = formatMessage(messages.min_amount_error, {
        amount: getFormattedNumber(min_spend_points)
    });
    const maximumPointsError = formatMessage(messages.max_amount_error, {
        amount: getFormattedNumber(max_spend_points)
    });

    const isMinPointsError = errors.reward_points?.type === 'min';
    const isDisabled = !max_spend_points;

    return (
        <div className="reward-points-component">
            <div className={titleClassNames}
                 role="button"
                 tabIndex="0"
                 onClick={handleToggleCollapse}
                 onKeyPress={noop}>
                {formatMessage(messages.title)}
            </div>

            {loading && <LoaderComponent type="overlay"/>}
            {error && <ErrorComponent error={error}/>}

            <div className={contentClassNames}>
                {!appliedPoints ? (
                    <>
                        <div className="reward-points-component-text">
                            {formatMessage(messages.available_points, {
                                amount: getFormattedNumber(availablePoints),
                                bold: renderPointsValue
                            })}
                        </div>

                        <form noValidate
                              className="reward-points-component-form"
                              onSubmit={handleSubmit(handleOnApplyPoints)}>
                            <div className="reward-points-component-body">
                                <div className="reward-points-component-input-wrapper">
                                    <FormGroupComponent controlId="rewardPoints"
                                                        name="reward_points"
                                                        label={formatMessage(messages.label)}
                                                        variant="secondary"
                                                        errors={errors}
                                                        disabled={isDisabled}
                                                        onInput={handleChangeInput}
                                                        ref={register({
                                                            required: formatMessage(messages.required_error),
                                                            min: {
                                                                value: min_spend_points,
                                                                message: minimumPointsError
                                                            },
                                                            max: {
                                                                value: max_spend_points,
                                                                message: maximumPointsError
                                                            },
                                                            validate: getTrimRule
                                                        })}/>

                                    {!isMinPointsError && (
                                        <div className="reward-points-component-min-points">
                                            {minimumPointsError}
                                        </div>
                                    )}
                                </div>

                                <div className="reward-points-component-actions">
                                    <ButtonComponent className="reward-points-component-submit"
                                                     variant="secondary"
                                                     type="submit"
                                                     disabled={loading || isDisabled}
                                                     title={formatMessage(messages.apply_button)}>
                                        {formatMessage(messages.apply_button)}
                                    </ButtonComponent>
                                </div>
                            </div>
                        </form>

                        <CheckboxComponent id="use-maximum-reward-points"
                                           className="reward-points-component-checkbox"
                                           label={formatMessage(messages.use_maximum_points, {
                                               amount: getFormattedNumber(max_spend_points),
                                               bold: renderPointsValue
                                           })}
                                           disabled={isDisabled}
                                           name="use_maximum"
                                           ref={register}
                                           onChange={handleUseMaximumPoints}/>
                    </>
                ) : (
                    <div className="reward-points-component-applied-points">
                        <span className="reward-points-component-applied-points-title">
                            {formatMessage(messages.applied_points, {
                                amount: getFormattedNumber(appliedPoints)
                            })}
                        </span>

                        <ButtonComponent className="reward-points-component-cancel"
                                         variant="link"
                                         inline={true}
                                         disabled={loading}
                                         title={formatMessage(messages.cancel_button)}
                                         onClick={onRemovePointsFromCart}>
                            {formatMessage(messages.cancel_button)}
                        </ButtonComponent>
                    </div>
                )}
            </div>
        </div>
    );
}
