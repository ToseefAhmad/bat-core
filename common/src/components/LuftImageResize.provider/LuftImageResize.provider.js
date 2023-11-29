// TODO: Luft update v2.2.0
import React, {useMemo} from 'react';

import {LuftImageResizeContext} from '../../contexts';

export type LuftImageResizeProviderProps = {
    /**
     * A parameter, that defines if image resize should be supported
     */
    enabled?: boolean,
    /**
     * Provider nested elements
     */
    children: React.ReactNode
}

/**
 * @module @luft/common
 * @scope @luft/common
 * @exports LuftImageResizeProviderComponent
 * @function LuftImageResizeProviderComponent
 * @kind Provider
 *
 * @description
 * Provider, used to set default values for image resize functionality
 *
 * @param {React.ReactNode} props.children - Nested react elements
 */
export const LuftImageResizeProvider = (
    {
        enabled = true,
        children
    }: LuftImageResizeProviderProps) => {
    const context = useMemo(() => ({
        enabled
    }), [enabled]);

    return (
        <LuftImageResizeContext.Provider value={context}>
            {children}
        </LuftImageResizeContext.Provider>
    );
};
