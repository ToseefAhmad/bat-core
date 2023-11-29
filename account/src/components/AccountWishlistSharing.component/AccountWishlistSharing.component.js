import React from 'react';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';

import {
    ButtonComponent,
    ModalComponent,
    FormGroupComponent,
    ErrorComponent,
    LoaderComponent
} from '@luft/common';

import {useFormInputRules} from '../../../../common';
import messages from './resources/messages';

type Props = {
    /**
     * Flag to toggling modal
    */
    showModal: boolean,
    /**
     * Error for represent
    */
    error?: Error,
    /**
     * Is loading status
    */
    loading?: boolean,
    /**
     * Callback for toggling modal
    */
     onHandleModal: () => void,
    /**
     * Callback to handle request
    */
    onWishlistShare: (input) => void

}

export function AccountWishlistSharingComponent(props: Props) {
    const {formatMessage} = useIntl();

    const {
        error,
        loading,
        showModal,
        onHandleModal,
        onWishlistShare
    } = props;

    const {register, errors, handleSubmit} = useForm({mode: 'onBlur'});
    const {getMaxLengthRule, getTrimRule} = useFormInputRules();

    return (
        <div className="account-wishlist-sharing-component">
            <ButtonComponent className="account-wishlist-sharing-component-share-button"
                             onClick={onHandleModal}
                             inline={true}
                             variant="tertiary">
                <span className="account-wishlist-sharing-component-button-title">
                    {formatMessage(messages.button_title)}
                </span>
            </ButtonComponent>
            <ModalComponent className="account-wishlist-sharing-component-modal"
                            show={showModal}
                            onHide={onHandleModal}
                            modalTitle={formatMessage(messages.modal_title)}
                            headerVariant="secondary-revert"
                            size="confirm"
                            backdrop="static">
                {loading && <LoaderComponent />}
                {error && <ErrorComponent error={error}/>}
                <p className="account-wishlist-sharing-component-share-info">
                    {formatMessage(messages.sharing_info)}
                </p>
                <form noValidate
                      className="account-wishlist-sharing-component-form"
                      onSubmit={handleSubmit(onWishlistShare)}>
                    <FormGroupComponent controlId="emails"
                                        inputAs="textarea"
                                        className="account-wishlist-sharing-component-message-area"
                                        name="emails"
                                        label={formatMessage(messages.email_label)}
                                        errors={errors}
                                        ref={register({required: true})}/>

                    <FormGroupComponent controlId="message"
                                        name="message"
                                        inputAs="textarea"
                                        className="account-wishlist-sharing-component-message-area"
                                        label={formatMessage(messages.message_label)}
                                        defaultValue={formatMessage(messages.message_default)}
                                        errors={errors}
                                        ref={register({
                                            validate: getTrimRule,
                                            ...getMaxLengthRule('message')
                                        })}/>
                    <div className="account-wishlist-sharing-component-form-actions">
                        <ButtonComponent variant="tertiary"
                                         className="account-wishlist-sharing-component-modal-cancel-button"
                                         type="button"
                                         inline={true}
                                         disabled={loading}
                                         onClick={onHandleModal}
                                         title={formatMessage(messages.submit_button_title)}>
                            {formatMessage(messages.cancel_button)}
                        </ButtonComponent>
                        <ButtonComponent variant="primary"
                                         className="account-wishlist-sharing-component-modal-share-button"
                                         type="submit"
                                         inline={true}
                                         disabled={loading}
                                         title={formatMessage(messages.submit_button_title)}>
                            {formatMessage(messages.submit_button_title)}
                        </ButtonComponent>
                    </div>
                </form>
            </ModalComponent>
        </div>
    );
}
