import React, {useCallback} from 'react';
import {useHistory} from 'react-router';

import {useToast} from '@luft/common';
import {useReorderMutation, ReorderComponent} from '@luft/sales';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     * */
    as?: React.Component,
    /**
     * Order ID
     */
    orderId: string
}

/**
 * @module @luft/sales
 * @scope @luft/sales
 * @exports ReorderContainer
 * @function ReorderContainer
 * @kind Container
 *
 * @description
 * Container component, used to reorder products from certain order based on ID
 */

/**
 * @typedef {React.Component} ReorderPresentationComponent
 * @kind Component
 *
 * @description
 * Presentation component, that consumes data from ReorderContainer
 *
 * @param {React.Component|ReorderPresentationComponent} as=ReorderComponent - Presentation
 * component, that will consume callbacks from this container component
 * @param {boolean} loading - Loading state of mutation
 * @param {Function} onReorder - Callback on reorder item
 */
export function ReorderContainer(
    {
        as: Component = ReorderComponent,
        orderId
    }: Props) {
    const addToast = useToast();
    const [reorder, {loading}] = useReorderMutation();
    const history = useHistory();

    const handleReorder = useCallback(async () => {
        try {
            const res = await reorder({order_id: orderId});
            const data = res?.data?.reorder;

            if (!data?.total_items) return;
            history.replace('/cart');
        } catch (e) {
            if (e.message) {
                addToast(e.message, 'error');
            }
        }
    }, [orderId, reorder, addToast, history]);

    return (
        <Component loading={loading}
                   onReorder={handleReorder}/>
    );
}
