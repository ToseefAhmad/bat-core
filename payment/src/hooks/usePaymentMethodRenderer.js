import {useContext} from 'react';

import {PaymentProviderContext} from '@luft/payment/src/contexts/context';

export const usePaymentMethodRenderer = (code: string) => {
    const {methodRenderers} = useContext(PaymentProviderContext);

    return methodRenderers?.get(code) || methodRenderers?.get('_methodDefault');
};
