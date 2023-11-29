import React from 'react';
import {useIntl} from 'react-intl';
import InfiniteScroll from 'react-infinite-scroller';
import {noop, isEmpty} from 'lodash';

import {LoaderComponent, useResolutions} from '@luft/common';

import messages from './resources/messages';

type Props = {
    referrals?: Array,
    total?: number,
    isLoadingMore: boolean,
    onLoadMore: () => Promise,
    canLoadMore: boolean
}

export function AccountReferralsListComponent(props: Props) {
    const {formatMessage} = useIntl();
    const {
        referrals = [],
        total = 0,
        isLoadingMore,
        onLoadMore = noop,
        canLoadMore
    } = props;

    const {isSMdown} = useResolutions();

    return (
        <div className="account-referrals-list-component">
            <div className="account-referrals-list-component-header">
                <div className="account-referrals-list-component-header-title">
                    {formatMessage(messages.referrals_title)}
                </div>
                <div className="account-referrals-list-component-header-content">
                    {formatMessage(messages.you_have_referrals, {
                        total,
                        bold: (text) => (
                            <span className="account-referrals-list-component-header-content-referrals">
                                {text}
                            </span>
                        )
                    })}
                </div>
            </div>
            {!isEmpty(referrals) && (
                <div className="account-referrals-list-component-content">
                    {!isSMdown && (
                        <div className="account-referrals-list-component-content-header">
                            <div className="account-referrals-list-component-content-header-item">
                                {formatMessage(messages.name)}
                            </div>
                            <div className="account-referrals-list-component-content-header-item">
                                {formatMessage(messages.email)}
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
                        {referrals.map((item, key) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={key}
                                 className="account-referrals-list-component-content-item">
                                <div data-label={formatMessage(messages.name)}
                                     className="account-referrals-list-component-content-item-data">
                                    <div className="account-referrals-list-component-content-item-data-text">
                                        {item?.name}
                                    </div>
                                </div>
                                <div data-label={formatMessage(messages.email)}
                                     className="account-referrals-list-component-content-item-data">
                                    <div className="account-referrals-list-component-content-item-data-text">
                                        {item?.email}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            )}
        </div>
    );
}
