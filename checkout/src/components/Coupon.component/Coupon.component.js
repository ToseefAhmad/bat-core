import React, {useContext, useEffect} from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';
import type {RefObject} from 'react';

import {
    ButtonComponent,
    FormGroupComponent,
    LoaderComponent,
    ErrorComponent
} from '@luft/common';
import {CmsBlockContainer} from '@luft/cms';
import type {CartCoupon} from '@luft/types';

import messages from '@luft/checkout/src/components/Coupon.component/resources/messages';

import {useFormInputRules} from '../../../../common';
import {CheckoutContext} from '../../contexts';

type Props = {
    coupons: CartCoupon[],
    error?: Error,
    loading?: boolean,
    onAdd?: Function,
    couponInputRef: RefObject
};

export function CouponComponent(props: Props) {
    const {
        coupons,
        error,
        loading,
        onAdd = noop,
        couponInputRef
    } = props;

    const {formatMessage} = useIntl();
    const {register, errors, handleSubmit, reset, clearErrors} = useForm();
    const {onSetCheckoutErrors} = useContext(CheckoutContext);
    const {getTrimRule} = useFormInputRules();

    useEffect(() => {
        if (!errors.code) return;

        onSetCheckoutErrors(errors, 'incorrect promo code');
        const timer = setTimeout(() => clearErrors('code'), 5000);

        return () => clearTimeout(timer);
    }, [errors, clearErrors, onSetCheckoutErrors]);

    if (coupons && coupons.length > 0) {
        return null;
    }

    const handleOnAdd = async ({code}) => {
        await onAdd(code);

        reset();
    };

    return (
        <form noValidate
              className="coupon-component"
              onSubmit={handleSubmit(handleOnAdd)}>
            {loading && <LoaderComponent type="overlay"/>}

            <div className="coupon-component-title">
                <CmsBlockContainer cmsBlockId="coupon-cms-title"/>
            </div>

            {error && <ErrorComponent error={error}/>}

            <div className="coupon-component-body">
                <FormGroupComponent controlId="couponCode"
                                    name="code"
                                    label={formatMessage(messages.coupon_label)}
                                    variant="secondary"
                                    errors={errors}
                                    ref={(ref) => {
                                        couponInputRef.current = ref;
                                        register(ref, {
                                            required: true,
                                            validate: getTrimRule
                                        });
                                    }}/>

                <div className="coupon-component-actions">
                    <ButtonComponent className="coupon-component-submit"
                                     variant="secondary"
                                     type="submit"
                                     disabled={loading}
                                     title={formatMessage(messages.coupon_apply)}>
                        {formatMessage(messages.coupon_apply)}
                    </ButtonComponent>
                </div>
            </div>
        </form>
    );
}
