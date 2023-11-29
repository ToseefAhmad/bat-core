import React, {
    useCallback,
    useEffect,
    useState,
    useRef
} from 'react';
import {useIntl} from 'react-intl';
import {useLocation} from 'react-router';

import {
    ReviewRatingComponent,
    AddReviewFormModalComponent,
    ReviewsContainer
} from '@luft/review';
import {ProductContext} from '@luft/product';
import {
    ButtonComponent,
    LoaderComponent,
    useScrollTo,
    useResolutions
} from '@luft/common';
import type {Review, ReviewRatingSummary} from '@luft/types';

import messages from '@luft/review/src/components/Reviews.component/resources/messages';

import {ReviewItemComponent} from '../ReviewItem.component';

import custom_messages from './resources/messages';

type Props = {
    /**
     * Current product ID
     *
     * **Default value from ProductContext**
     */
    productId?: number | string | ProductContext.product.id,
    /**
     * Reviews list
     */
    reviews: Review[],
    /**
     * Total number of product reviews
     */
    total: number,
    /**
     * Summary data of product reviews
     */
    summary: ReviewRatingSummary,
    /**
     * Flag, that identifies remaining number of reviews for pagination
     */
    canLoadMore: boolean,
    /**
     * Callback used when user fetch next pagination data
     */
    onLoadMore: () => void,
    /**
     * Loading state, usually identifies fetch pagination items processing
     */
    isLoadingMore?: boolean
};

const REVIEWS_HASH = '#reviews';
const SM_DELTA = 84;
const MD_DELTA = 144;

/**
 * List of product reviews with the ability to load the next set of reviews by clicking on the 'Load More' control
 */
export function ReviewsComponent(
    {
        productId,
        reviews,
        total,
        summary,
        canLoadMore,
        isLoadingMore,
        onLoadMore
    }: Props) {
    const {formatMessage} = useIntl();
    const location = useLocation();
    const container = useRef();
    const scrollTop = useScrollTo(container);
    const {isSMdown} = useResolutions();
    const [isAddNewOpen, setIsAddNewOpen] = useState(false);

    useEffect(() => {
        const {hash} = location;

        if (hash === REVIEWS_HASH) {
            const delta = isSMdown ? SM_DELTA : MD_DELTA;
            const top = container.current.offsetTop - delta;
            scrollTop(top);
        }
    }, [location]);

    const openAddNew = useCallback(() => setIsAddNewOpen(true), []);
    const closeAddNew = useCallback(() => setIsAddNewOpen(false), []);

    return (
        <div className="reviews-component"
             ref={container}>
            <h2 className="reviews-component-title">
                {formatMessage(messages.title)}
            </h2>
            <div className="reviews-component-header">
                <div className="reviews-component-rating">
                    <span className="reviews-component-rating-title">
                        {formatMessage(messages.average_rating)}
                    </span>
                    <ReviewRatingComponent percent={summary && summary.percent}
                                           className="reviews-component-rating-stars"/>
                    {summary && summary.value > 0 && (
                        <span className="reviews-component-rating-value">
                            {(Math.round(summary.value * 10) / 10).toFixed(1)}
                        </span>
                    )}
                </div>
                <div className="reviews-component-total">
                    {formatMessage(messages.reviews_count, {total: total || 0})}
                </div>
                <div className="reviews-component-header-actions">
                    <ButtonComponent type="button"
                                     variant="primary-link"
                                     inline={true}
                                     className="reviews-component-header-action"
                                     onClick={openAddNew}
                                     title={formatMessage(messages.write_review)}>
                        {formatMessage(messages.write_review)}
                    </ButtonComponent>
                </div>
            </div>
            {reviews?.length ? (
                <div className="reviews-component-list">
                    <div className="reviews-component-items">
                        {reviews.map(item => (
                            <ReviewItemComponent key={item.id}
                                                 review={item}/>
                        ))}
                    </div>
                    {canLoadMore && (
                        <div className="reviews-component-load-more">
                            <ButtonComponent type="button"
                                             variant="secondary"
                                             className="reviews-component-load-more-action"
                                             disabled={isLoadingMore}
                                             onClick={onLoadMore}
                                             title={formatMessage(custom_messages.read_all)}>
                                <span className="reviews-component-load-more-action-title">
                                    {formatMessage(custom_messages.read_all)}
                                </span>
                                {isLoadingMore && (
                                    <LoaderComponent size="sm"
                                                     variant="light"
                                                     type="attached"/>
                                )}
                            </ButtonComponent>
                        </div>
                    )}
                </div>
            ) : (
                <div className="reviews-component-empty">
                    <ButtonComponent type="button"
                                     variant="secondary"
                                     className="reviews-component-first-review"
                                     onClick={openAddNew}
                                     title={formatMessage(messages.first_to_review)}>
                        {formatMessage(messages.first_to_review)}
                    </ButtonComponent>
                </div>
            )}
            <ReviewsContainer productId={productId}
                              isOpen={isAddNewOpen}
                              onClose={closeAddNew}
                              onAddReviewSuccess={closeAddNew}
                              onAddReviewCancel={closeAddNew}
                              as={AddReviewFormModalComponent}/>
        </div>
    );
}
