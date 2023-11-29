import {createContext} from 'react';

export const GtmProviderContext = createContext({
    config: {},
    setConfig: () => undefined
});
