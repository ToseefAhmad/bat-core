import React from 'react';
import {useLocation} from 'react-router-dom';
import {get} from 'lodash';
import {
    LoaderComponent,
    ErrorComponent,
    NoCacheComponent
} from '@luft/common';

import {EspayComponent} from '../Espay.component';

import {useEspayQuery} from '../../hooks';

type Props = {
    as?: React.Component,
    loadingAs?: React.Component,
    errorAs?: React.Component,
    noCacheAs?: React.Component,
    awaitResult?: boolean
}

export function EspayContainer(props: Props) {
    const {
        as: Component = EspayComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        ...other
    } = props;

    const {state = {}} = useLocation();
    const {orderId, paymentMethod, error} = state;

    const q = useEspayQuery(orderId, paymentMethod);

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if ((awaitResult && q.dataError) || error) return Error && <Error error={q.error || error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const config = get(q, 'data.espay');

    return (
        <Component {...other}
                   espayOrderId={orderId}
                   paymentMethod={paymentMethod}
                   config={config}/>
    );
}
