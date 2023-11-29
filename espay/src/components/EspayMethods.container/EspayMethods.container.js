import React from 'react';
import {get} from 'lodash';

import {
    LoaderComponent,
    ErrorComponent,
    NoCacheComponent
} from '@luft/common';
import type {EspayPaymentItem} from '@luft/types';

import {EspayMethodsComponent} from '../EspayMethods.component';

import {useEspayMethodsQuery} from '../../hooks';

type Props = {
    as?: React.Component,
    loadingAs?: React.Component,
    errorAs?: React.Component,
    noCacheAs?: React.Component,
    awaitResult?: boolean,
    onSelectMethod?: Function,
    paymentMethod?: EspayPaymentItem
}

export function EspayMethodsContainer(props: Props) {
    const {
        as: Component = EspayMethodsComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        onSelectMethod,
        paymentMethod,
        ...other
    } = props;

    const q = useEspayMethodsQuery();

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const methods = get(q, 'data.espayPaymentInfo');

    return (
        <Component {...other}
                   q={q}
                   methods={methods}
                   onSelectMethod={onSelectMethod}
                   paymentMethod={paymentMethod}/>
    );
}
