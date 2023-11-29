import React, {useState} from 'react';
import {isEmpty} from 'lodash';
import {useIntl} from 'react-intl';
import {useForm} from 'react-hook-form';
import {useDropzone} from 'react-dropzone';

import {
    ButtonComponent,
    SelectComponent,
    FormGroupComponent,
    ErrorComponent
} from '@luft/common';

import messages from './resources/messages';

type DocumentType = {
    key: string,
    label: string
};

type Props = {
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

export function AgeVerificationFormComponent(props: Props) {
    const {
        documentTypes = [],
        onIncrementFailureCount,
        isEnabledVerification = true,
        isExpired = false,
        onSetIsExpired,
        processDocument,
        onVerify,
        onBack
    } = props;

    const {formatMessage} = useIntl();
    const {register, errors, handleSubmit} = useForm();
    const [file, setFile] = useState({});
    const [error, setError] = useState();

    const mapTypesToOptions = documentTypes.map(({key, label}) => ({code: key, name: label}));

    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/jpeg, image/png',
        multiple: false,
        onDrop: (acceptedFiles, rejectedFiles) => {
            if (!rejectedFiles.length) {
                setError();
                const [acceptedFile] = acceptedFiles;
                setFile(Object.assign(acceptedFile, {
                    preview: URL.createObjectURL(acceptedFile)
                }));
            } else {
                setError({message: formatMessage(messages.unsupported_media_error)});
            }
        }
    });

    const convertFileToBase64 = (file) => new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve();
    });

    const handleRemoveFile = () => {
        setFile({});
    };

    const submitDocument = async ({documentType}) => {
        if (!isEnabledVerification) {
            if (onSetIsExpired) onSetIsExpired(!isEnabledVerification);
            return;
        }

        try {
            const base64File = await convertFileToBase64(file);
            let result = {};
            if (processDocument) {
                result = await processDocument({
                    base64_file: base64File,
                    filename: file.name,
                    document_type: documentType
                });
            }

            const verifiedData = result?.data?.uploadAndProcessDocument;

            if (onVerify) onVerify({...verifiedData, document_type: documentType});
        } catch (e) {
            const isLockedOperation = e?.graphQLErrors?.[0]?.extensions?.category === 'graphql-operation-locked';

            if (!isLockedOperation) return;

            if (onIncrementFailureCount) onIncrementFailureCount();
        }
    };

    return (
        <div className="age-verification-form-component">
            <form noValidate
                  onSubmit={handleSubmit(submitDocument)}>
                <p className="age-verification-form-component-note">
                    {formatMessage(messages.choose_document)}
                </p>
                <FormGroupComponent inputAs={SelectComponent}
                                    name="documentType"
                                    errors={errors}
                                    label={formatMessage(messages.label)}
                                    isLabelActive={true}
                                    options={mapTypesToOptions}
                                    ref={register({required: true})}/>
                <p className="age-verification-form-component-note">
                    {formatMessage(messages.upload)}
                </p>
                {isEmpty(file) ? (
                    <>
                        <div {...getRootProps({className: 'age-verification-form-component-dropzone'})}>
                            <input name="file"
                                   id="file"
                                   ref={register({required: true})}
                                   {...getInputProps()} />
                            <p className="age-verification-form-component-drop-block">
                                <span className="age-verification-form-component-note-bold">
                                    {formatMessage(messages.drop)}
                                </span>
                                {formatMessage(messages.or)}
                                <span className="age-verification-form-component-note-link">
                                    {formatMessage(messages.browse)}
                                </span>
                            </p>
                        </div>
                        <div className="age-verification-form-component-support">
                            <span>
                                {formatMessage(messages.support)}
                            </span>
                            <span className="age-verification-form-component-support-secure">
                                {formatMessage(messages.secure)}
                            </span>
                        </div>
                    </>
                ) : (
                    <div className="age-verification-form-component-upload">
                        <div className="age-verification-form-component-image">
                            <img src={file.preview}
                                 alt={file.name}
                                 className="age-verification-form-component-image-icon"/>
                        </div>
                        <span className="age-verification-form-component-file-name">
                            {file.name}
                        </span>
                        <ButtonComponent className="age-verification-form-component-remove"
                                         variant="link"
                                         type="button"
                                         onClick={handleRemoveFile}
                                         title={formatMessage(messages.remove)}>
                            {formatMessage(messages.remove)}
                        </ButtonComponent>
                    </div>
                )}
                {error && <ErrorComponent error={error}
                                          className="age-verification-form-component-error"/>}
                <div className="age-verification-form-component-actions">
                    <ButtonComponent className="age-verification-form-component-submit"
                                     type="submit"
                                     disabled={isEmpty(file) || isExpired}
                                     title={formatMessage(messages.submit)}>
                        {formatMessage(messages.submit)}
                    </ButtonComponent>
                    <ButtonComponent className="age-verification-form-component-cancel"
                                     variant="tertiary"
                                     type="button"
                                     onClick={onBack}
                                     title={formatMessage(messages.cancel)}>
                        {formatMessage(messages.cancel)}
                    </ButtonComponent>
                </div>
            </form>
        </div>
    );
}
