import {useContext, useMemo} from 'react';
import {onError} from '@apollo/client/link/error';

import {LuftApolloContext} from '@luft/apollo/src/context';

/**
 * @module @luft/apollo
 * @scope @luft/apollo
 * @exports useInternalServerErrorLink
 * @function useInternalServerErrorLink
 * @kind Hook
 *
 * @description
 * Emit 'onInternalServerError' event if network receives error greater or equal 500
 *
 * @returns {ApolloLink} Custom Apollo Link
 *
 * @example
 * ```js
 * import {useInternalServerErrorLink} from '@luft/apollo';
 * ```
 *
 * @example
 * ```jsx
 * const internalServerErrorLink = useInternalServerErrorLink();
 * ```
 */
export const useInternalServerErrorLink = () => {
    const emitter = useContext(LuftApolloContext)?.onInternalServerErrorEmitter;

    return useMemo(() => onError(({networkError}) => {
        if (!emitter) return;

        if (networkError?.statusCode === 503) {
            emitter.emit('onInternalServerError', true);
        } else {
            emitter.emit('onInternalServerError', false);
        }
    }), [emitter]);
};
