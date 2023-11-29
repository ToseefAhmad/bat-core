import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';

import {NumberInputComponent} from '@luft/common';
import type {Inventory} from '@luft/types';

import {
    useProductContextField,
    useProductState,
    ProductContext
} from '@luft/product';

import messages from '@luft/product/src/components/ProductQty.component/resources/messages';

type Props = {
    /**
     * Product inventory field, helps to identify stock and available quantity
     *
     * **Default value from ProductContext**
     */
    inventory?: Inventory | ProductContext.product.inventory,
    /**
     * Current Quantity value
     *
     *  **Default value from ProductContext**
     */
    qty?: number | ProductContext.productState.qty,
    /**
     * Quantity field title
     */
    title?: string,
    /**
     * Minimum allowed quantity
     */
    min?: number,
    /**
     * A callback, triggered, when quantity has changed
     */
    onQtyChange?: (string | number) => void
};

// A variable to not allow to user put number more then 21 digits to prevent converting to scientific notation
const MAX_LENGTH = 21;

/**
 * Component responsible for changing product quantity
 */
export function ProductQtyComponent(
    {
        inventory,
        qty,
        onQtyChange,
        title = '',
        min = 1,
        ...other
    }: Props) {
    const $inventory = useProductContextField('product.inventory', inventory);
    const [$qty, setQty] = useProductState('qty', qty);
    const {formatMessage} = useIntl();

    const handleQuantityChange = useCallback(({target}) => {
        const {value} = target;

        if (value.length <= MAX_LENGTH) {
            const qtyNumber = parseFloat(value) || 0;
            if (onQtyChange) onQtyChange(qtyNumber);
            setQty(qtyNumber);
        }
    }, [onQtyChange, setQty]);

    return !!$inventory?.in_stock && (
        <div className="product-qty-component">
            <div className="product-qty-component-title">
                {title || formatMessage(messages.title)}
            </div>
            <NumberInputComponent {...other}
                                  min={min}
                                  max={$inventory.qty}
                                  value={$qty}
                                  onChange={handleQuantityChange}
                                  type="text"
                                  aria-label={title || formatMessage(messages.title)}/>
        </div>
    );
}
