import {
    each,
    isBoolean,
    castArray
} from 'lodash';

import {getVariationDataFromCartItem} from './getVariationDataFromCartItem';

const getProduct = ({
    item,
    quantity,
    position,
    variantData,
    attributes,
    coupon,
    isQtyNumber,
    isGA4
}) => {
    // TODO: For GA4 remove item?.configurable_variation in future
    const productData = isGA4 && item.product
        ? item.product
        : item.configurable_variation?.product || item.product || item;
    const productAttributes = attributes || productData.product_attributes;
    const variant = variantData || getVariationDataFromCartItem(item) || {};

    const product = isGA4 ? {
        item_id: productData.id,
        item_name: productData.name,
        price: productData.price?.final?.amount?.value?.toString(),
        ...variant
    } : {
        name: productData.name,
        price: productData.price?.final?.amount?.value,
        id: productData.sku
    };

    if (quantity) {
        const qty = isBoolean(quantity) ? item.quantity : quantity;

        product.quantity = !isGA4 || isQtyNumber ? qty : qty.toString();
    }

    if (productAttributes) {
        productAttributes.forEach((attr) => {
            if (!attr.use_in_google_analytics) return;

            const attrId = attr.product_attribute_id;
            const attrCode = attrId === 'category_dl' ? 'category' : attrId;
            const attrValue = attr.option_value || attr.value;

            product[attrCode] = attrValue;
        });
    }

    if (position) {
        product[isGA4 ? 'index' : 'position'] = position;
    }

    if (isGA4) {
        if (productData.categories) {
            each(productData.categories, (category, i) => {
                const categoryName = i === 0 ? 'item_category' : `item_category_${i}`;

                product[categoryName] = category.name;
            });
        }

        if (coupon) {
            product.item_coupon = coupon;
        }
    }

    return product;
};

export const getProductList = ({
    productsData,
    quantity = null,
    isNeedPosition = false,
    variantData = null,
    attributes = null,
    coupon = null,
    isQtyNumber = false,
    isGA4 = false
}) => castArray(productsData).map((item, i) => getProduct({
    item,
    quantity,
    position: isNeedPosition ? i + 1 : null,
    variantData,
    attributes,
    coupon,
    isQtyNumber,
    isGA4
}));
