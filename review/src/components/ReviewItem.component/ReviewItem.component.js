import React, {useEffect, useRef} from 'react';
import {useIntl} from 'react-intl';
import {noop} from 'lodash';

import {
    ButtonComponent,
    useResolutions,
    DateComponent
} from '@luft/common';
import {ReviewRatingComponent} from '@luft/review';
import type {Review} from '@luft/types';

import {useTruncatedText} from '../../../../common';
import messages from './resources/messages';

type Props = {
    /**
     * Product review
     */
    review: Review
};

export function ReviewItemComponent({review}: Props) {
    const {formatMessage} = useIntl();
    const detailsRef = useRef();
    const {isXS} = useResolutions();

    const ratings = review?.ratings || [];
    const numberOfStrings = isXS ? 3 : 4;
    const totalRatingPercent = ratings?.length
        ? ratings.reduce((rating, item) => rating + item.percent, 0) / ratings.length
        : 0;

    const {
        isMore,
        text,
        setInitialText,
        onSetFullText,
        getDetailText
    } = useTruncatedText({
        description: review.details,
        input: detailsRef.current,
        numberOfStrings
    });

    const handleOnClick = () => {
        if (!isXS) return;

        if (isMore) {
            onSetFullText();
        } else {
            setInitialText();
        }
    };
    const detailText = getDetailText(text, isMore);

    useEffect(setInitialText, [detailsRef.current]);

    return (
        <div className="review-item-component">
            <div className="review-item-component-ratings">
                <div className="review-item-component-rating">
                    <ReviewRatingComponent percent={totalRatingPercent}/>
                </div>
            </div>
            {review.title && (
                <div className="review-item-component-title">
                    {review.title}
                </div>
            )}
            <div className="review-item-component-meta">
                {review.author && (
                    <span className="review-item-component-author">
                        {review.author}
                    </span>
                )}
                {review.posted_at && (
                    <span className="review-item-component-posted-at">
                        <DateComponent date={review.posted_at}/>
                    </span>
                )}
            </div>
            <div className="review-item-component-details"
                 ref={detailsRef}
                 role="button"
                 tabIndex="0"
                 onClick={handleOnClick}
                 onKeyPress={noop}>
                {detailText}
                {isMore && (<span>...</span>)}
            </div>
            {!isXS && isMore && (
                <ButtonComponent type="button"
                                 variant="primary-link"
                                 inline={true}
                                 className="review-item-component-action"
                                 onClick={onSetFullText}
                                 title={formatMessage(messages.full_review)}>
                    {formatMessage(messages.full_review)}
                </ButtonComponent>
            )}
        </div>
    );
}
