import React from 'react';
import {Transition} from 'react-transition-group';
import classnames from 'classnames';

import {MiniCartContainer} from '../MiniCart.container';
import {useMiniCart} from '../../hooks';

const ANIMATION_TIMEOUT = 400;

export function MiniCartTransitionComponent(props) {
    const {isOpenMiniCart} = useMiniCart();

    return (
        <Transition in={isOpenMiniCart}
                    timeout={ANIMATION_TIMEOUT}
                    mountOnEnter={true}
                    unmountOnExit={true}>
            {state => {
                const miniCartClassNames = classnames('mini-cart-transition-component', {
                    'mini-cart-transition-component-open': ['entering', 'entered'].includes(state),
                    'mini-cart-transition-component-closed': state === 'exiting'
                });

                return (
                    <MiniCartContainer className={miniCartClassNames}
                                       {...props}/>
                );
            }}
        </Transition>
    );
}
