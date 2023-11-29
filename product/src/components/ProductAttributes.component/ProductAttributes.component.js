import React from 'react';

import {ProductAttributeContentComponent} from '@luft/product/src/components/ProductAttributeContent.component';
import type {ProductAttribute} from '@luft/types';

type Props = {
    product_attributes: ProductAttribute[]
};

export function ProductAttributesComponent({product_attributes}: Props) {
    if (!product_attributes || !product_attributes.length) {
        return null;
    }

    return (
        <div className="product-attributes">
            {product_attributes.map(attribute => {
                    if (attribute.is_not_visible_on_storefront) return null;

                    return (
                        <div key={attribute.product_attribute_id}
                             className="product-attribute">
                            <span className="product-attribute-name">
                                {attribute.name}
                            </span>
                            <span className="product-attribute-delimiter">:</span>
                            <ProductAttributeContentComponent productAttribute={attribute}/>
                        </div>
                    );
                }
            )}
        </div>
    );
}
