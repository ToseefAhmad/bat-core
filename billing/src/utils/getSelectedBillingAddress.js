import {get} from 'lodash';

function isBillingAddressValid(billingAddress) {
    if (!billingAddress) {
        return null;
    }

    const fields = ['street[0]', 'city', 'country.code'];
    const isPakistan = window?.location?.pathname?.startsWith('/pk/');

    // For Pakistan `postcode` is optional
    if (!isPakistan) {
        fields.push('postcode');
    }

    return !fields.find(field => !get(billingAddress, field));
}

// TODO: change BE to return empty array instead of full structure but empty fields
export function getSelectedBillingAddress(cart) {
    const billingAddress = get(cart, 'billing_address.address');

    if (isBillingAddressValid(billingAddress)) {
        return billingAddress;
    }
    return null;
}
