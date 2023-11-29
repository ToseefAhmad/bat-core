/* eslint-disable prefer-template */
import React, {
    useState,
    useEffect,
    useCallback
} from 'react';
import classnames from 'classnames';

import type {PaymentMethod} from '@luft/types';

type Ipay88PaymentMethod = {
    id: number,
    name: string,
    logo: string
}

type Props = {
    method: Ipay88PaymentMethod,
    isActive?: boolean,
    selectedPaymentMethod?: PaymentMethod,
    onSetPaymentMethod: (id: number) => void
};

export function Ipay88MethodItemComponent({
    method,
    isActive,
    selectedPaymentMethod,
    onSetPaymentMethod
}: Props) {
    const [logoSrc, setLogoSrc] = useState();
    const {id, name, logo} = method;
    const selectedMethodId = selectedPaymentMethod?.payment_method?.payment_id;

    const itemClassNames = classnames('ipay88-method-item-component', {
        'ipay88-method-item-component-active': isActive || selectedMethodId === id
    });

    const handleSetPaymentMethod = useCallback(() => {
        if (selectedMethodId !== id) {
            onSetPaymentMethod(id);
        }
    }, [onSetPaymentMethod, selectedMethodId, id]);

    useEffect(() => {
        (async () => {
            const logoImg = await import('./resources/images/' + logo);
            setLogoSrc(logoImg.default);
        })();
    }, [logo]);

    return (
        <button className={itemClassNames}
                type="button"
                onClick={handleSetPaymentMethod}>
            {logoSrc && (
                <img className="ipay88-method-item-component-logo"
                     src={logoSrc}
                     alt={name}/>
            )}
        </button>
    );
}
