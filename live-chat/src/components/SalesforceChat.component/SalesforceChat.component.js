import React, {
    useEffect,
    useRef,
    useState
} from 'react';
import {useIntl} from 'react-intl';
import {Link} from 'react-router-dom';
import Script from 'react-load-script';
import {noop} from 'lodash';

import {ErrorComponent} from '@luft/common';

import {getStoreCodeByPathname} from '../../../../common';
import messages from './resources/messages';

type Props = {
    endpointUrl: string,
    organizationId: string,
    deploymentId: string,
    buttonId: string,
    scriptUrl: string,
    position: number
};

export function SalesforceChatComponent(props: Props) {
    const {
        endpointUrl,
        organizationId,
        deploymentId,
        buttonId,
        scriptUrl,
        position
    } = props;

    const [liveChat, setLiveChat] = useState();
    const [scriptError, setScriptError] = useState();
    const [showTooltip, setShowTooltip] = useState(false);
    const {formatMessage} = useIntl();
    const onlineRef = useRef();
    const offlineRef = useRef();
    const tooltipRef = useRef();

    const hasWindow = typeof window !== 'undefined';
    const hasRequiredProps = endpointUrl && organizationId && deploymentId && buttonId;
    const isIndonesia = getStoreCodeByPathname() === 'id';
    const linkPath = isIndonesia ? '/hubungi-kami' : '/contact-us';

    useEffect(() => {
        const online = onlineRef.current;
        const offline = offlineRef.current;

        if (!hasWindow || !online || !offline) return;

        if (!window._laq) {
            window._laq = [];
        }

        window._laq.push(() => {
            window.liveagent.showWhenOnline(buttonId, online);
            window.liveagent.showWhenOffline(buttonId, offline);
        });
    }, [hasWindow, buttonId]);

    useEffect(() => {
        if (!liveChat) return;

        liveChat.init(endpointUrl, organizationId, deploymentId);
    }, [liveChat, endpointUrl, organizationId, deploymentId]);

    useEffect(() => {
        if (!hasWindow) return;

        const handleClickOffline = (e) => {
            if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
                setShowTooltip(false);
            }
        };

        document.addEventListener('mousedown', handleClickOffline);

        return () => document.removeEventListener('mousedown', handleClickOffline);
    });

    const onStartChat = (e) => {
        e.preventDefault();
        window.liveagent.startChat(buttonId);
    };

    if (!hasWindow || !hasRequiredProps) {
        return null;
    }

    return (
        <div className="salesforce-chat-component"
             style={{bottom: position}}>
            {scriptError && <ErrorComponent error={scriptError}/>}
            <Script url={scriptUrl}
                    onError={setScriptError}
                    onLoad={() => setLiveChat(() => {
                        if (hasWindow) {
                            return window.liveagent;
                        }
                    })}/>
            <div ref={onlineRef}
                 className="salesforce-chat-component-online"
                 style={{display: 'none'}}>
                <span className="salesforce-chat-component-online-action"
                      title={formatMessage(messages.text)}
                      role="button"
                      tabIndex="0"
                      onClick={onStartChat}
                      onKeyPress={noop}>
                    <span className="salesforce-chat-component-text">
                        {formatMessage(messages.text)}
                    </span>
                    <span className="salesforce-chat-component-icon"/>
                </span>
            </div>
            <div ref={offlineRef}
                 className="salesforce-chat-component-offline"
                 style={{display: 'none'}}>
                {showTooltip ? (
                    <>
                        <div ref={tooltipRef}
                             className="salesforce-chat-component-tooltip">
                            {formatMessage(messages.offline)}
                            <Link title={formatMessage(messages.offline_contact_us)}
                                  role="link"
                                  to={linkPath}>
                                {formatMessage(messages.offline_contact_us)}
                            </Link>
                        </div>
                        <div className="salesforce-chat-component-offline-action">
                            <span className="salesforce-chat-component-text">
                                {formatMessage(messages.text)}
                            </span>
                            <span className="salesforce-chat-component-icon"/>
                        </div>
                    </>
                ) : (
                    <div className="salesforce-chat-component-offline-action"
                         role="button"
                         tabIndex="0"
                         onClick={() => setShowTooltip(true)}
                         onKeyPress={noop}>
                        <span className="salesforce-chat-component-text">
                            {formatMessage(messages.text)}
                        </span>
                        <div className="salesforce-chat-component-icon"/>
                    </div>
                )}
            </div>
        </div>
    );
}
