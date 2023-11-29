import React, {useEffect, useRef} from 'react';
import {useLocation} from 'react-router';
import type {ComponentType} from 'react';

import {MiniCartComponent} from '../MiniCart.component';
import {useMiniCartQuery} from '../../../../quote';
import {useMiniCart} from '../../hooks';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     */
    as?: ComponentType<{}>
};

export function MiniCartContainer({
    as: Component = MiniCartComponent,
    ...other
}: Props) {
    const {pathname} = useLocation();
    const {isOpenMiniCart, onToggleMiniCart} = useMiniCart();
    const q = useMiniCartQuery({skip: !isOpenMiniCart});
    const isFirstRenderRef = useRef(true);

    // Close the Mini Cart if the user went to another page
    useEffect(() => {
        // No need to close anything on mount
        if (isFirstRenderRef.current) {
            isFirstRenderRef.current = false;
            return;
        }

        if (!isOpenMiniCart) return;

        onToggleMiniCart();
    }, [pathname, isOpenMiniCart, onToggleMiniCart]);

    const {items = [], total_items, prices = {}} = q.data?.cart || {};
    const {subtotal} = prices;

    return (
        <Component {...other}
                   items={items}
                   totalItems={total_items}
                   subtotal={subtotal}
                   loading={q.loading}
                   error={q.error}
                   limitErrors={q.data?.cart?.error_info}/>
    );
}
