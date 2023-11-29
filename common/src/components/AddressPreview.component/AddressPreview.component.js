import React from 'react';
import classnames from 'classnames';

import type {Address} from '@luft/types';

import {getStoreCodeByPathname} from '../../util';

type Props = {
    address: Address,
    email?: string,
    className?: string,
};

const STORES_USE_REGION_NAME = ['ph', 'my', 'sa', 'uae'];

export function AddressPreviewComponent(props: Props) {
    const {address, email, className} = props;

    if (!address) {
        return null;
    }

    const storeCode = getStoreCodeByPathname();
    const isUsedRegionName = STORES_USE_REGION_NAME.includes(storeCode);

    const {
        city,
        company,
        country,
        district,
        firstname,
        lastname,
        postcode,
        region,
        street,
        telephone
    } = address;

    const regionValue = isUsedRegionName ? region?.name : region?.code;
    const name = [firstname, lastname].filter(Boolean).join(' ');
    const line1 = [company, ...street || ''].filter(Boolean).join(', ');
    const line2 = [district, city, regionValue, country?.name, postcode].filter(Boolean).join(', ');

    return (
        <div className={classnames('address-preview-component', className)}>
            {(firstname || lastname) && (
                <div className="address-preview-component-name">
                    {name}
                </div>
            )}
            {line1 && (
                <div className="address-preview-component-line">
                    {line1}
                </div>
            )}
            {line2 && (
                <div className="address-preview-component-line">
                    {line2}
                </div>
            )}
            {telephone}
            {email && (
                <div className="address-preview-component-email">
                    {email}
                </div>
            )}
        </div>
    );
}
