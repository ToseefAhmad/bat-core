import React from 'react';
import {useIntl} from 'react-intl';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {ButtonComponent, useToast} from '@luft/common';
import {CmsBlockContainer} from '@luft/cms';

import messages from './resources/messages';

type Props = {
    referralLink: string
}

export function AccountReferralLinkComponent(props: Props) {
    const {
        referralLink
    } = props;

    const {formatMessage} = useIntl();
    const addToast = useToast();

    return (
        <div className="account-referral-link-component">
            <div className="account-referral-link-component-title">
                {formatMessage(messages.referral_url)}
                :
            </div>
            <div className="account-referral-link-component-content">
                <div className="account-referral-link-component-content-item">
                    <div className="account-referral-link-component-content-item-url">
                        {referralLink}
                    </div>
                    <CmsBlockContainer cmsBlockId="account-referral-disclaimer"/>
                </div>
                <div className="account-referral-link-component-content-item">
                    <CopyToClipboard text={referralLink}
                                     onCopy={() => addToast(formatMessage(messages.success_message), 'success')}>
                        <ButtonComponent variant="secondary"
                                         title={formatMessage(messages.button_title)}
                                         inline={false}
                                         className="account-referral-link-component-content-item-button">
                            {formatMessage(messages.button_title)}
                        </ButtonComponent>
                    </CopyToClipboard>
                </div>
            </div>
        </div>
    );
}
