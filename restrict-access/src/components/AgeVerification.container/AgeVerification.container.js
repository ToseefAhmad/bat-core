import React, {useState} from 'react';

import {useStoreConfigQuery} from '@luft/common';

import {AgeVerificationModalComponent} from '../AgeVerificationModal.component';
import {
    useGetDocumentTypesQuery,
    useUploadAndProcessDocumentMutation,
    useHardAgeVerification
} from '../../hooks';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     * */
    as?: React.Component,
    /**
     * Indicates if modal should be opened
     */
    showModal?: boolean,
    /**
     * Callback on successful data verification
     */
    onVerify?: (Object) => void,
    /**
     * Callback to return back to Login page
     */
    onBack?: (React.SyntheticEvent) => void
};

const STORAGE_KEY = '__hav-ph';

export function AgeVerificationContainer(props: Props) {
    const {
        as: Component = AgeVerificationModalComponent,
        showModal,
        onVerify,
        onBack,
        ...others
    } = props;

    const {data: documentTypes, loading: loadingTypes, error: errorGetTypes} = useGetDocumentTypesQuery();
    const {data: storeConfigData} = useStoreConfigQuery();
    const [processDocument, {loading: processLoading, error: processError}] = useUploadAndProcessDocumentMutation();
    const [isExpired, setIsExpired] = useState(false);

    const error = errorGetTypes || processError;
    const documents = documentTypes?.getDocumentTypes;
    const failedAttemptsLimit = storeConfigData?.storeConfig?.azure_failed_limit;
    const penaltyTime = storeConfigData?.storeConfig?.azure_failed_lifetime;

    const {isExpired: isEnabledVerification, onIncrementFailureCount} = useHardAgeVerification({
        storageKey: STORAGE_KEY,
        maxFailureCount: failedAttemptsLimit,
        penaltyTime
    });

    return (
        <Component {...others}
                   documentTypes={documents}
                   processDocument={processDocument}
                   error={error}
                   loading={loadingTypes || processLoading}
                   showModal={showModal}
                   onIncrementFailureCount={onIncrementFailureCount}
                   isEnabledVerification={isEnabledVerification}
                   isExpired={isExpired}
                   onSetIsExpired={setIsExpired}
                   onVerify={onVerify}
                   onBack={onBack}/>
    );
}
