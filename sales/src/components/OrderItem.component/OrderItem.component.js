import React from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';

import {
    MoneyComponent,
    ButtonComponent,
    ImageComponent,
    useStoreConfigQuery
} from '@luft/common';

import type {Order} from '@luft/types';
import {OrderStatusComponent} from '@luft/sales';

import messages from '@luft/sales/src/components/OrderItem.component/resources/messages';

import {ReorderContainer} from '../Reorder.container';
import {useFormatDate} from '../../../../common';

type Props = {
    order: Order,
    onShowOrderDetails?: Function,
    ratio?: number,
};

export function OrderItemComponent(prop: Props) {
    const {
        order,
        onShowOrderDetails = noop,
        ratio = 1
    } = prop;
    const {
        id,
        created_at,
        status,
        items = [],
        prices,
        shipments,
        can_reorder
    } = order;
    const shippingAddress = shipments && shipments.length > 0 && shipments[0].shipping_address;
    const isReorderEnabled = useStoreConfigQuery()?.data?.storeConfig?.is_reorder_enabled;
    const {formatMessage} = useIntl();
    const dateString = useFormatDate({date: created_at});

    return (
        <div className="order-item-component">
            <div className="order-item-component-date">
                {dateString}
            </div>
            <div className="order-item-component-info"
                 role="button"
                 tabIndex={0}
                 onClick={() => onShowOrderDetails(id)}
                 onKeyDown={() => onShowOrderDetails(id)}>
                <div className="order-item-component-info-details">
                    <div className="order-item-component-id">
                        {formatMessage(messages.order_id_title, {id})}
                    </div>
                    <OrderStatusComponent status={status}/>
                    {shippingAddress && (shippingAddress.firstname || shippingAddress.lastname) && (
                        <div className="order-item-component-shipped">
                            {formatMessage(messages.shipped_to_title, {
                                name: `${shippingAddress.firstname} ${shippingAddress.lastname}`
                            })}
                        </div>
                    )}
                </div>
                <div className="order-item-component-info-section">
                    {items.length > 0 && (
                        <div className="order-item-component-product-count">
                            {formatMessage(messages.items, {count: items.length})}
                        </div>
                    )}
                    {prices && prices.grand_total && (
                        <MoneyComponent money={prices.grand_total}/>
                    )}
                </div>
                <div className="order-item-component-info-section">
                    <ButtonComponent className="order-item-component-action"
                                     variant="light"
                                     type="button"
                                     inline={true}
                                     title={formatMessage(messages.show_order)}>
                        <span className="order-item-component-action-title">
                            {formatMessage(messages.show_order)}
                        </span>
                    </ButtonComponent>
                </div>
            </div>
            {items.length > 0 && (
                <div className="order-item-component-products">
                    <div className="order-item-component-products-body">
                        <div className="order-item-component-product-wrapper">
                            {items.map(({id: itemId, product}) => (
                                product ? (
                                    <div key={itemId}
                                         className="order-item-component-product">
                                        <ImageComponent image={product.thumbnail_image || {}}
                                                        ratio={ratio}
                                                        variant="thumbnail"/>
                                    </div>
                                ) : null
                            ))}
                        </div>
                        {isReorderEnabled && can_reorder && <ReorderContainer orderId={id}/>}
                    </div>
                </div>
            )}
        </div>
    );
}
