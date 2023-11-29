import React, {useCallback, useState} from 'react';
import {noop} from 'lodash';
import {useIntl} from 'react-intl';

import {ButtonComponent, CustomLinkComponent} from '@luft/common';
import {ProductContext} from '@luft/product';
import {
    ReviewsContainer,
    ReviewRatingComponent,
    AddReviewFormModalComponent,
    useIsEnabledReview
} from '@luft/review';
import type {ReviewRatingSummary} from '@luft/types';
import messages from '@luft/review/src/components/ReviewSummary.component/resources/messages';

type Props = {
    /**
     * Current product ID
     *
     * **Default value from ProductContext**
     */
    productId?: number | string | ProductContext.product.id,
    /**
     * Total number of product reviews
     */
    total: number,
    /**
     * Summary data of product reviews
     */
    summary: ReviewRatingSummary
};

/**
 * Product review summary that displays common rating, count of product reviews, 'Add Your Review' control.
 * If product don't have any review, then 'Be the first to review' control is displayed
 */
export function ReviewSummaryComponent(
    {
        productId,
        total,
        summary
    }: Props) {
    const {formatMessage} = useIntl();
    const isEnabledReview = useIsEnabledReview();
    const [isAddNewOpen, setIsAddNewOpen] = useState(false);

    const closeAddNew = useCallback(() => setIsAddNewOpen(false), []);

    return !!isEnabledReview && (
        <div className="review-summary-component">
            {total ? (
                <>
                    <ReviewRatingComponent percent={summary && summary.percent}/>
                    <CustomLinkComponent to={location => ({...location, hash: 'reviews'})}
                                         className="review-summary-component-review-number">
                        {formatMessage(messages.reviews_count, {total})}
                    </CustomLinkComponent>
                    <ButtonComponent className="review-summary-component-add-review"
                                     variant="primary-link"
                                     onClick={() => setIsAddNewOpen(true)}>
                        {formatMessage(messages.add_review)}
                    </ButtonComponent>
                </>
            ) : (
                <span className="review-summary-component-add-review"
                      role="button"
                      tabIndex={0}
                      onClick={() => setIsAddNewOpen(true)}
                      onKeyDown={noop}>
                    {formatMessage(messages.first_to_review)}
                </span>
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
