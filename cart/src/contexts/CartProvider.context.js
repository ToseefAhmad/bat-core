import {createContext} from 'react';

import {CartItemActionsComponent} from '@luft/cart';

import {CartItemContainer} from '../components';

const CartProviderContext = createContext({
    renderers: new Map([
        ['CartItemContainer', CartItemContainer],
        ['CartItemActionsComponent', CartItemActionsComponent]
    ])
});

export {CartProviderContext};
