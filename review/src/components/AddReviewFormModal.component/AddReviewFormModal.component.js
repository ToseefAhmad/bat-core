import React from 'react';
import {useIntl} from 'react-intl';
import {Link, useLocation} from 'react-router-dom';

import {ModalComponent, useStoreConfigQuery} from '@luft/common';
import {useIsAuthorized} from '@luft/user';
import {AddReviewFormContainer} from '@luft/review';
import type {ReviewRating} from '@luft/types';
import messages from '@luft/review/src/components/AddReviewFormModal.component/resources/messages';

type Props = {
    /**
     * Product Entity Id
     */
    productId: number | string,
    /**
     * Review Ratings list
     */
    ratings: ReviewRating[],
    /**
     * A variable identifying if modal is open
     */
    isOpen?: boolean,
    /**
     * A callback, when review was added successfully
     */
    onAddReviewSuccess?: (data: Object) => void,
    /**
     * A callback, when review adding was canceled
     */
    onAddReviewCancel?: (e: React.SyntheticEvent) => void,
    /**
     * A callback, when modal should be closed
     */
    onClose?: () => void,
    /**
     * A path for Link, when guest authorization is not allowed and user is willing to proceed to login
     */
    navigateLoginPath?: string,
    /**
     * A path for Link, when guest authorization is not allowed and user is willing to proceed to register
     */
    navigateRegisterPath?: string
};

export function AddReviewFormModalComponent(props: Props) {
    const {
        productId,
        ratings,
        isOpen,
        onAddReviewSuccess,
        onAddReviewCancel,
        onClose,
        navigateLoginPath = '/account/login',
        navigateRegisterPath = '/account/register'
    } = props;

    const isAuthorized = useIsAuthorized();
    const canAddReview = useStoreConfigQuery()?.data?.storeConfig?.allow_guest_review || isAuthorized;
    const {formatMessage} = useIntl();
    const {pathname} = useLocation();

    if (!canAddReview) {
        return (
            <ModalComponent show={isOpen}
                            onHide={onClose}
                            modalTitle={formatMessage(messages.guest_title)}
                            headerVariant="secondary-revert"
                            size="confirm"
                            backdrop="static">
                <div className="add-review-form-modal-component-guest">
                    <div className="add-review-form-modal-component-guest-line-1">
                        {formatMessage(messages.guest_text_line_1)}
                    </div>
                    <div className="add-review-form-modal-component-guest-line-2">
                        {formatMessage(messages.guest_text_line_2, {
                            login: (
                                <Link key="login-link"
                                      title={formatMessage(messages.log_in)}
                                      role="link"
                                      to={{
                                          pathname: navigateLoginPath,
                                          state: {from: pathname}
                                      }}>
                                    {formatMessage(messages.log_in)}
                                </Link>
                            ),
                            register: (
                                <Link key="register-link"
                                      title={formatMessage(messages.create_an_account)}
                                      role="link"
                                      to={{
                                          pathname: navigateRegisterPath,
                                          state: {from: pathname}
                                      }}>
                                    {formatMessage(messages.create_an_account)}
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </ModalComponent>
        );
    }

    return (
        <ModalComponent show={isOpen}
                        modalTitle={formatMessage(messages.add_review_title)}
                        onHide={onClose}
                        className="add-review-form-modal-component-new">
            <AddReviewFormContainer productId={productId}
                                    ratings={ratings}
                                    onAddReview={onAddReviewSuccess}
                                    onAddCancel={onAddReviewCancel}/>
        </ModalComponent>
    );
}
