import React from 'react';
import {useIntl} from 'react-intl';
import classnames from 'classnames';

import {ButtonComponent, LoaderComponent} from '@luft/common';
import type {SocialLoginProvider, SocialProviderConnection} from '@luft/types';

import messages from '@luft/user/src/components/SocialProviders.component/resources/messages';

type Props = {
    /**
     * Loading state
     */
    loading?: boolean,
    /**
     * Social login providers
     */
    providers: SocialLoginProvider[],
    /**
     * Connected providers
     */
    connectedProviders?: SocialProviderConnection[],
    /**
     * Title variant
     */
    variant?: false | 'connect',
    /**
     * Remove connection callback
     */
    onRemove?: (type: string) => void,
    /**
     * Social login callback
     */
    onSocialLogin?: (React.SyntheticEvent) => void
};

/**
 * A component, that showing a list of social providers and indicates which of them is connected
 */
export function SocialProvidersComponent({
    loading,
    providers,
    connectedProviders = [],
    variant,
    onRemove,
    onSocialLogin
}: Props) {
    const {formatMessage} = useIntl();

    if (!providers?.length) {
        return null;
    }

    const title = variant ? messages.title_connect : messages.title;

    return (
        <div className="social-providers-component"
             data-separator={formatMessage(messages.or)}>
            {loading && (
                <LoaderComponent type="overlay"/>
            )}
            {providers.map(({type, url}) => {
                const connection = connectedProviders.find(p => p.type === type);
                const {first_name, last_name} = connection || {};
                const classNames = classnames('social-providers-component-button', {
                    [`social-providers-component-button-${type.toLowerCase()}`]: !!type
                });
                return (
                    <div key={type}
                         className="social-providers-component-item">
                        {connection ? (
                            <>
                                <ButtonComponent className={classNames}
                                                 type="button"
                                                 variant="tertiary"
                                                 disabled={true}
                                                 title={formatMessage(messages.profile, {first_name, last_name})}>
                                    <span className="social-providers-component-button-text">
                                        {formatMessage(messages.profile, {first_name, last_name})}
                                    </span>
                                </ButtonComponent>
                                <div className="social-providers-component-actions">
                                    <ButtonComponent type="button"
                                                     inline={true}
                                                     variant="light"
                                                     className="social-providers-component-remove"
                                                     onClick={() => onRemove && onRemove(type)}
                                                     title={formatMessage(messages.remove)}/>
                                </div>
                            </>
                        ) : (
                            <a href={url}
                               className={classNames}
                               title={formatMessage(title, {type})}
                               onClick={onSocialLogin}
                               rel="nofollow">
                                <span className="social-providers-component-button-text">
                                    {formatMessage(title, {type})}
                                </span>
                            </a>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
