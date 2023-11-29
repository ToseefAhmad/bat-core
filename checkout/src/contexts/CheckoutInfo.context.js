import {createContext} from 'react';

export const CheckoutInfoContext = createContext({
    checkoutInfo: {},
    setCheckoutInfo: () => {}
});
