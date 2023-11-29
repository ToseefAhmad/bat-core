import React, {useMemo} from 'react';
import classnames from 'classnames';
import {useIntl} from 'react-intl';

import type {
    BundleInfo,
    GiftCardItem,
    OrderVariationAttribute,
    Product,
    Variation
} from '@luft/types';

import {
    ProductPriceComponent,
    ProductSkuComponent,
    StockStatusComponent,
    ProductProvider,
    ProductLinkComponent,
    ProductImageComponent,
    ProductQtyPlainComponent,
    ProductQtyComponent,
    ConfigurableProductPlainOptionsComponent,
    VariationAttributesContainer,
    ProductTitleComponent,
    SaveProductComponent,
    ProductSelectedAttributesComponent
} from '@luft/product';

import {ProductEngravingOptionsComponent} from '../ProductEngravingOptions.component';
import {BundlePlainOptionsComponent} from '../BundlePlainOptions.component';
import type {EngravedOptionsInfo} from '../../../../types';

import messages from './resources/messages';

type Props = {
    /**
     * The original product data
     */
    originalProduct?: Product,
    /**
     * A product entity, for which pane will be rendered
     */
    product?: Product,
    /**
     * A Configurable Product Variation
     */
    variation?: Variation,
    /**
     * A GiftCard item information with chosen amount and email details that were filled by customer.
     */
    giftCard?: GiftCardItem,
    /**
     * List of items which are included in the Group Product
     */
    groupSet?: {
        product: Product,
        qty: number
    }[],
    /**
     *  Computed bundle information in cart, order or other place
     */
    bundleInfo?: BundleInfo,
    /**
     *  Product variation information in order.
     */
    selectedVariationAttributes?: OrderVariationAttribute[],
    /**
     * Quantity of product in the cart item or the order
     */
    qty?: number,
    /**
     * Free gift items price label
     */
    priceLabel?: string,
    /**
     * Engraving information
     */
    engravingOptions?: EngravedOptionsInfo,
    /**
     * Flag, that identifies if product variation menu should be displayed
     */
    showVariationMenu?: boolean,
    /**
     * Flag, that identifies if product name and thumbnail is a link to product page
     */
    isLink?: boolean,
    /**
     * Flag, that identifies if product sku should be displayed
     */
    showSku?: boolean,
    /**
     * Flag, that identifies if product price should be displayed
     */
    showPrice?: boolean,
    /**
     * Flag, that identifies if product stock data should be displayed
     */
    showStock?: boolean,
    /**
     * Flag, that identifies if product qty should be displayed
     */
    showQty?: boolean,
    /**
     * Flag, that identifies if product qty edit control should be displayed
     */
    showQtyEdit?: boolean,
    /**
     * Flag, that identifies if product meta information should be displayed
     */
    showDetails?: boolean,
    /**
     * Flag, that identifies if an accordion is opened with details information by default
     */
    showDetailsByDefault?: boolean,
    /**
     * Flag, that identifies if details information can be collapsed
     */
    disableDetailsCollapse?: boolean,
    /**
     * Setting that allows to change component layout
     */
    priceVariant?: 'row' | 'price-column',
    /**
     * Children elements, will be used instead of default children
     */
    children?: React.ReactNode,
    /**
     * Custom classname
     */
    className?: string,
    /**
     * Flag uses to ignore stock status
     */
    ignoreStock?: boolean,
    /**
     * Callback, which is fired after updating the product's quantity
     */
    onItemUpdateQty?: (qty: number) => void,
    /**
     * Callback, which is fired after updating the product
     */
    onItemUpdate?: () => void
};

/**
 * Presentation component, used to display information about entity added to cart, wishlist, etc.
 *
 * *This component is a wrapper for the ProductProvider*
 *
 * Part of ProductRenderersContext and can be overwritten via ProductRenderersProvider.
 * for this boot config should have these fields:
 *
 * ```
 * const config = {
 *     productRenderers: {
 *         ProductPaneComponent: CustomProductPane
 *     }
 * };
 * return (
 *     <LuftBootComponent config={config}>
 *          <App/>
 *     </LuftBootComponent>
 *  );
 * ```
 */
export function ProductPaneComponent(
    {
        product,
        originalProduct = product,
        variation,
        engravingOptions = {},
        giftCard,
        groupSet,
        bundleInfo,
        selectedVariationAttributes,
        qty,
        priceLabel,
        showVariationMenu,
        isLink = true,
        showSku = true,
        showPrice = true,
        showStock = true,
        showQty = true,
        showQtyEdit = false,
        showDetails = true,
        showDetailsByDefault = false,
        disableDetailsCollapse = false,
        priceVariant = 'row',
        children,
        className,
        ignoreStock,
        onItemUpdateQty,
        onItemUpdate
    }: Props) {
    const {formatMessage} = useIntl();
    const classNames = classnames('product-pane-component', className);
    const isPriceInColumn = priceVariant === 'price-column';
    const initialState = useMemo(() => ({
        variation,
        giftCard,
        groupSet,
        bundleInfo,
        selectedVariationAttributes,
        qty
    }), [variation, giftCard, groupSet, bundleInfo, selectedVariationAttributes, qty]);

    // fulfill base product with variation props
    const initialProduct = useMemo(() => ({...product, ...variation?.product}), [product, variation?.product]);
    const {__typename, ...productEngravingOptions} = engravingOptions;

    return (
        <ProductProvider originalProduct={originalProduct}
                         product={initialProduct}
                         initialState={initialState}>
            {children || (
                <div className={classNames}>
                    <div className="product-pane-component-info">
                        <ProductLinkComponent className="product-pane-component-image-link"
                                              url={product?.url}
                                              isLink={isLink}>
                            <ProductImageComponent variant="thumbnail"/>
                        </ProductLinkComponent>
                        <div className="product-pane-component-body">
                            <ProductLinkComponent className="product-pane-component-name-link"
                                                  url={product?.url}
                                                  isLink={isLink}>
                                <ProductTitleComponent as="h3"/>
                            </ProductLinkComponent>
                            {showSku && <ProductSkuComponent/>}
                            {showPrice && !priceLabel && !isPriceInColumn && <ProductPriceComponent/>}
                            {priceLabel && (
                                <div className="product-sale-component-price-label">
                                    {priceLabel}
                                </div>
                            )}
                            {showDetails && <ConfigurableProductPlainOptionsComponent/>}
                            {showDetails && <ProductSelectedAttributesComponent/>}
                            {showVariationMenu && (
                                <>
                                    <VariationAttributesContainer/>
                                    <SaveProductComponent variant="primary"
                                                          title={formatMessage(messages.update)}
                                                          className="product-pane-component-update-action"
                                                          ignoreStock={ignoreStock}
                                                          onSave={onItemUpdate}/>
                                </>
                            )}
                            {productEngravingOptions?.psn_is_personalisable && (
                                <ProductEngravingOptionsComponent engravingOptions={productEngravingOptions}
                                                                  showDetailsByDefault={showDetailsByDefault}
                                                                  disableDetailsCollapse={disableDetailsCollapse}/>
                            )}
                            {bundleInfo && (
                                <BundlePlainOptionsComponent showDetailsByDefault={showDetailsByDefault}
                                                             disableDetailsCollapse={disableDetailsCollapse}/>
                            )}
                            <div className="product-pane-component-body-wrapper">
                                {showQty && <ProductQtyPlainComponent/>}
                                {showQtyEdit && (
                                    <ProductQtyComponent title={formatMessage(messages.quantity_label)}
                                                         onQtyChange={onItemUpdateQty}/>
                                )}
                                {showPrice && !priceLabel && isPriceInColumn && <ProductPriceComponent/>}
                            </div>
                            {showStock && <StockStatusComponent/>}
                        </div>
                    </div>
                </div>
            )}
        </ProductProvider>
    );
}
