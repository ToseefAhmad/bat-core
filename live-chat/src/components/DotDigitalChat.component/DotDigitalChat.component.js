import {useEffect} from 'react';

import {URL_BASE, CHAT_SRC} from './constants';

type Props = {
    elementId?: string,
    elementType?: string,
    apiSpace: string
};

export function DotDigitalChatComponent(props: Props) {
    const {
        elementId = 'ddg-chat-widget',
        elementType = 'script',
        apiSpace
    } = props;
    const hasWindow = typeof window !== 'undefined';

    useEffect(() => {
        if (!hasWindow || !apiSpace || document.getElementById(elementId)) {
            return;
        }

        window._ddgChatConfig = {apiSpace, urlBase: URL_BASE};

        const cjs = document.querySelector(elementType);
        const js = document.createElement(elementType);

        js.src = CHAT_SRC;
        js.id = elementId;

        cjs.before(js);
    }, [hasWindow, elementId, elementType, apiSpace]);

    return null;
}
