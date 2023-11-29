import React, {useEffect, useMemo} from 'react';
import {useLocation} from 'react-router';

import {
    ErrorComponent,
    LoaderComponent
} from '@luft/common';
import {useCartQuery} from '@luft/quote';

import {ProductEngravingComponent} from '../ProductEngraving.component';
import {useProductEngravingConfigQuery, useDeviceEngravingOptions} from '../../hooks';
import {useWishlistQuery} from '../../../../wishlist';

type Props = {
    /**
     * Presentation component, that will consume data and callbacks from this container component
     */
    as?: React.Component,
    /**
     * Prop, that identifies component, used for presentation of loading state
     * */
    loadingAs?: React.Component,
    /**
     * Prop, that identifies component, used for presentation of error state
     * */
    errorAs?: React.Component,
    /**
     * Flag, used to identify handling of loading, error and no-cache state by container
     * */
    awaitResult?: boolean,
    /**
     * Flag, used to identify if engraving options should be shown
     * */
    showOptions: boolean,
    /**
     * Callback used to set if engraving options should be shown
     */
    onShowOptions: (boolean) => void
}

export function ProductEngravingContainer(
    {
        as: Component = ProductEngravingComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        showOptions,
        onShowOptions,
        ...other
    }: Props) {
    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const cartItemId = queryParams.get('cart_item_id');
    const {data: cartData, loading: cartLoading, error: cartError} = useCartQuery({skip: !cartItemId});
    const wishlistItemId = queryParams.get('wishlist_item_id');
    const {
        data: wishlistData,
        loading: wishlistLoading,
        error: wishlistError
    } = useWishlistQuery({skip: !wishlistItemId});

    const {
        data: storeConfigData,
        loading: storeConfigLoading,
        error: storeConfigError
    } = useProductEngravingConfigQuery();
    const {data, loading: optionsLoading, error: optionsError} = useDeviceEngravingOptions();
    const options = data?.getDeviceEngravingOptions;
    const fonts = options?.fonts;

    useEffect(() => {
        if (!cartItemId && !wishlistItemId) return;

        onShowOptions(true);
    }, [cartItemId, wishlistItemId, onShowOptions]);

    // Preload fonts
    useEffect(() => {
        if (!showOptions || !fonts || typeof window === 'undefined') return;

        fonts.forEach(font => {
            const newFont = new FontFace(font.name, `url(${font.font_file})`);
            newFont.load()
                .then(loadedFont => {
                    document.fonts.add(loadedFont);
                });
        });
    }, [fonts, showOptions]);

    const engravingOptions = useMemo(() => {
        const isCartEdit = cartItemId && cartData?.cart?.id;
        const isWishlistEdit = wishlistItemId && wishlistData?.viewer?.user?.wishlist?.products;

        if (!isCartEdit && !isWishlistEdit) return null;

        let currentItem;

        if (isCartEdit) {
            const cartItems = cartData?.cart?.items || [];
            currentItem = cartItems.find(item => item.cart_item_id === cartItemId);
        }

        if (isWishlistEdit) {
            const wishlistItems = wishlistData?.viewer?.user?.wishlist?.products?.items || [];
            currentItem = wishlistItems.find(item => item.id === wishlistItemId);
        }

        return currentItem?.engraved_options;
    }, [cartData, cartItemId, wishlistData, wishlistItemId]);

    const loading = optionsLoading || storeConfigLoading || cartLoading || wishlistLoading;
    const error = optionsError || storeConfigError || cartError || wishlistError;
    if (loading) return Loading && <Loading type="attached"/>;
    if (error) return Error && <Error error={error}/>;

    const {storeConfig} = storeConfigData;
    const config = {
        maxLengthHorizontal: storeConfig?.device_psn_max_characters_horizontal,
        maxLengthVertical: storeConfig?.device_psn_max_characters_vertical,
        regexp: storeConfig?.device_psn_regex,
        price: storeConfig?.device_psn_price,
        specialPrice: storeConfig?.device_psn_special_price,
        disclaimer: storeConfig?.device_psn_pdp_disclaimer
    };

    return (
        <Component {...other}
                   showOptions={showOptions}
                   options={options}
                   engravingOptions={engravingOptions}
                   cartItemId={cartItemId}
                   wishlistItemId={wishlistItemId}
                   config={config}
                   onShowOptions={onShowOptions}/>
    );
}
