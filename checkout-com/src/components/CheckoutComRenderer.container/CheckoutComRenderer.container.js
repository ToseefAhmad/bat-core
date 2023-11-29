import React from 'react';

import {
    LoaderComponent,
    ErrorComponent,
    NoCacheComponent
} from '@luft/common';

import {CheckoutComRendererComponent} from '../CheckoutComRenderer.component';
import {parseJsonString} from '../../../../common';
import {useCheckoutComQuery} from '../../hooks';

type Props = {
    /**
     * Presentation component, that will consume data and callbacks from this container component
     */
    as?: React.Component,
    /**
     * Represent for loading view
     */
    loadingAs?: React.Component,
    /**
     * Represent for error view
     */
    errorAs?: React.Component,
    /**
     * Represent for no cache view
     */
    noCacheAs?: React.Component,
    /**
     * Await result
     */
    awaitResult?: boolean
}

export function CheckoutComRendererContainer(
    {
        as: Component = CheckoutComRendererComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        ...other
    }: Props) {
    const q = useCheckoutComQuery();

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.dataError}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const cardPayment = q?.data?.checkoutComCardPayment || {};
    const style = parseJsonString(cardPayment.style);
    const config = {...cardPayment, publicKey: cardPayment.public_key, style};

    return (
        <Component {...other}
                   config={config}/>
    );
}
