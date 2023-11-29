import {createContext} from 'react';

export const RestrictAccessProviderContext = createContext({
    accessStatus: 'basic',
    isBasicAccessStatus: true,
    isAdvancedAccessStatus: false,
    isConfirmedAccessStatus: false,
    onSetAdvancedAccessStatus: () => undefined,
    onSetConfirmedAccessStatus: () => undefined
});
