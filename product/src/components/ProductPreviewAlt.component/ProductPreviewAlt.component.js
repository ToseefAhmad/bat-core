import React, {
    useState,
    useEffect,
    useCallback
} from 'react';
import {useHistory} from 'react-router-dom';
import type {ComponentType} from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';

import {
    ProductPriceComponent,
    VariationAttributesContainer,
    ProductProvider,
    ProductImageComponent,
    ProductLinkComponent
} from '@luft/product';
import {
    LoaderComponent,
    ButtonComponent,
    useResolutions
} from '@luft/common';
import {AddToCartComponent} from '@luft/quote';
import {WishlistProductActionsContainer} from '@luft/wishlist';
import type {Product} from '@luft/types';

import {useMiniCart} from '../../../../cart';
import {trackProductClick} from '../../../../data-layer';

import messages from './resources/messages';

type Props = {
    product: Product,
    showAttributes: boolean,
    wishlistEnabled?: boolean,
    showMiniCart?: boolean,
    onProductClick?: Function,
    onAddToWishlist?: Function,
    onAddToCart?: Function,
    beforeEndAs?: ComponentType<{}>
};

const PRODUCT_QUANTITY = 1;

const ConditionalWrapper = ({condition, wrapper, children}) => {
    if (condition) return wrapper(children);

    return children;
};

export function ProductPreviewAltComponent(props: Props) {
    const {
        product,
        showAttributes = true,
        showMiniCart = true,
        wishlistEnabled = false,
        onProductClick = noop,
        onAddToWishlist = noop,
        onAddToCart = noop,
        beforeEndAs: BeforeEndAs = null
    } = props;

    const {
        name,
        url,
        type,
        variation_attributes,
        variations,
        id: productId,
        inventory
    } = product || {};

    const isProductInStock = inventory?.in_stock;
    const isGroupedProduct = type === 'GROUPED';
    const isConfigurableProduct = type === 'CONFIGURABLE';
    const isBundleProduct = (type === 'BUNDLE') || (type === 'EDITABLE_BUNDLE');

    const [variation, setVariation] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isInStock, setIsInStock] = useState(isProductInStock);
    const isPseudoAddToCart = (isConfigurableProduct && !variation) || isBundleProduct;
    const [shouldRedirectToPDP, setShouldRedirectToPDP] = useState(isPseudoAddToCart);
    const {formatMessage} = useIntl();
    const {isEnabledMiniCart, onToggleMiniCart} = useMiniCart();
    const {isXS} = useResolutions();
    const history = useHistory();

    const handleOnProductClick = useCallback(() => {
        trackProductClick(product);
        onProductClick();
    }, [onProductClick, product]);

    useEffect(() => {
        setIsInStock(isProductInStock);
    }, [isProductInStock]);

    const handleOnVariationChange = useCallback(variationValues => {
        if (!variationValues) {
            setVariation(null);
            setShouldRedirectToPDP(true);
        } else setShouldRedirectToPDP(false);
    }, []);

    const handleVariationLoad = useCallback(loadedVariation => {
        setVariation(loadedVariation);
        setIsInStock(loadedVariation?.inventory?.in_stock);
    }, []);

    const handleAddToCart = useCallback(response => {
        setIsAddingToCart(false);

        if (isEnabledMiniCart && showMiniCart) onToggleMiniCart();

        onAddToCart(response);
    }, [isEnabledMiniCart, showMiniCart]);

    if (!product) {
        return null;
    }

    return (
        <div className="product-preview-alt-component">
            <ProductProvider originalProduct={product}>
                {wishlistEnabled && (
                    <WishlistProductActionsContainer variant="icon-square"/>
                )}
                <ProductLinkComponent className="product-preview-alt-component-link-image"
                                      onClick={handleOnProductClick}>
                    <ProductImageComponent variant="small"/>
                </ProductLinkComponent>

                <div className="product-preview-alt-component-body">
                    <ProductLinkComponent className="product-preview-alt-component-link-name"
                                          onClick={handleOnProductClick}>
                        {name}
                    </ProductLinkComponent>

                    <ProductPriceComponent isLabelForGroup={isGroupedProduct}/>

                    {!!variation_attributes && showAttributes && (
                        <VariationAttributesContainer productId={productId}
                                                      variationAttributes={variation_attributes}
                                                      variations={variations}
                                                      onVariationChange={handleOnVariationChange}
                                                      onVariationLoad={handleVariationLoad}/>
                    )}
                </div>

                {BeforeEndAs && (
                    <BeforeEndAs product={product}
                                 onAddToWishlist={onAddToWishlist}/>
                )}

                <ConditionalWrapper condition={!!variation_attributes && !isInStock}
                                    wrapper={children => (
                                        <div className="product-preview-alt-component-footer-wrapper">
                                            {children}
                                        </div>
                                    )}>
                    {isInStock && (
                        <div className="product-preview-alt-component-footer">
                            {shouldRedirectToPDP ? (
                                <ButtonComponent onClick={() => history.push(url)}
                                                 title={formatMessage(messages.add_to_cart)}>
                                    {formatMessage(messages.add_to_cart)}
                                </ButtonComponent>
                            ) : (
                                <AddToCartComponent product={product}
                                                    qty={PRODUCT_QUANTITY}
                                                    variation={{product: variation}}
                                                    title={formatMessage(messages.add_to_cart)}
                                                    showSuccessMessage={!isEnabledMiniCart || !showMiniCart}
                                                    onAddToCart={handleAddToCart}/>
                            )}
                        </div>
                    )}
                </ConditionalWrapper>

                {isXS && isAddingToCart && (
                    <LoaderComponent type="overlay"
                                     size="sm"/>
                )}
            </ProductProvider>
        </div>
    );
}
