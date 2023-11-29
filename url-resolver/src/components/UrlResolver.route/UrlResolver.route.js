import React from 'react';
import {Route, useLocation} from 'react-router-dom';
import {Redirect} from 'react-router';

import {
    ErrorComponent,
    LoaderComponent,
    NoCacheComponent
} from '@luft/common';
import type {EntityUrl} from '@luft/types';

import {useUrlResolver} from '../../hooks';

type Props = {
    entity: string,
    entityUrl: EntityUrl,
    component: React.node,
    render: Function,
    loadingAs?: React.Component,
    errorAs?: React.Component,
    noCacheAs?: React.Component,
    awaitResult?: boolean,
    children?: React.Component
}

export function UrlResolverRoute(props: Props) {
    const {
        entity,
        component: Component,
        loadingAs: Loading = LoaderComponent,
        errorAs: Error = ErrorComponent,
        noCacheAs: NoCache = NoCacheComponent,
        awaitResult = true,
        children,
        ...others
    } = props;
    let {entityUrl, render} = props;

    const {pathname} = useLocation();
    const q = useUrlResolver(pathname, {skip: !!entityUrl});

    if (!entityUrl && awaitResult && q.loading) return Loading && <Loading/>;
    if (!entityUrl && awaitResult && q.dataError) return Error && <Error error={q.error}/>;
    if (!entityUrl && awaitResult && q.noCache) return NoCache && <NoCache/>;

    entityUrl = entityUrl || q?.data?.urlResolver;

    if (!entityUrl || entityUrl.entity_type !== entity) {
        return null;
    }

    if (!Component && !render) {
        // eslint-disable-next-line no-console
        console.warn('No component or render function was provided in \'component\' prop for UrlResolverRoute. Returning \'null\'');
        return null;
    }

    const {redirect_url: redirectUrl} = entityUrl;

    const shouldRedirect = !!redirectUrl && pathname !== `/${redirectUrl}`;

    if (shouldRedirect) {
        return (
            <Redirect to={{pathname: `/${redirectUrl}`}}/>
        );
    }

    if (Component) {
        const entityId = entityUrl.entity_id;

        render = (...renderProps) => (
            <Component {...renderProps}
                       entityId={entityId}
                       entityUrl={entityUrl}/>
        );
    }

    return (
        <Route {...others}
               path={pathname}
               render={(...renderProps) => render({
                   ...renderProps,
                   entityId: entityUrl.entity_id,
                   entityUrl
               })}/>
    );
}
