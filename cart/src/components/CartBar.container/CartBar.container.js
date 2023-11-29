import React from 'react';

import {useCartLimitedQuery, useCartIdQuery} from '@luft/quote';

import {CartBarComponent} from '../CartBar.component';

type Props = {
    /**
     * Prop, that identifies component, used for data presentation
     * */
    as?: React.Component,
    /**
     * Prop, that identifies component, used for presentation of error state
     * */
    errorAs?: React.Component,
    /**
     * Prop, that identifies component, used for presentation when offline and not enough cached data
     * */
    noCacheAs?: React.Component,
    /**
     * Flag, used to identify handling of loading, error and no-cache state by container
     * */
    awaitResult?: boolean
};

export function CartBarContainer(props: Props) {
    const {
        as: Component = CartBarComponent,
        errorAs: Error = null,
        noCacheAs: NoCache = null,
        awaitResult = false,
        ...others
    } = props;

    const cartId = useCartIdQuery({fetchPolicy: 'cache-only'})?.data?.cart?.id;
    // Request on cart will always fail in case `cartId` is missing
    const q = useCartLimitedQuery({skip: !cartId});

    if (awaitResult && q.error) return Error && <Error error={q.error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    return (
        <Component {...others}
                   cart={q.data?.cart}
                   loading={q.loading}/>
    );
}
