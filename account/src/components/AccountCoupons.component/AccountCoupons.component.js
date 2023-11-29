import React from 'react';
import {useIntl} from 'react-intl';

import {AccountTitleComponent} from '@luft/account';

import {CouponsWalletContainer} from '../../../../sales';
import messages from './resources/messages';

type Props = {
    /**
     * Text, which is used as a title
     */
    title?: string,
    /**
     * Callback, which is used to go back
     */
    onBack?: Function
};

const DESCRIPTION_MAX_LENGTH = 70;
const SHORT_DESCRIPTION_WORDS = 8;

export function AccountCouponsComponent(props: Props) {
    const {formatMessage} = useIntl();
    const {
        title = formatMessage(messages.coupons_title),
        onBack,
        ...other
    } = props;

    return (
        <div className="account-coupons-component">
            <AccountTitleComponent title={title}
                                   onBack={onBack}/>
            <div className="account-coupons-component-content">
                <CouponsWalletContainer {...other}
                                        descriptionMaxLength={DESCRIPTION_MAX_LENGTH}
                                        shortDescriptionWords={SHORT_DESCRIPTION_WORDS}/>
            </div>
        </div>
    );
}
