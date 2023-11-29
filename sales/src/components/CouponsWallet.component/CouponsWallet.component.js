import React from 'react';
import {useIntl} from 'react-intl';
import {Link} from 'react-router-dom';

import {LoaderComponent, ErrorComponent} from '@luft/common';
import type {CartCoupon} from '@luft/types';

import {CouponsWalletItemComponent} from '../CouponsWalletItem.component';
import {getStoreCodeByPathname} from '../../../../common';

import messages from './resources/messages';

type Props = {
    coupons: CartCoupon[],
    error?: Error,
    loading?: boolean
};

export function CouponsWalletComponent(props: Props) {
    const {
        coupons,
        error,
        loading,
        ...other
    } = props;
    const {formatMessage} = useIntl();
    const storeCode = getStoreCodeByPathname();

    const linkPath = storeCode === 'id' ? '/hubungi-kami' : '/contact-us';
    const supportLink = (
        <Link title={formatMessage(messages.click_here)}
              role="link"
              to={linkPath}>
            {formatMessage(messages.click_here)}
        </Link>
    );

    const isInvalidCoupon = error?.graphQLErrors?.[0]?.extensions?.category === 'graphql-invalid-coupon';
    const invalidCouponError = isInvalidCoupon && {
        message: formatMessage(messages.code_invalid, {support_link: supportLink})
    };

    return (
        <div className="coupons-wallet-component">
            {loading && <LoaderComponent type="overlay"/>}
            {error && <ErrorComponent error={invalidCouponError || error}/>}
            {coupons?.length ? (
                <>
                    {coupons.map((coupon) => (
                        <CouponsWalletItemComponent {...other}
                                                    key={coupon.id}
                                                    coupon={coupon}/>)
                    )}
                </>
            ) : (
                <div className="coupons-wallet-component-empty">
                    {formatMessage(messages.empty_message)}
                </div>
            )}
        </div>
    );
}
