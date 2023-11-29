import React from 'react';
import {useIntl} from 'react-intl';

import {
    ModalComponent,
    LoaderComponent,
    useResolutions
} from '@luft/common';

import type {Product} from '@luft/types';

import {ProductListSliderComponent, ProductPreviewComponent} from '../../../../product';
import messages from './resources/messages';

type Props = {
    products: Product[],
    onClose?: (React.SyntheticEvent) => void,
    showFreeGifts: boolean,
    onAddToCart?: (Product) => void,
    addToCartAction?: boolean,
    loading?: boolean
};

export function FreeGiftModalComponent(props: Props) {
    const {
        products,
        onClose,
        showFreeGifts,
        onAddToCart,
        addToCartAction = true,
        loading = false
    } = props;

    const {isSMdown} = useResolutions();
    const {formatMessage} = useIntl();

    return (
        <ModalComponent className="free-gift-modal-component"
                        show={showFreeGifts}
                        onToggleShow={onClose}
                        modalTitle={formatMessage(messages.title)}
                        headerVariant="secondary-revert"
                        size="confirm"
                        backdrop="static">

            {loading && <LoaderComponent type="overlay"/>}

            <ProductListSliderComponent productPreviewAs={ProductPreviewComponent}
                                        className="free-gift-modal-component-slider"
                                        numberVisible={isSMdown ? 1 : 2}
                                        onAddToCart={onAddToCart}
                                        addToCartAction={addToCartAction}
                                        buttonClassName="free-gift-modal-component-button"
                                        buttonLabel={formatMessage(messages.button_label)}
                                        products={products}/>
        </ModalComponent>
    );
}
