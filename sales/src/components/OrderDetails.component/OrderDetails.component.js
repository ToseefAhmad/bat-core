import React from 'react';
import {useIntl} from 'react-intl';

import {
    MoneyComponent,
    AddressPreviewComponent,
    useStoreConfigQuery
} from '@luft/common';
import {
    OrderStatusComponent,
    OrderDetailsBoxComponent,
    OrderTotalsItemComponent
} from '@luft/sales';
import {useProductRenderer} from '@luft/product';
import type {Order} from '@luft/types';
import messages from '@luft/sales/src/components/OrderDetails.component/resources/messages';

import {useFormatDate} from '../../../../common';
import {ReorderContainer} from '../Reorder.container';

import custom_messages from './resources/messages';

type Props = {
    order: Order
};

export function OrderDetailsComponent(props: Props) {
    const {formatMessage, formatNumber} = useIntl();
    const ProductPaneComponent = useProductRenderer('ProductPaneComponent');

    const {order} = props;
    const {
        created_at,
        status,
        items,
        prices,
        shipments,
        payment_methods,
        billing_address,
        discount,
        rewards_discount,
        can_reorder,
        id
    } = order;

    const isReorderEnabled = useStoreConfigQuery()?.data?.storeConfig?.is_reorder_enabled;
    const hasShipments = shipments && shipments.length > 0;
    const shippingAddress = hasShipments && shipments[0].shipping_address;
    const shippingMethod = hasShipments && shipments[0].shipping_method;
    const trackingNumber = hasShipments && shipments[0].tracking_number;
    const dateString = useFormatDate({date: created_at});

    return (
        <div className="order-details-component">
            <div className="order-details-component-info">
                <div className="order-details-component-info-section">
                    <div className="order-details-component-info-title">
                        {formatMessage(messages.details_title)}
                    </div>

                    <div className="order-details-component-date">
                        {formatMessage(messages.date, {
                            date: dateString
                        })}
                    </div>

                    <OrderStatusComponent status={status}/>

                    {trackingNumber && (
                        <div className="order-details-component-tracking-number">
                            {formatMessage(custom_messages.tracking_number_title)}

                            <span className="order-details-component-tracking-number-value">
                                {trackingNumber}
                            </span>
                        </div>
                    )}
                </div>

                <div className="order-details-component-info-items">
                    {!!items?.length && (
                        <div className="order-details-component-product-count">
                            {formatMessage(messages.items, {count: items.length})}
                        </div>
                    )}

                    {!!prices?.grand_total && (
                        <MoneyComponent money={prices.grand_total}/>
                    )}
                </div>
            </div>
            {isReorderEnabled && can_reorder && <ReorderContainer orderId={id}/>}

            <div className="order-details-component-boxes">
                {shippingAddress && (
                    <OrderDetailsBoxComponent title={formatMessage(messages.shipping_address_title)}>
                        <AddressPreviewComponent address={shippingAddress}/>
                    </OrderDetailsBoxComponent>
                )}

                {shippingMethod && (
                    <OrderDetailsBoxComponent title={formatMessage(messages.shipping_method_title)}>
                        <div className="order-details-component-shipping-method">
                            <span>
                                {shippingMethod.method_title}
                            </span>
                            <MoneyComponent money={shippingMethod.amount}/>
                        </div>
                    </OrderDetailsBoxComponent>
                )}

                {!!payment_methods?.length && (
                    <OrderDetailsBoxComponent title={formatMessage(messages.payment_method_title)}>
                        {payment_methods.map(method => (
                            <div key={method.code}
                                 className="order-details-component-payment">
                                {method.name}
                            </div>
                        ))}
                    </OrderDetailsBoxComponent>
                )}

                {billing_address && (
                    <OrderDetailsBoxComponent title={formatMessage(messages.billing_address_title)}>
                        <AddressPreviewComponent address={billing_address}/>
                    </OrderDetailsBoxComponent>
                )}
            </div>

            {!!items?.length && (
                <div className="order-details-component-products">
                    {items.map(({id, ...item}) => (
                        <ProductPaneComponent key={id}
                                              className="order-details-component-product-item"
                                              product={item.product}
                                              variation={item.configurable_variation}
                                              engravingOptions={item.engraved_options}
                                              giftCard={item.gift_card}
                                              bundleInfo={item.bundle_info}
                                              selectedVariationAttributes={item.order_variation_attributes}
                                              qty={item.quantity}
                                              priceLabel={item.price_label}
                                              showStock={false}
                                              showSku={false}
                                              isLink={false}
                                              showDetailsByDefault={true}
                                              disableDetailsCollapse={true}/>
                    ))}
                </div>
            )}

            <div className="order-details-component-total">
                {!!prices?.subtotal && (
                    <OrderTotalsItemComponent label={formatMessage(messages.subtotal)}
                                              amount={prices.subtotal}/>
                )}

                {!!rewards_discount?.points_spent && (
                    <div className="order-details-component-points-item">
                        <span className="order-details-component-points-item-label">
                            {formatMessage(custom_messages.spent_reward_points)}
                        </span>

                        <span className="order-details-component-points-item-value">
                            {formatMessage(custom_messages.reward_points, {
                                amount: formatNumber(rewards_discount.points_spent)
                            })}
                        </span>
                    </div>
                )}

                {!!rewards_discount?.points_earn && (
                    <div className="order-details-component-points-item">
                        <span className="order-details-component-points-item-label">
                            {formatMessage(custom_messages.earned_reward_points)}
                        </span>

                        <span className="order-details-component-points-item-value">
                            {formatMessage(custom_messages.reward_points, {
                                amount: formatNumber(rewards_discount.points_earn)
                            })}
                        </span>
                    </div>
                )}

                {!!shippingMethod?.amount && (
                    <OrderTotalsItemComponent label={formatMessage(messages.delivery)}
                                              amount={shippingMethod.amount}/>
                )}

                {!!discount?.amount?.value && (
                    <OrderTotalsItemComponent label={formatMessage(custom_messages.discount, {label: discount.label})}
                                              amount={discount.amount}
                                              isNegative={true}/>
                )}

                {!!rewards_discount?.amount?.value && (
                    <OrderTotalsItemComponent label={formatMessage(custom_messages.rewards_discount)}
                                              amount={rewards_discount.amount}
                                              isNegative={true}/>
                )}

                {!!prices?.grand_total && (
                    <OrderTotalsItemComponent label={formatMessage(messages.total)}
                                              amount={prices.grand_total}
                                              className="order-details-component-grand-total"/>
                )}
            </div>
        </div>
    );
}
