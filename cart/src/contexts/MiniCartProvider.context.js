import {createContext} from 'react';

export const MiniCartProviderContext = createContext({
    isOpenMiniCart: false,
    onToggleMiniCart: () => undefined,
});
