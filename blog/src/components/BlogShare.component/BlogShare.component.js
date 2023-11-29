import React, {useState, useEffect} from 'react';
import {useIntl} from 'react-intl';
import Script from 'react-load-script';

import messages from './resources/messages';

const ADDTHIS_URL = 'https://s7.addthis.com/js/300/addthis_widget.js';
const ADDTHIS_READY_EVENT = 'addthis.ready';

type Props = {
    /**
     * AddThis identifier
     */
    id: string,
    /**
     * AddThis language code
     */
    lang: string,
    /**
     * Title to share
     */
    title: string,
    /**
     * Url to share
     */
    url: string
};

export function BlogShareComponent(props: Props) {
    const {
        id,
        lang,
        title,
        url
    } = props;

    const {formatMessage} = useIntl();
    const [isLoaded, setIsLoaded] = useState(false);

    // AddThis need to be reinitialised if url has been changed
    useEffect(() => {
        if (!window || !window.addthis) return;

        window.addthis.layers.refresh();
    }, [url]);

    // Override default browser localization from settings param (if exist)
    useEffect(() => {
        if (!window?.addthis || !isLoaded || !lang) return;

        const handleSetLanguage = () => {
            const addThisConfig = window.addthis_config || {};

            addThisConfig.lang = lang;
        };

        window.addthis.addEventListener(ADDTHIS_READY_EVENT, handleSetLanguage);

        return () => window.addthis.removeEventListener(ADDTHIS_READY_EVENT, handleSetLanguage);
    }, [isLoaded, lang]);

    if (!id) return null;

    return (
        <div className="blog-share-component">
            <Script url={`${ADDTHIS_URL}#pubid=${id}`}
                    onLoad={() => setIsLoaded(true)}/>
            {isLoaded && (
                <div className="blog-share-component-box">
                    <div className="blog-share-component-title">
                        {formatMessage(messages.title)}
                    </div>
                    <div className="addthis_inline_share_toolbox"
                         data-url={url}
                         data-title={title}>
                        {/* AddThis social share buttons will be added here (don't change box className !) */}
                    </div>
                </div>
            )}
        </div>
    );
}
