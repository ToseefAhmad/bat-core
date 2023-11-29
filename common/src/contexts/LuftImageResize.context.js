// TODO: Luft update v2.2.0
import {createContext} from 'react';

export type LuftImageResizeContextType = {
    /**
     * A parameter, that defines if image resize should be supported
     * true by default (improves performance)
     */
    enabled: boolean
};

/**
 * @type React.Context<LuftImageResizeContext>
 *
 * @scope @luft/common
 * @kind Context
 *
 * @description
 * Defines if image resize should be supported
 *
 * @property {boolean} enabled=true - A parameter, that defines if image resize should be supported
 *
 * @example
 * ```js
 * import {LuftImageResizeContext} from '@luft/common';
 * import type {LuftImageResizeContextType} from '@luft/common';
 * ```
 */
export const LuftImageResizeContext: LuftImageResizeContextType = createContext({
    enabled: true
});
