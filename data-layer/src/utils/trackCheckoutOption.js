import TagManager from 'react-gtm-module';

export const trackCheckoutOption = (checkoutOption) => TagManager.dataLayer({
    dataLayer: {
        event: 'checkoutOption',
        ecommerce: {
            checkout_option: {
                actionField: {checkoutOption}
            }
        }
    }
});
