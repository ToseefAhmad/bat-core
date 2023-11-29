import React, {
    useRef,
    createRef
} from 'react';
import classnames from 'classnames';
import {
    noop,
    last,
    nth
} from 'lodash';
import {useIntl} from 'react-intl';
import type {ComponentType} from 'react';

import {useResolutions, ButtonComponent} from '@luft/common';
import {useProductRenderer} from '@luft/product';
import type {Product} from '@luft/types';

import messages from './resources/messages';

type Props = {
    productPreviewAs: ComponentType<{}>,
    className?: string,
    title?: string,
    products?: Product[],
    numberVisible?: number,
    showMiniCart?: boolean,
    wishlistEnabled?: boolean,
    showAttributes?: boolean,
    onProductClick?: Function,
    onAddToWishlist?: Function,
    onAddToCart?: Function
};

export function ProductListSliderComponent(props: Props) {
    const {isSMdown} = useResolutions();
    const ProductPreviewComponent = useProductRenderer('ProductPreviewComponent');

    const {
        productPreviewAs: Component = ProductPreviewComponent,
        title,
        products,
        numberVisible = isSMdown ? 2 : 4,
        showMiniCart,
        wishlistEnabled,
        showAttributes = false,
        onProductClick = noop,
        onAddToWishlist = noop,
        onAddToCart = noop,
        className
    } = props;

    // TODO: better handle dynamic ref generation on products change
    const itemsHolder = useRef();
    const items = createRef();
    const {formatMessage} = useIntl();

    items.current = products && products.map(() => createRef());

    if (!products || !products.length) {
        return null;
    }

    const productsClassNames = classnames(
        'product-list-slider-component-products',
        `product-list-slider-component-products-${numberVisible}`
    );

    const scrollTo = position => itemsHolder.current.scrollTo({
        left: position,
        behavior: 'smooth'
    });

    const scrollNext = () => {
        const els = items
            .current
            .filter(i => i.current.offsetLeft >= itemsHolder.current.scrollLeft);

        const el = nth(els, 1) || nth(els, 0);

        if (el) {
            scrollTo(itemsHolder.current.scrollLeft + el.current.offsetWidth);
        }
    };

    const isScrollable = products.length > numberVisible;

    const scrollPrev = () => {
        const el = last(
            items
                .current
                .filter(i => i.current.offsetLeft < itemsHolder.current.scrollLeft)
        );

        if (el) {
            scrollTo(itemsHolder.current.scrollLeft - el.current.offsetWidth);
        }
    };

    return (
        <div className={classnames('product-list-slider-component', className, {
            'product-list-slider-component-not-scrollable': !isScrollable
        })}>
            {title && (
                <h2 className="product-list-slider-component-title">
                    {title}
                </h2>
            )}
            <div className="product-list-slider-component-products-holder">
                {isScrollable && (
                    <ButtonComponent className="product-list-slider-component-arrow product-list-slider-component-arrow-left"
                                     variant="link"
                                     inline={true}
                                     aria-label={formatMessage(messages.prev)}
                                     onClick={scrollPrev}/>
                )}
                <div className={productsClassNames}
                     ref={itemsHolder}>
                    {products.map((product, i) => (
                        <div key={product.id}
                             ref={items.current[i]}
                             className="product-list-slider-component-product">
                            <Component product={product}
                                       wishlistEnabled={wishlistEnabled}
                                       showMiniCart={showMiniCart}
                                       showAttributes={showAttributes}
                                       onProductClick={onProductClick}
                                       onAddToWishlist={onAddToWishlist}
                                       onAddToCart={onAddToCart}/>
                        </div>
                    ))}
                </div>

                {isScrollable && (
                    <ButtonComponent className="product-list-slider-component-arrow product-list-slider-component-arrow-right"
                                     variant="link"
                                     inline={true}
                                     aria-label={formatMessage(messages.next)}
                                     onClick={scrollNext}/>
                )}
            </div>
        </div>
    );
}
