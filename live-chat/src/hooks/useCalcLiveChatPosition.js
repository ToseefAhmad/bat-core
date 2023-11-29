import {useEffect, useState} from 'react';

import {useResolutions} from '@luft/common';

export function useCalcLiveChatPosition(panel) {
    const [liveChatPosition, setLiveChatPosition] = useState();
    const {isXS} = useResolutions();

    const panelHeight = panel?.current?.offsetHeight;
    const liveChatBottom = 10;
    const liveChatBottomPosition = `${liveChatBottom}px`;

    const calcPosition = () => {
        if (!isXS || !panel) return false;

        const panelPositionBottom = window?.innerHeight - panel?.current?.getBoundingClientRect().bottom;
        // For some reasons there is a difference in the values in 0.5px in IOS so left condition with > 1 to fix it
        const isPanelSticky = !(panelPositionBottom > 1);
        const chatPositionBottom = panelPositionBottom + panelHeight;
        const liveChatStickyBottom = (chatPositionBottom > 0 ? chatPositionBottom : 0) + liveChatBottom;
        const liveChatStickyBottomPosition = `${liveChatStickyBottom}px`;

        return isPanelSticky ? liveChatStickyBottomPosition : liveChatBottomPosition;
    };

    const handleLiveChatPosition = () => {
        setLiveChatPosition(calcPosition());
    };

    useEffect(() => {
        setLiveChatPosition(calcPosition());
        document.addEventListener('scroll', handleLiveChatPosition);

        return () => {
            document.removeEventListener('scroll', handleLiveChatPosition);
            setLiveChatPosition(false);
        };
    }, [panel?.current]);

    return {liveChatPosition, setLiveChatPosition};
}
