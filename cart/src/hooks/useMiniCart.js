import {useContext, useMemo} from 'react';

import {useStoreConfigQuery} from '@luft/common';

import {MiniCartProviderContext} from '../contexts';

export const useMiniCart = () => {
    const q = useStoreConfigQuery();
    const context = useContext(MiniCartProviderContext);

    const isEnabledMiniCart = q.data?.storeConfig?.is_minicart_enabled;

    return useMemo(() => ({...context, isEnabledMiniCart}), [context, isEnabledMiniCart]);
};
