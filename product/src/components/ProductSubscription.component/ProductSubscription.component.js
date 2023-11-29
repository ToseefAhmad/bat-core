import React, {useCallback} from 'react';
import {useIntl} from 'react-intl';
import {Link} from 'react-router-dom';

import {RadioComponent} from '@luft/common';
import {CmsBlockContainer} from '@luft/cms';
import {useProductState} from '@luft/product';

import messages from './resources/messages';

export function ProductSubscriptionComponent() {
    const {formatMessage} = useIntl();
    const [isSubscription, setIsSubscription] = useProductState('product.isSubscription');

    const handleChange = useCallback((e) => {
        setIsSubscription(e.currentTarget.id === 'subscription');
    }, [setIsSubscription]);

    return (
        <div className="product-subscription-component">
            <CmsBlockContainer cmsBlockId="subscribe-up-label"/>
            <div className="product-subscription-component-item">
                <RadioComponent id="one-time"
                                name="subscription"
                                defaultChecked={!isSubscription}
                                className="product-subscription-component-switcher"
                                label={formatMessage(messages.one_time_label)}
                                onChange={handleChange}/>
            </div>
            <div className="product-subscription-component-item">
                <div className="product-subscription-component-item-body">
                    <RadioComponent id="subscription"
                                    name="subscription"
                                    defaultChecked={isSubscription}
                                    className="product-subscription-component-switcher"
                                    label={formatMessage(messages.subscription_label)}
                                    onChange={handleChange}/>
                    <div className="product-subscription-component-item-description">
                        {formatMessage(messages.description)}
                    </div>
                </div>
                <Link to="/subscriptions"
                      className="product-subscription-component-link">
                    {formatMessage(messages.link_text)}
                </Link>
            </div>
        </div>
    );
}
