import {createContext} from 'react';

export const CheckoutContext = createContext({
    /**
     * Checkout current step
     */
    checkoutStep: null
});
