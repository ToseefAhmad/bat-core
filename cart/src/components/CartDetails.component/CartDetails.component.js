import React from 'react';

import {CartItemsComponent} from '@luft/cart';
import {CheckoutAppliedDiscountsComponent} from '@luft/checkout';
import {CmsBlockContainer} from '@luft/cms';
import {useResolutions} from '@luft/common';

import type {Cart} from '@luft/types';

import {CheckoutCouponsWalletContainer, CheckoutDiscountsComponent} from '../../../../checkout';
import {CartTotalsComponent} from '../CartTotals.component';
import {CouponsWalletItemComponent} from '../../../../sales';
import {CrossSellProductsContainer} from '../../../../quote';

type Props = {
    cart: Cart,
    onNavigateToCheckout?: Function,
    showCouponWallet: boolean,
    showRewardPoints: boolean,
    showCrossSellProducts: boolean
};

export function CartDetailsComponent(props: Props) {
    const {
        cart,
        onNavigateToCheckout,
        showCouponWallet,
        showRewardPoints,
        showCrossSellProducts,
        ...other
    } = props;

    const {isSMdown} = useResolutions();

    return (
        <div className="cart-details-component">
            <div className="cart-details-component-content">
                <div className="cart-details-component-content-products">
                    <CartItemsComponent {...other}
                                        items={cart.items}/>
                    {showCrossSellProducts && !isSMdown && (
                        <CrossSellProductsContainer numberVisible={3}
                                                    cartTotalItems={cart.total_items}/>
                    )}
                </div>
                <div className="cart-details-component-content-column">
                    {showCouponWallet && (
                        <CheckoutCouponsWalletContainer couponsWalletItemAs={CouponsWalletItemComponent}/>
                    )}
                    <CheckoutDiscountsComponent showRewardPoints={showRewardPoints}/>
                    <CheckoutAppliedDiscountsComponent showRewardPoints={showRewardPoints}/>
                    {showCrossSellProducts && isSMdown && (
                        <CrossSellProductsContainer numberVisible={2}
                                                    cartTotalItems={cart.total_items}/>
                    )}
                    <CartTotalsComponent cart={cart}
                                         onNavigateToCheckout={onNavigateToCheckout}/>
                    <CmsBlockContainer cmsBlockId="cart-totals-sidebar-after"
                                       group="cart-page"/>
                    <CmsBlockContainer cmsBlockId="cart-need-help"
                                       group="cart-page"/>
                </div>
            </div>
        </div>
    );
}
