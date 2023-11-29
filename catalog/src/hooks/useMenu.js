import {useContext} from 'react';

import {MenuProviderContext} from '../contexts';

export const useMenu = () => useContext(MenuProviderContext);
