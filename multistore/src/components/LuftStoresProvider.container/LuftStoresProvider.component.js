import React from 'react';
import {ApolloLink} from '@apollo/client';

import {LuftStoresContainer} from '@luft/multistore';
import {useNewApolloClient} from '@luft/apollo';

export type LuftStoresContainerProps = {
    /**
     * Url for fetching graphql data with apollo
     */
    dataUri: string,
    /**
     * Parameter, that defines if multistore should be supported
     * false by default (improves performance)
     */
    enabled?: boolean,
    /**
     * Application start url. Used for store detection in ssr mode
     */
    url?: string,
    /**
     * Custom fetch instance
     */
    fetch?: Object,
    /**
     * If Stores should work in ssrMode
     */
    ssr?: boolean,
    /**
     * Array of ApolloLink instances that stand before HttpLink
     */
    links?: [ApolloLink],
    /**
     * Children component
     */
    children?: React.Component | Function
};

export const LuftStoresProviderComponent = (props: LuftStoresContainerProps) => {
    const {
        dataUri,
        url,
        fetch,
        enabled = true,
        ssr = false,
        links = [],
        children,
        ...other
    } = props;

    const {client} = useNewApolloClient({
        dataUri,
        fetch,
        ssr,
        links,
        persistenceKey: 'luft-stores'
    });

    if (!enabled) {
        return children;
    }

    return (
        <LuftStoresContainer {...other}
                             url={url}
                             client={client}
                             enabled={enabled}>
            {children}
        </LuftStoresContainer>
    );
};
