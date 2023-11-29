import {useCurrentStoreBaseName} from '@luft/multistore';

export function useRelativeUrl(url) {
    const baseName = useCurrentStoreBaseName();
    if (!url) return null;
    const {pathname} = new URL(url);
    return pathname.replace(baseName, '');
}
