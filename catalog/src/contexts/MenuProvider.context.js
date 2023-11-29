import {createContext} from 'react';

type MenuProviderContextProps = {
    /**
     * An Id of a chosen category
     */
    activeCategoryId: string | null,
    /**
     * A callback that set up an active category id as an id of a chosen category
     */
    setActiveCategoryId: (id: string | null) => void,
    /**
     * A callback that mostly used to clear active category id
     */
    onCloseCategories: () => void,
    /**
     * A flag that indicates if menu is open
     */
    isMenuOpen: boolean,
    /**
     * A callback that updates open\closed menu state
     */
    setIsMenuOpen: () => void
}

export const MenuProviderContext: MenuProviderContextProps = createContext({
    activeCategoryId: null,
    setActiveCategoryId: () => undefined,
    onCloseCategories: () => undefined,
    isMenuOpen: false,
    setIsMenuOpen: () => undefined
});
