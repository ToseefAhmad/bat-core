import React from 'react';
import {useIntl} from 'react-intl';
import classnames from 'classnames';

import {
    ProductQtyComponent,
    useProductContextField,
    ProductContext
} from '@luft/product';
import {BundleOption, Inventory} from '@luft/types';

import {BundledProductComponent} from '../BundledProduct.component';

import messages from './resources/messages';

type Props = {
    /**
     * Options available for bundle
     *
     * **Default value from ProductContext**
     */
    bundledOptions: BundleOption[] | ProductContext.product.bundled_products,
    /**
     * Custom className
     */
    className?: string,
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
}

/**
 * Component displays product primary info which depends on Product Type. Information is placed on the PDP page.
 * Component includes set of bundled products and ProductQtyComponent. Data to display in the both of these
 * components should be gotten from the ProductContext. Also there is possibility to send data via props.
 * In this case props will be used as default data if no context is detected.
 */
export function BundledProductSettingsComponent(
    {
        bundledOptions,
        className,
        ...other
    }: Props) {
    const $bundledOptions = useProductContextField('product.bundled_products', bundledOptions);
    const {formatMessage} = useIntl();

    return !!$bundledOptions?.length && (
        <div className={classnames(className, 'bundled-product-settings-component')}>
            <h2 className="bundled-product-settings-component-title">
                {formatMessage(messages.title)}
            </h2>
            <div className="bundled-product-settings-component-wrapper">
                {$bundledOptions.map((bundledOption) => (
                    <BundledProductComponent bundledProduct={bundledOption.products[0]}
                                             key={bundledOption.products[0].product.id}/>
                ))}
            </div>
            <ProductQtyComponent {...other}/>
        </div>
    );
}
