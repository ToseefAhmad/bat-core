import {useContext} from 'react';

import {RestrictAccessProviderContext} from '../contexts';

export const useRestrictAccess = () => useContext(RestrictAccessProviderContext);
