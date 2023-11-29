import React from 'react';
import {useIntl} from 'react-intl';

import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent
} from '@luft/common';
import {ProductListSliderComponent} from '@luft/product';

import {useUpSellProductsListQuery} from '../../hooks';

import messages from './resources/messages';

type Props = {
    productId: string | number,
    as?: React.Component,
    loadingAs?: React.Component,
    errorAs?: React.Component,
    noCacheAs?: React.Component,
    awaitResult?: boolean,
    title?: string
}

export function RecommendedProductsListContainer(props: Props) {
    const {
        productId: id,
        as: Component = ProductListSliderComponent,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        title,
        ...other
    } = props;

    const {formatMessage} = useIntl();

    const q = useUpSellProductsListQuery(id);

    if (awaitResult && q.loading) return Loading && <Loading/>;
    if (awaitResult && q.dataError) return Error && <Error error={q.error}/>;
    if (awaitResult && q.noCache) return NoCache && <NoCache/>;

    const products = q?.data?.product?.upsell_products_list;

    return (
        <Component {...other}
                   title={title || formatMessage(messages.title)}
                   products={products}/>
    );
}
