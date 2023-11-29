import React, {
    useState,
    useEffect,
    useCallback,
    useMemo
} from 'react';
import {useIntl} from 'react-intl';
import {useLocation} from 'react-router';

import {
    ProductMetaComponent,
    ProductMediaGalleryComponent,
    ProductTitleComponent,
    ProductPriceComponent,
    StockStatusComponent,
    ProductDescriptionComponent,
    ProductSettingsComponent,
    useProductContextField,
    useProductState
} from '@luft/product';
import {CmsBlockContainer} from '@luft/cms';
import {ReviewsContainer, ReviewSummaryComponent} from '@luft/review';
import {
    ErrorComponent,
    useStoreConfigQuery,
    useResolutions
} from '@luft/common';
import {WishlistProductActionsContainer} from '@luft/wishlist';

import {ProductBreadcrumbsContainer} from '../ProductBreadcrumbs.container';
import {ProductEngravingContainer} from '../ProductEngraving.container';
import {ProductEngravingPreviewComponent} from '../ProductEngravingPreview.component';
import {ProductDataMarkupComponent} from '../ProductDataMarkup.component';
import {EditableBundleUpdateActionContainer} from '../EditableBundleUpdateAction.container';
import {EditableBundleUpdateWishlistItemContainer} from '../EditableBundleUpdateWishlistItem.container';
import {AddToCartPanelComponent} from '../../../../cart';
import {ProductAlertContainer} from '../ProductAlert.container';
import {useIsEditableBundle} from '../../hooks';
import {getEngravingOptions} from '../../utils';

import messages from './resources/messages';

type Props = {
    brandName?: string
};

export function ProductDetailComponent({brandName}: Props) {
    const {isXS} = useResolutions();
    const {formatMessage} = useIntl();
    const shortDescription = useProductContextField('product.short_description');
    const designAttributes = useProductContextField('product.design_attributes');
    const inStock = useProductContextField('product.inventory.in_stock');
    const isPersonalisable = useProductContextField('product.psn_is_personalisable');
    const $bundledOptions = useProductContextField('product.bundled_products');
    const [$variation] = useProductState('variation');
    const [$qty] = useProductState('qty');
    const isEditableBundle = useIsEditableBundle($bundledOptions);
    const {search} = useLocation();
    const {data: storeConfigData} = useStoreConfigQuery();
    const [shownVariationError, setShownVariationError] = useState(false);
    const [shownEngravingOptions, setShownEngravingOptions] = useState(false);

    const brand = designAttributes?.find(attr => attr.place === 'brand')?.value;
    const subTitle = designAttributes?.find(attr => attr.place === 'subtitle')?.value;
    const colorCode = designAttributes?.find(attr => attr.place === 'page_color')?.value;
    const queryParams = new URLSearchParams(search);
    const cartItemId = queryParams.get('cart_item_id');
    const isBundleUpdating = isEditableBundle && !!cartItemId;
    const wishlistItemId = queryParams.get('wishlist_item_id');
    const isBundleWishlistUpdating = isEditableBundle && wishlistItemId;
    const [selectedEngravingOptions] = useProductState('selectedEngravingOptions');
    const engravedOptions = useMemo(() => (
        getEngravingOptions(selectedEngravingOptions)
    ), [selectedEngravingOptions]);
    const isProductAlertEnabled = storeConfigData?.storeConfig?.is_product_alert_stock_enabled;

    const showAddToCart = useMemo(() => (
        inStock && !shownEngravingOptions && !isBundleUpdating && !isBundleWishlistUpdating
    ), [inStock, shownEngravingOptions, isBundleUpdating, isBundleWishlistUpdating]);

    useEffect(() => {
        if (!shownVariationError || typeof window === 'undefined') return;

        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [shownVariationError]);

    // Hide variation error message if variation has been selected
    useEffect(() => {
        if (!$variation || !shownVariationError) return;

        setShownVariationError(false);
    }, [$variation, shownVariationError]);

    const handleShowVariationError = useCallback(() => {
        setShownVariationError(true);
    }, [setShownVariationError]);

    return (
        <div className="product-detail-component">
            <ProductMetaComponent/>
            <ProductDataMarkupComponent brandName={brandName}/>
            {shownVariationError && (
                <ErrorComponent className="product-detail-component-variation-error"
                                error={{message: formatMessage(messages.choose_variation)}}/>
            )}
            <ProductBreadcrumbsContainer/>
            {!isXS ? (
                <>
                    <div className="product-detail-component-gallery">
                        {!wishlistItemId && (
                            <WishlistProductActionsContainer variant="icon-square"
                                                             qty={$qty}
                                                             engravedOptions={engravedOptions?.[0]}/>
                        )}
                        {!shownEngravingOptions ? (
                            <ProductMediaGalleryComponent/>
                        ) : (
                            <ProductEngravingPreviewComponent/>
                        )}
                    </div>
                    <div className="product-detail-component-info">
                        <div className="product-detail-component-info-wrapper">
                            <ReviewsContainer as={ReviewSummaryComponent}/>
                            {!!brand && (
                                <div className="product-detail-component-brand">
                                    {brand}
                                </div>
                            )}
                            <ProductTitleComponent colorCode={colorCode}/>
                            {isEditableBundle && (
                                <ProductPriceComponent ignoreQty={true}/>
                            )}
                            {!!subTitle && (
                                <div className="product-detail-component-subtitle">
                                    {subTitle}
                                </div>
                            )}
                            {!!shortDescription && (
                                <div className="product-detail-component-short-description"
                                     dangerouslySetInnerHTML={{__html: shortDescription}}/>
                            )}
                            {isPersonalisable && (
                                <ProductEngravingContainer showOptions={shownEngravingOptions}
                                                           onShowOptions={setShownEngravingOptions}/>
                            )}

                            {!shownEngravingOptions && (
                                <>
                                    <ProductSettingsComponent/>
                                    {!inStock && (
                                        <StockStatusComponent/>
                                    )}
                                    {!isEditableBundle && (
                                        <ProductPriceComponent ignoreQty={true}/>
                                    )}
                                    {!inStock && isProductAlertEnabled && (
                                        <ProductAlertContainer/>
                                    )}
                                </>
                            )}
                            {isBundleUpdating && inStock && (
                                <EditableBundleUpdateActionContainer cartItemId={cartItemId}
                                                                     className="product-detail-component-update-button"/>
                            )}
                            {isBundleWishlistUpdating && (
                                <EditableBundleUpdateWishlistItemContainer wishlistItemId={wishlistItemId}
                                                                           className="product-detail-component-update-button"/>
                            )}
                        </div>
                        {showAddToCart && (
                            <AddToCartPanelComponent onShowVariationError={handleShowVariationError}/>
                        )}
                        <CmsBlockContainer cmsBlockId="product-detail-component-after-primary-information"
                                           group="product-detail-page"/>
                    </div>
                </>
            ) : (
                <>
                    <div className="product-detail-component-info-wrapper">
                        <ReviewsContainer as={ReviewSummaryComponent}/>
                        {!!brand && (
                            <div className="product-detail-component-brand">
                                {brand}
                            </div>
                        )}
                        <ProductTitleComponent colorCode={colorCode}/>
                        {isEditableBundle && (
                            <ProductPriceComponent ignoreQty={true}/>
                        )}
                        {!!subTitle && (
                            <div className="product-detail-component-subtitle">
                                {subTitle}
                            </div>
                        )}
                    </div>
                    <div className="product-detail-component-gallery">
                        {!wishlistItemId && (
                            <WishlistProductActionsContainer variant="icon-square"
                                                             qty={$qty}
                                                             engravedOptions={engravedOptions?.[0]}/>
                        )}
                        {!shownEngravingOptions ? (
                            <ProductMediaGalleryComponent/>
                        ) : (
                            <ProductEngravingPreviewComponent/>
                        )}
                    </div>
                    <div className="product-detail-component-info-wrapper">
                        {!!shortDescription && (
                            <div className="product-detail-component-short-description"
                                 dangerouslySetInnerHTML={{__html: shortDescription}}/>
                        )}
                        {!shownEngravingOptions && (
                            <ProductSettingsComponent/>
                        )}

                        {isPersonalisable && (
                            <ProductEngravingContainer showOptions={shownEngravingOptions}
                                                       onShowOptions={setShownEngravingOptions}/>
                        )}
                        {!inStock && !shownEngravingOptions && <StockStatusComponent/>}
                        {!shownEngravingOptions && !isEditableBundle && <ProductPriceComponent ignoreQty={true}/>}
                        {!inStock && isProductAlertEnabled && <ProductAlertContainer/>}
                    </div>
                    {showAddToCart && (
                        <AddToCartPanelComponent onShowVariationError={handleShowVariationError}/>
                    )}
                    {isBundleUpdating && inStock && (
                        <EditableBundleUpdateActionContainer cartItemId={cartItemId}
                                                             className="product-detail-component-update-button"/>
                    )}
                    {isBundleWishlistUpdating && (
                        <EditableBundleUpdateWishlistItemContainer wishlistItemId={wishlistItemId}
                                                                   className="product-detail-component-update-button"/>
                    )}
                    <CmsBlockContainer cmsBlockId="product-detail-component-after-primary-information"
                                       group="product-detail-page"/>
                </>
            )}
            <ProductDescriptionComponent/>
            <ReviewsContainer/>
        </div>
    );
}
