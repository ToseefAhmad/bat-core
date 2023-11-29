import React, {
    useState,
    useMemo,
    useCallback
} from 'react';
import type {ComponentType} from 'react';

import {MiniCartProviderContext} from '../../contexts';

type Props = {
    /**
     * Children component
     */
    children?: ComponentType<{}>
};

export function MiniCartProviderComponent({children}: Props) {
    const [isOpenMiniCart, setIsOpenMiniCart] = useState(false);

    const handleToggleMiniCart = useCallback(() => {
        setIsOpenMiniCart(prevIsOpen => !prevIsOpen);
    }, []);

    const contextValue = useMemo(() => ({
        isOpenMiniCart,
        onToggleMiniCart: handleToggleMiniCart
    }), [isOpenMiniCart, handleToggleMiniCart]);

    return (
        <MiniCartProviderContext.Provider value={contextValue}>
            {children}
        </MiniCartProviderContext.Provider>
    );
}
