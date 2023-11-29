import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';

import {ProductListSliderComponent} from '../../../../product';
import {useStoreConfigQuery} from '../../../../common';

import type {Product} from '../../../../types';

import messages from './resources/messages';

type Props = {
    /**
     * Product list
     */
    products: Product[],
    /**
     * Number of visible products
     */
    numberVisible: number
};

export function CrossSellProductsComponent(props: Props) {
    const {
        products,
        numberVisible = 3
    } = props;

    const {formatMessage} = useIntl();
    const {data: storeConfigData} = useStoreConfigQuery();

    const wishlistEnabled = storeConfigData?.storeConfig?.magento_wishlist_general_is_enabled === '1';

    const handleOnAddToCart = useCallback(() => {
        if (typeof window === 'undefined') return;

        window.scrollTo({top: 0, behavior: 'smooth'});
    }, []);

    if (!products?.length) return null;

    return (
        <div className="cross-sell-products-component">
            <div className="cross-sell-products-component-title">
                {formatMessage(messages.title)}
            </div>
            <ProductListSliderComponent products={products}
                                        numberVisible={numberVisible}
                                        showMiniCart={false}
                                        wishlistEnabled={wishlistEnabled}
                                        showAttributes={true}
                                        onAddToCart={handleOnAddToCart}/>
        </div>
    );
}
