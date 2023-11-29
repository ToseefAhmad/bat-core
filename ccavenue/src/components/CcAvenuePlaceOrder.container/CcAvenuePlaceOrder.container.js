import React, {useState, useCallback} from 'react';

import {CcAvenuePlaceOrderComponent} from '../CcAvenuePlaceOrder.component';
import {useCcAvenuePlaceOrderMutation} from '../../hooks';

type Props = {
    /**
     * Presentation component, that will consume data and callbacks from this container component
     */
    as?: React.Component
}

export const CcAvenuePlaceOrderContainer = (
    {
        as: Component = CcAvenuePlaceOrderComponent,
        ...other
    }: Props) => {
    const [ccAvenuePlaceOrder] = useCcAvenuePlaceOrderMutation();
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = useCallback(async () => {
        setLoading(true);
        try {
            setError(null);
            const res = await ccAvenuePlaceOrder();
            setFormData(res?.data?.ccavenuePlaceOrder);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    }, [ccAvenuePlaceOrder]);

    return (
        <Component {...other}
                   loading={loading}
                   error={error}
                   formData={formData}
                   onSubmit={handleSubmit}/>
    );
};
