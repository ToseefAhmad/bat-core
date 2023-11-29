import React, {useCallback} from 'react';
import {isUndefined} from 'lodash';

import type {
    GiftCardItem,
    Money,
    Product,
    ProductPrice
} from '@luft/types';

import {
    GroupedProductPriceComponent,
    GiftCardProductPriceComponent,
    RegularProductPriceComponent,
    MinimumProductPriceComponent,
    FinalProductPriceComponent,
    useProductContextField,
    useProductState,
    ProductContext
} from '@luft/product';
import {EditableBundlePriceContainer} from '@luft/product/src/components/EditableBundlePrice.container';

type Props = {
    /**
     * A product for which the price is shown
     *
     * **Default value from ProductContext**
     */
    product?: Product | ProductContext.product,
    /**
     * Product Price is an aggregation of several prices that can be assigned to Product
     *
     * **Default value from ProductContext**
     */
    price?: ProductPrice | ProductContext.product.price,
    /**
     * List of items which are included in the Group Product
     *
     * **Default value from ProductContext**
     */
    groupSet?: Object[] | ProductContext.productState.groupSet,
    /**
     * An object with GiftCard information which includes chosen amount end email details.
     *
     * **Default value from ProductContext**
     */
    giftCard?: GiftCardItem | ProductContext.productState.giftCard,
    /**
     * A money object with GiftCard information which represents minimal gift card price.
     *
     * **Default value from ProductContext**
     */
    giftCardFrom?: Money | ProductContext.productState.giftCard,
    /**
     * Whether the price of a bundle is dynamic. If yes, a price range is displayed, if not — fixed price.
     *
     * **Default value from ProductContext**
     */
    isDynamic?: boolean | ProductContext.product.price_is_dynamic,
    /**
     * Price value multiplier.
     *
     * **Default value from ProductContext**
     */
    qty?: number | ProductContext.productState.qty,
    /**
     * if product quantity should be equal to '1' ignoring 'qty' prop value
     */
    ignoreQty?: boolean
};

/**
 * Presentational component, used to display product price
 * TODO: add exact list of components and explain rules
 */
export function ProductPriceComponent(
    {
        product,
        groupSet,
        giftCard,
        giftCardFrom,
        price = product?.price,
        isDynamic,
        qty,
        ignoreQty = false
    }: Props) {
    const $product = useProductContextField('product', product);
    const $price = useProductContextField('product.price', price);
    const [$qty] = useProductState('qty', qty);

    const renderPrice = useCallback(() => {
        const computedQty = ignoreQty || isUndefined($qty) ? 1 : $qty;
        // if minimum exists, show it, as highest priority
        const isMinimum = !!$price?.minimum?.amount?.value;
        // else if final is less than regular and both exist show discounted price
        const isFinal = $price?.final?.amount?.value < $price?.regular?.amount?.value;

        switch (true) {
            case $product?.type === 'GROUPED':
                return (
                    <GroupedProductPriceComponent price={$price}
                                                  groupSet={groupSet}
                                                  qty={computedQty}/>
                );
            case $product?.type === 'GIFTCARD':
                return (
                    <GiftCardProductPriceComponent giftCard={giftCard}
                                                   giftCardFrom={giftCardFrom}
                                                   qty={computedQty}/>
                );
            case $product?.type === 'EDITABLE_BUNDLE':
                return (
                    <EditableBundlePriceContainer price={$price}
                                                  isDynamic={isDynamic}
                                                  qty={computedQty}/>
                );
            case isFinal:
                return (
                    <FinalProductPriceComponent priceRegular={$price?.regular}
                                                priceFinal={$price?.final}
                                                qty={computedQty}/>
                );
            case $product?.type === 'SIMPLE':
                return (
                    <RegularProductPriceComponent price={$price?.regular}
                                                  qty={computedQty}/>
                );
            case isMinimum:
                return (
                    <MinimumProductPriceComponent price={$price?.minimum}
                                                  qty={computedQty}/>
                );
            default:
                return (
                    <RegularProductPriceComponent price={$price?.regular}
                                                  qty={computedQty}/>
                );
        }
    }, [$product, $price, $qty, giftCard, giftCardFrom, groupSet, isDynamic, ignoreQty]);

    return (
        <div className="product-price-component">
            {renderPrice()}
        </div>
    );
}
