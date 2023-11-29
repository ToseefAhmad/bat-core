import {get} from 'lodash';

import {getStoreCodeByPathname} from '../../../common';

function isShippingAddressValid(shippingAddress) {
    if (!shippingAddress) {
        return null;
    }

    const storeCode = getStoreCodeByPathname();

    const fields = ['street[0]', 'city', 'country.code'];
    const isPkLocale = storeCode === 'pk';
    const isAELocale = storeCode === 'uae';

    // For PK and AE locales `postcode` is optional
    if (!isPkLocale && !isAELocale) {
        fields.push('postcode');
    }

    return !fields.find(field => !get(shippingAddress, field));
}

// TODO: change BE to return empty array instead of full structure but empty fields
export function getSelectedShippingAddress(cart) {
    const shippingAddress = get(cart, 'shipping_addresses.0.address');

    if (isShippingAddressValid(shippingAddress)) {
        return shippingAddress;
    }
    return null;
}
