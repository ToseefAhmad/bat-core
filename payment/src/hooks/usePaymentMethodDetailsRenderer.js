import {useContext} from 'react';

import {PaymentProviderContext} from '@luft/payment/src/contexts/context';

export const usePaymentMethodDetailsRenderer = (code: string) => {
    const {methodDetailsRenderers} = useContext(PaymentProviderContext);

    return methodDetailsRenderers?.get(code);
};
