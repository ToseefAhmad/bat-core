import React from 'react';
import {useIntl} from 'react-intl';
import InfiniteScroll from 'react-infinite-scroller';
import {noop, isEmpty} from 'lodash';

import {LoaderComponent, useResolutions} from '@luft/common';

import {AccountRewardItemComponent} from '../AccountRewardItem.component';
import messages from './resources/messages';

type Props = {
    items?: Array,
    isLoadingMore: boolean,
    isExpirationEnabled: boolean,
    onLoadMore: () => Promise,
    canLoadMore: boolean
}

export function AccountRewardsComponent(props: Props) {
    const {formatMessage} = useIntl();
    const {
        items = [],
        isLoadingMore,
        isExpirationEnabled,
        onLoadMore = noop,
        canLoadMore,
        ...other
    } = props;

    const {isSMdown} = useResolutions();
    const detailsLabel = formatMessage(messages.details);
    const pointsLabel = formatMessage(messages.points);
    const dateLabel = formatMessage(messages.date_format);
    const expiryDateLabel = formatMessage(messages.expiry_date);

    return (
        <div className="account-rewards-component">
            <div className="account-rewards-component-title">
                {formatMessage(messages.title)}
            </div>
            {!isEmpty(items) ? (
                <div className="account-rewards-component-content">
                    {!isSMdown && (
                        <div className="account-rewards-component-content-label-wrapper">
                            <div className="account-rewards-component-content-label">
                                <div className="account-rewards-component-content-label-details">
                                    {detailsLabel}
                                </div>
                                <div className="account-rewards-component-content-label-points">
                                    {pointsLabel}
                                </div>
                                <div className="account-rewards-component-content-label-date">
                                    {dateLabel}
                                </div>
                                {isExpirationEnabled && (
                                    <div className="account-rewards-component-content-label-expiry-date">
                                        {expiryDateLabel}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <InfiniteScroll loadMore={() => !isLoadingMore && onLoadMore()}
                                    hasMore={canLoadMore}
                                    initialLoad={false}
                                    loader={isLoadingMore && (
                                        <LoaderComponent size="sm"
                                                         key="spinner"/>
                                    )}>
                        {items.map((item, key) => (
                            <AccountRewardItemComponent {...other}
                                                        // eslint-disable-next-line react/no-array-index-key
                                                        key={key}
                                                        item={item}
                                                        isExpirationEnabled={isExpirationEnabled}/>
                        ))}
                    </InfiniteScroll>
                </div>
            ) : (
                <div className="account-rewards-component-empty">
                    {formatMessage(messages.transaction_empty)}
                </div>
            )}
        </div>
    );
}
