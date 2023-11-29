import React from 'react';
import {useIntl} from 'react-intl';

import {
    LoaderComponent,
    ErrorComponent
} from '@luft/common';

import {AgeVerificationFormComponent} from '../AgeVerificationForm.component';
import messages from './resources/messages';

type DocumentType = {
    key: string,
    label: string
};

type Props = {
    /**
     * Is loading status
     */
    loading?: boolean,
    /**
     * Error for represent
     */
    error?: Error,
    /**
     * An array with possible document types
     */
    documentTypes?: DocumentType[],
    /**
     * Callback to increment failure count
     */
    onIncrementFailureCount?: () => void,
    /**
     * Verification status
     */
    isEnabledVerification: boolean,
    /**
     * Flag used to hide/show title
     */
    showTitle?: boolean,
    /**
     * Expired status
     */
    isExpired?: boolean,
    /**
     * Callback to set expired status
     */
    onSetIsExpired?: (boolean) => void,
    /**
     * Mutation to verify user data
     */
    processDocument?: (Object) => void,
    /**
     * Callback on successful data verification
     */
    onVerify?: (Object) => void,
    /**
     * Callback to return back to Login page
     */
    onBack?: (React.SyntheticEvent) => void
};

export function AgeVerificationComponent(props: Props) {
    const {
        documentTypes,
        loading = false,
        error: verificationError,
        onIncrementFailureCount,
        isEnabledVerification,
        showTitle = false,
        isExpired = false,
        onSetIsExpired,
        processDocument,
        onVerify,
        onBack
    } = props;

    const {formatMessage} = useIntl();
    const error = isExpired ? {message: formatMessage(messages.expired_error)} : verificationError;

    return (
        <div className="age-verification-component">
            {showTitle && (
                <h3 className="age-verification-component-title">
                    {formatMessage(messages.title)}
                </h3>
            )}
            {loading && <LoaderComponent />}
            {error && <ErrorComponent error={error}/>}
            <div className="age-verification-component-note">
                <p className="age-verification-component-note-bold">
                    {formatMessage(messages.note)}
                </p>
                <p className="age-verification-component-note">
                    {formatMessage(messages.description)}
                </p>
            </div>
            <AgeVerificationFormComponent documentTypes={documentTypes}
                                          processDocument={processDocument}
                                          onVerify={onVerify}
                                          onBack={onBack}
                                          onIncrementFailureCount={onIncrementFailureCount}
                                          isEnabledVerification={isEnabledVerification}
                                          isExpired={isExpired}
                                          onSetIsExpired={onSetIsExpired}/>
        </div>
    );
}
