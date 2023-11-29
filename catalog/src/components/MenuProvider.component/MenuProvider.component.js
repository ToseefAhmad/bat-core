import React, {
    useState,
    useMemo,
    useCallback
} from 'react';
import type {ComponentType} from 'react';

import {MenuProviderContext} from '../../contexts';

type Props = {
    /**
     * Children component
     */
    children?: ComponentType<{}>
};

export function MenuProviderComponent({children}: Props) {
    const [activeCategoryId, setActiveCategoryId] = useState();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleCloseCategories = useCallback(() => {
        setActiveCategoryId(null);
    }, []);

    const contextValue = useMemo(() => ({
        isMenuOpen,
        setIsMenuOpen,
        activeCategoryId,
        setActiveCategoryId,
        onCloseCategories: handleCloseCategories
    }), [activeCategoryId, handleCloseCategories, isMenuOpen]);

    return (
        <MenuProviderContext.Provider value={contextValue}>
            {children}
        </MenuProviderContext.Provider>
    );
}
