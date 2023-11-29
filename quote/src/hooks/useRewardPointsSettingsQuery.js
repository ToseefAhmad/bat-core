import {useRef} from 'react';
import {get} from 'lodash';

import {useQuery} from '@luft/apollo';
import {useCartIdQuery} from '@luft/quote';

import REWARD_POINTS_SETTINGS_QUERY from '../graphql/queries/RewardPointsSettings.query.graphql';

export const useRewardPointsSettingsQuery = (options = {}, query = REWARD_POINTS_SETTINGS_QUERY) => {
    const {current: cartId} = useRef(get(useCartIdQuery(), 'data.cart.id'));

    return useQuery(query, {
        ...options,
        variables: {
            ...options.variables,
            input: {
                cart_id: cartId
            }
        },
        skip: !cartId
    });
};
