import {useViewerQuery} from './useViewerQuery';

export function useIsPasswordOutdated(opts) {
    const {data} = useViewerQuery({fetchPolicy: 'cache-only', ...opts});

    const isPasswordUpdated = data?.viewer?.user?.password_info?.is_password_updated;

    return isPasswordUpdated === false || isPasswordUpdated === null;
}
