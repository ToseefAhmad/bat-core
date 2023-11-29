import {
    PaynamicsPlaceOrderContainer,
    PaynamicsPaymentMethodComponent,
    PaynamicsPaymentDetailsComponent
} from '../components';
import {PAYNAMICS_METHODS} from './constants';

const renderers = {
    order: PaynamicsPlaceOrderContainer,
    method: PaynamicsPaymentMethodComponent,
    details: PaynamicsPaymentDetailsComponent
};

export const getPaynamicsMethodsRenderer = (type: 'order' | 'method' | 'details') => PAYNAMICS_METHODS.map(method => [method, renderers[type]]);
