import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';
import {useHistory} from 'react-router-dom';
import type {RefObject} from 'react';

import {AddToCartComponent} from '@luft/quote';

import {useMiniCart} from '../../hooks';

import messages from './resources/messages';

type Props = {
    addToCartRef?: RefObject
};

export const AddToCartPanelComponent = (props: Props) => {
    const {
        addToCartRef,
        ...other
    } = props;

    const {formatMessage} = useIntl();
    const history = useHistory();
    const {isEnabledMiniCart, onToggleMiniCart} = useMiniCart();

    const handleBuyNow = useCallback(() => {
        history.push('/checkout');
    }, [history]);

    const handleAddToCart = useCallback(() => {
        if (isEnabledMiniCart) {
            onToggleMiniCart();
        }
    }, [isEnabledMiniCart, onToggleMiniCart]);

    return (
        <div className="add-to-cart-panel-component"
             ref={addToCartRef}>
            <div className="add-to-cart-panel-component-actions">
                <AddToCartComponent {...other}
                                    onAddToCart={handleBuyNow}
                                    title={formatMessage(messages.proceed_to_checkout)}/>
                <AddToCartComponent {...other}
                                    onAddToCart={handleAddToCart}
                                    showSuccessMessage={!isEnabledMiniCart}
                                    title={formatMessage(messages.add_to_basket)}
                                    variant="tertiary"/>
            </div>
        </div>
    );
};
