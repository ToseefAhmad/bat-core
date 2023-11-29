import React from 'react';

import {ProductAttribute, ProductAttributeTypeValues} from '@luft/types';

type Props = {
    productAttribute: ProductAttribute
};

export function ProductAttributeTextContentComponent({productAttribute}: Props) {
    if (!productAttribute && productAttribute.type !== ProductAttributeTypeValues.TEXT) {
        return null;
    }
    const attrValue = productAttribute.option_value || productAttribute.value;

    return (
        <span className="product-attribute-text-content-component">
            {attrValue}
        </span>
    );
}
