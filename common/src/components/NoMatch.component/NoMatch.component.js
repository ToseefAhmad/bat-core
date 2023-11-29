import React from 'react';
import {useIntl} from 'react-intl';
import {useHistory} from 'react-router';

import {ButtonComponent} from '@luft/common';
import {CatalogProductListLoaderComponent} from '@luft/widget';
import {ProductListSliderComponent} from '@luft/product';

import {ProductsContainer} from '../Products.container';

import messages from './resources/messages';

export function NoMatchComponent() {
    const {formatMessage} = useIntl();
    const history = useHistory();

    return (
        <div className="no-match-component">
            <div className="no-match-component-box">
                <div className="no-match-component-title">
                    {formatMessage(messages.title)}
                </div>
                <p className="no-match-component-note">
                    {formatMessage(messages.note)}
                </p>
                <div className="no-match-component-actions">
                    <ButtonComponent className="no-match-component-actions-button"
                                     title={formatMessage(messages.continue_shopping)}
                                     onClick={() => history.replace('/')}>
                        {formatMessage(messages.continue_shopping)}
                    </ButtonComponent>
                    <ButtonComponent className="no-match-component-actions-button"
                                     variant="tertiary"
                                     title={formatMessage(messages.contact_us)}
                                     onClick={() => history.replace('/contact-us')}>
                        {formatMessage(messages.contact_us)}
                    </ButtonComponent>
                </div>
            </div>
            <ProductsContainer url="/slider-1"
                               className="no-match-component-slider"
                               as={ProductListSliderComponent}
                               loadingAs={CatalogProductListLoaderComponent}/>
        </div>
    );
}
